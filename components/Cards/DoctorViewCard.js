import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Divider,
} from "@mui/material";
import EnsAvatar from "../EnsAvatar";
import { useRouter } from "next/router";

export default ({ doctor }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/Doctors?id=${doctor[0]}`);
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleClick}>
        <CardHeader
          avatar={<EnsAvatar address={doctor[0]} size={50} />}
          title={
            <span className="font-bold">
              {doctor[0].slice(0, 6) + "..." + doctor[0].slice(38, 42)}
            </span>
          }
          subheader={doctor[1]}
        />
        <CardContent>
          <p>{"Availablity: "}</p>
          <p>
            <span className="font-bold">{doctor[3]}</span>
          </p>
          <Divider />
          <p>
            {"Per Session: "}
            <span className="font-bold">{doctor[2]?.toString()}</span>
            {" Tọ̀rọ̀"}
          </p>
          <p>
            {"Rating: "}
            <span className="font-bold">{doctor[4]}</span>
          </p>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
