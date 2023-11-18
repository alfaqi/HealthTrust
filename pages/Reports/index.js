import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import AddReportCard from "../../components/Cards/AddReportCard";
import GetMRbyPatient from "../../components/Cards/GetMRbyPatient";
import { createHTContract } from "../../Constants/contractUtils";
import { useRouter } from "next/router";
import Chat from "../../components/Chat/Chat";

export default () => {
  const [value, setValue] = useState(0);
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <div>{children}</div>
          </Box>
        )}
      </div>
    );
  }
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const [patientMode, setPatientMode] = useState(true);
  const [address, setAddress] = useState("");
  const router = useRouter();
  const handleGetAllMembers = async (address) => {
    setPatientMode(true);
    try {
      const contract = await createHTContract();
      const reportCount = await contract.getAllDoctors();
      if (!reportCount) return;
      for (let i of reportCount) {
        if (i.toLowerCase() == address.toLowerCase()) {
          setPatientMode(false);
          setAddress(address);
          break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const AccountAddress = localStorage.getItem("AccountAddress");
    if (!AccountAddress) {
      router.push("/Account");
      return;
    }
    handleGetAllMembers(AccountAddress);
  }, []);

  return (
    <div className="w-[60vw] h-[100vh] flex flex-col items-center mx-auto">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab className="text-white" label="View Report" {...a11yProps(0)} />
            {!patientMode && (
              <Tab
                className="text-white"
                label="Add Medical Report"
                {...a11yProps(1)}
              />
            )}
            {!patientMode && (
              <Tab className="text-white" label="Chats" {...a11yProps(2)} />
            )}
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <GetMRbyPatient />
        </CustomTabPanel>
        {!patientMode && (
          <>
            <CustomTabPanel value={value} index={1}>
              <AddReportCard />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <Chat sender={address} />
            </CustomTabPanel>
          </>
        )}
      </Box>
    </div>
  );
};
