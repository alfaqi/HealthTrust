import {
  FormControl,
  Grid,
  Grow,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import DoctorViewCard from "./DoctorViewCard";
import { useEffect, useState } from "react";
import { createHTContract } from "../../Constants/contractUtils";
import { useAccount } from "wagmi";
import { FilterAltOff, Search } from "@mui/icons-material";

export default () => {
  const { address } = useAccount();
  const [doctors, setDoctors] = useState([]);
  const [doctorsSpec, setDoctorsSpec] = useState([]);
  const [docBySpecialization, setDocBySpecialization] = useState([]);

  const [action, setAction] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const handleGetAllMembers = async () => {
    try {
      const contract = await createHTContract();

      const reportCount = await contract.getAllDoctors();
      if (!reportCount) return;
      let doc = [];
      for (let i of reportCount) {
        const doctor = await contract.doctors(i);
        doc.push(doctor);
      }
      setDoctors(doc);
      setDoctorsSpec(doc);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllMembers();
  }, [address]);

  const getDocBySpec = async () => {
    setDocBySpecialization([]);
    setDoctors();
    try {
      const contract = await createHTContract();
      let doctors = [];
      const reportCount = await contract.getAllDoctors();
      if (!reportCount) return;
      for (let i of reportCount) {
        const doctor = await contract.doctors(i);
        if (doctor[1] == action) {
          doctors.push(doctor);
        }
      }
      setDocBySpecialization(doctors);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setDocBySpecialization([]);
    setDoctors();
    setAction(event.target.value);
  };
  const handleClearFilter = () => {
    handleGetAllMembers();
    setAction();
  };

  return (
    <div className="h-screen">
      {isLoading ? (
        <div className="flex flex-col">
          <div className="flex justify-center p-2 m-2">
            <h4>Loading...</h4>
          </div>
        </div>
      ) : (
        <div>
          <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
            <div className="flex flex-row gap-2">
              <FormControl fullWidth className="w-72 p-2 m-2">
                <InputLabel>Specialization</InputLabel>
                <Select
                  value={action}
                  label="Specialization"
                  onChange={handleChange}
                >
                  {doctorsSpec?.map((specialization) => {
                    return (
                      <MenuItem value={specialization[1]}>
                        {specialization[1]}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <IconButton
                disabled={!action}
                onClick={getDocBySpec}
                className="text-black p-2 m-2"
                edge={"end"}
              >
                <Search />
              </IconButton>
              <IconButton
                onClick={handleClearFilter}
                className="text-black p-2 m-2"
                edge={"start"}
              >
                <FilterAltOff />
              </IconButton>
            </div>
          </Grow>

          <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
            <Grid
              className="p-2"
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {(doctors ? doctors : docBySpecialization).map((doctor, i) => {
                return (
                  <Grid item xs={2} sm={4} md={4} key={i}>
                    <DoctorViewCard doctor={doctor} />
                  </Grid>
                );
              })}
            </Grid>
          </Grow>
        </div>
      )}
    </div>
  );
};
