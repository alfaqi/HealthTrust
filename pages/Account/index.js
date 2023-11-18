import { Box, Tab, Tabs } from "@mui/material";
import CreateAccount from "../../components/AccountManagement/CreateAccount";
import SigninCard from "../../components/AccountManagement/SigninCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default () => {
  const router = useRouter();
  const [address, setAddress] = useState("");
  useEffect(() => {
    const AccountAddress = localStorage.getItem("AccountAddress");
    setAddress(AccountAddress);
  }, []);
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

  if (!address) {
    return (
      <div
        className={`w-[60vw] 
   ${value == 0 ? "h-[100vh]" : "h-full "} 
    flex flex-col items-center mx-auto`}
      >
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab className="text-white" label="Signin" {...a11yProps(0)} />
              <Tab className="text-white" label="Signup" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <SigninCard />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <CreateAccount />
          </CustomTabPanel>
        </Box>
      </div>
    );
  } else {
    router.push("/Account/AccountMgmt");
  }
};
