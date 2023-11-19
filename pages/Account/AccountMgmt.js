import { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import CheckBalance from "/components/AccountManagement/CheckBalance";
import ChangePassword from "/components/AccountManagement/ChangePassword";
import TransferTokens from "../../components/AccountManagement/TransferTokens";
import IPFSHashFiles from "../../components/AccountManagement/IPFSHashFiles";

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
          <Tabs value={value} onChange={handleChange} aria-label="account tabs">
            <Tab
              className="text-white"
              label="My ipfs files"
              {...a11yProps(0)}
            />
            <Tab
              className="text-white"
              label="Check Balance"
              {...a11yProps(1)}
            />
            <Tab
              className="text-white"
              label="Transfer Tokens"
              {...a11yProps(2)}
            />
            <Tab
              className="text-white"
              label="Change Password"
              {...a11yProps(3)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <IPFSHashFiles />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <CheckBalance />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <TransferTokens />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <ChangePassword />
        </CustomTabPanel>
      </Box>
    </div>
  );
};
