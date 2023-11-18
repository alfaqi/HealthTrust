import Skeleton from "@mui/material/Skeleton";

export default ({ width, height }) => {
  return (
    <Skeleton
      variant="circular"
      width={width}
      height={height}
      className="bg-white"
    />
  );
};
