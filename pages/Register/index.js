import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import AllDoctors from "../../components/Cards/AllDoctors";
import { useRouter } from "next/router";

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
  const router = useRouter();
  useEffect(() => {
    const AccountAddress = localStorage.getItem("AccountAddress");
    if (!AccountAddress) {
      router.push("/Account");
      return;
    }
    // setAddress(AccountAddress);
    // handleGetAllMembers();
  }, []);
  return (
    <div className="w-[60vw] h-full flex flex-col items-center mx-auto">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="register tabs"
          >
            <Tab
              className="text-white"
              label="Select doctor"
              {...a11yProps(0)}
            />
            {/* <Tab className="text-white" label="All Doctors" {...a11yProps(1)} /> */}
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <AllDoctors />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {/* <DoctorsBySpecialization /> */}
        </CustomTabPanel>
      </Box>
    </div>
  );
};
