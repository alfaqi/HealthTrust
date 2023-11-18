import { useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import HT from "./HealthTrust";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ethers } from "ethers";
export default () => {
  const router = useRouter();
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  });

  const handleClick = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const chainID = (await provider.getNetwork()).chainId;
    console.log(chainID);
    if (chainID.toString() != "54321") {
      alert("Please switch to Toro testnet");
      return;
    }
    const AccountAddress = localStorage.getItem("AccountAddress");

    if (!AccountAddress) {
      router.push("/Account");
      return;
    }
    router.push("/Account/Check");
  };
  return (
    <main>
      <div className="absolute">
        <Image
          loader={() => "/background.jpg"}
          src={"/background.jpg"}
          alt="background"
          layout="fill"
          objectFit="cover"
          quality={100}
          unoptimized
        />
      </div>
      <HT />
      <section className="section section-lg section-shaped">
        <div className="grid grid-cols-2 gap-2 p-4">
          <div className="p-4 text-white items-center justify-center">
            <Fade direction="left" duration={2000}>
              <h3 className="text-3xl font-bold">
                Your well-being is our top priority
              </h3>
              <p>
                HealthTrust is here to revolutionize your healthcare experience.
              </p>
              <p>
                Take control of your health journey with personalized care plans
                and
                <br />
                seamless communication with your healthcare providers.
              </p>
            </Fade>
            <Fade direction="up" duration={2000}>
              <Link
                className="w-80 p-3 mt-4 text-center Primary__Click"
                onClick={handleClick}
                href={"#"}
              >
                Get Started
              </Link>
            </Fade>
          </div>
        </div>
      </section>
    </main>
  );
};
