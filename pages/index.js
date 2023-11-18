import dynamic from "next/dynamic";
const Indexpage = dynamic(() => import("../Containers/"));

export default () => {
  return (
    <div className="flex flex-col mx-auto">
      <Indexpage />
    </div>
  );
};
