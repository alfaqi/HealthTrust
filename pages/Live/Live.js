import { useEffect, useState } from "react";
import { parse } from "url";
import LiveFrame from "/components/LiveComp/LiveFrame";
import LiveBroadcast from "/components/LiveComp/LiveBroadcast";
import { Button } from "@mui/material";
import {
  createHTContract,
  createHTLivestreamContract,
} from "../../Constants/contractUtils";

export default function live() {
  const [playbackId, setPlaybackId] = useState("");
  const [streamKey, setStreamKey] = useState("");
  const [urlAddress, setURLAddress] = useState("");
  const [auth, setAuth] = useState(1);
  const [goLive, setGoLive] = useState(false);
  const goLiveFunc = () => {
    setGoLive(!goLive);
  };

  useEffect(() => {
    const func = async () => {
      const currentUrl = window.location.href;
      const parsedUrl = parse(currentUrl, true);
      const AccountAddress = localStorage.getItem("AccountAddress");

      if (
        parsedUrl.path == "/Live/Live" ||
        parsedUrl.path == "/Live/Live?id="
      ) {
        window.open("/Register", "_parent");
        return;
      }
      const urlAddress = parsedUrl.query.id;
      setURLAddress(urlAddress);
      let contract = await createHTContract();
      const doc = await contract.doctors(urlAddress);
      if (doc[0] == "0x0000000000000000000000000000000000000000") {
        window.open("/Register", "_parent");
        return;
      }

      contract = await createHTLivestreamContract();
      const live = await contract.getLive(urlAddress);
      console.log(live);
      if (live.streamID === "") {
        alert("Doctor is not online");
        window.open("/Register", "_parent");
        return;
      }

      setStreamKey(live.streamID);
      setPlaybackId(live.playbackID);

      if (AccountAddress.toLowerCase() == urlAddress.toLowerCase()) setAuth(0);

      console.log(parsedUrl);
    };
    func();
  }, []);
  if (auth == "0") {
    return (
      <div className="container h-screen mx-auto">
        <h1 className="p-2 m-2 font-bold text-xl">Live with patients</h1>
        <Button onClick={goLiveFunc} className="m-2">
          <p className="m-2 font-bold text-black">
            {goLive ? "Stop Live" : "Start Live"}
          </p>
        </Button>
        {goLive && <LiveBroadcast streamKey={streamKey} />}
      </div>
    );
  } else {
    return (
      <div className="container h-screen mx-auto">
        <h1 className="p-2 m-2 font-bold text-xl">
          Live with doctor {urlAddress}
        </h1>
        <Button onClick={goLiveFunc} className="m-2">
          <p className="m-2 font-bold text-black">
            {goLive ? "Stop" : "Start"}
          </p>
        </Button>
        {goLive && <LiveFrame playbackId={playbackId} />}
      </div>
    );
  }
}
