import { useEffect, useState } from "react";
import { parse } from "url";
import LiveFrame from "/components/LiveComp/LiveFrame";
import LiveBroadcast from "/components/LiveComp/LiveBroadcast";
import { useAccount } from "wagmi";
import { Button } from "@mui/material";

export default function live() {
  const { address } = useAccount();
  const [playbackId, setPlaybackId] = useState("");
  const [streamKey, setStreamKey] = useState("");
  const [urlAddress, setURLAddress] = useState("");
  const [auth, setAuth] = useState(0);
  const [goLive, setGoLive] = useState(false);
  const goLiveFunc = () => {
    setGoLive(!goLive);
  };

  useEffect(() => {
    const currentUrl = window.location.href;
    const parsedUrl = parse(currentUrl, true);
    if (parsedUrl.path == "/Live/Live") {
      window.open("/Register", "_parent");
    }
    console.log(parsedUrl);
    const urlAuth = parsedUrl.query.auth;
    setAuth(urlAuth);
    const urlAddress = parsedUrl.query.addr ? parsedUrl.query.addr : "null";

    let urlID;
    if (urlAuth == 0) {
      urlID = parsedUrl.query.id ? parsedUrl.query.id : "null";
      setStreamKey(urlID);
    } else {
      urlID = parsedUrl.query.id ? parsedUrl.query.id : "null";
      setPlaybackId(urlID);
    }

    setURLAddress(urlAddress);
  }, []);
  if (auth == "0") {
    return (
      <>
        {address ? (
          <div className="container h-screen mx-auto">
            <h1 className="p-2 font-bold text-xl">
              Live with patient {urlAddress}
            </h1>
            <Button onClick={goLiveFunc} className="m-2">
              <p className="font-bold text-black">
                {goLive ? "Stop Live" : "Start Live"}
              </p>
            </Button>
            {goLive && <LiveBroadcast streamKey={streamKey} />}
          </div>
        ) : (
          <></>
        )}
      </>
    );
  } else {
    return (
      <>
        {address ? (
          <div className="container h-screen mx-auto">
            <h1 className="p-2 font-bold text-xl">
              Live with doctor {urlAddress}
            </h1>
            <Button onClick={goLiveFunc} className="m-2">
              <p className="font-bold text-black">
                {goLive ? "Leave Event" : "Go Live"}
              </p>
            </Button>
            {goLive && <LiveFrame playbackId={playbackId} />}
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
}
