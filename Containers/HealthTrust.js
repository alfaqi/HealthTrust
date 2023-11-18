import { useEffect } from "react";
import { Fade } from "react-awesome-reveal";
export default () => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  });
  return (
    <main className="flex flex-col justify-center mx-14 items-center text-white ">
      <Fade direction="down" duration={2000}>
        <h1 className="text-9xl font-bold text-white">HealthTrust Platform</h1>
        <h3 className="text-xl ">Your health is in-secure</h3>
      </Fade>
    </main>
  );
};
