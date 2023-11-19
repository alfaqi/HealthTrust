import { Button, Divider } from "@mui/material";
import EnsAvatar from "../../components/EnsAvatar";
import Link from "next/link";
import { Message, VideoCall } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createHTContract } from "../../Constants/contractUtils";
import SkeletonImageModal from "../../components/Modals/SkeletonImageModal";
import Chat from "../../components/Chat/Chat";

export default () => {
  // const doctor = [
  //   "0xB72AB84f684537F992E9D9d1ef6cAdb03854f148",
  //   "General",
  //   "5",
  //   "5",
  //   "5",
  //   "",
  // ];
  const router = useRouter();
  const [doctor, setDoctor] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [chat, setChat] = useState(false);
  const [address, setAddress] = useState("");

  const checkDoctor = async (AccountAddress) => {
    try {
      const contract = await createHTContract();
      const doc = await contract.doctors(AccountAddress);
      if (doc[0] == "0x0000000000000000000000000000000000000000") {
        alert(
          "Sorry, no doctor was found with this address. Please ensure it's correct and try again."
        );
        router.push("/Register");
        return;
      }
      setDoctor(doc);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const { id } = router.query;
    console.log(id);
    if (!id) {
      // alert(
      //   "Sorry, no doctor was found with this address. Please ensure it's correct and try again."
      // );
      router.push("/Register");
      return;
    }
    const AccountAddress = localStorage.getItem("AccountAddress");
    setAddress(AccountAddress);

    checkDoctor(id);
  }, []);

  const handleGotoLive = () => {
    window.open(`/Live/Live?id=${doctor[0]}`, "_blank");
  };

  return (
    <div className="container h-full">
      <div className="w-[300] h-[500] flex justify-center">
        {isLoading ? (
          <div className="flex flex-col">
            <div className="flex justify-center p-2 m-2">
              <SkeletonImageModal width={120} height={120} />
            </div>

            <div className="flex justify-center p-2 m-2">
              <h4>Loading...</h4>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="flex justify-center p-2 m-2">
              <EnsAvatar address={doctor[0]} size={120} />
            </div>
            <div className="flex justify-center m-1">
              <p className="font-semibold">{doctor[0]}</p>
            </div>
            <div className="flex justify-center p-1 m-1">
              <p> {doctor[1]}</p>
            </div>
            <div className="flex flex-row justify-center p-1 m-1">
              <Button
                onClick={() => setChat(!chat)}
                className="m-1 p-3 bg-slate-200 hover:bg-slate-400"
              >
                <Message />
              </Button>
              <Button
                onClick={handleGotoLive}
                className="m-1 p-3 bg-slate-200 hover:bg-slate-400"
              >
                <VideoCall />
              </Button>
            </div>
            <div>
              <div className="flex ">
                <Link
                  className="w-96 p-3 m-1 text-center Primary__Click"
                  href={`/Register/Register?id=${doctor[0]}`}
                >
                  Schedule an appointment
                </Link>
              </div>
              <p className="m-2">
                {"Available at: "}
                <span className="font-bold">{doctor[3]}</span>
              </p>
              <Divider />
              <p className="m-2">
                {"Per Session: "}
                <span className="font-bold">{doctor[2]?.toString()}</span>
                {" Tọ̀rọ̀"}
              </p>
              <p className="m-2">
                {"Rating: "}
                <span className="font-bold">{doctor[4]} / 5</span>
              </p>
            </div>
          </div>
        )}
      </div>
      {chat && <Chat sender={address} receiver={doctor[0]} />}
    </div>
  );
};
