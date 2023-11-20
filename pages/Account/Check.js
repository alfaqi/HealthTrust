import { useEffect } from "react";
import { useRouter } from "next/router";
import { createHTContract } from "../../Constants/contractUtils";

export default () => {
  const router = useRouter();
  const checkAccount = async (AccountAddress) => {
    try {
      const contract = await createHTContract();
      const doc = await contract.doctors(AccountAddress);
      if (doc[0] == "0x0000000000000000000000000000000000000000") {
        router.push("/Register");
        return;
      } else {
        router.push("/Reports");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const AccountAddress = localStorage.getItem("AccountAddress");
    checkAccount(AccountAddress);
  }, []);
  return (
    <div className="container h-screen">
      <div className="flex flex-col items-center justify-center">
        <h3>Checking...</h3>
        <p>You will redirect in few moments.</p>
      </div>
    </div>
  );
};
