import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import AdminsManagementCard from "../../components/Cards/AdminsManagementCard";
import DoctorsManagementCard from "../../components/Cards/DoctorsManagementCard";

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
  return (
    <div className="w-[60vw] h-full flex flex-col items-center mx-auto">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} aria-label="manage tabs">
            <Tab
              className="text-white"
              label="Admins Management"
              {...a11yProps(0)}
            />
            <Tab
              className="text-white"
              label="Doctors Management"
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <AdminsManagementCard />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <DoctorsManagementCard />
        </CustomTabPanel>
      </Box>
    </div>
  );
};
