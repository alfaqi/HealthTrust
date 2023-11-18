import Link from "next/link";
import Headroom from "headroom.js";
import { useContext, useEffect, useState } from "react";
import { createHTContract } from "../Constants/contractUtils";
import { useRouter } from "next/router";
import { Button, Menu, MenuItem } from "@mui/material";
import { ContractContext } from "../Constants/ContractContext";

export default () => {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [adminMode, setAdminMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { addressGlobal, setAddressGlobal, setPasswordGlobal } =
    useContext(ContractContext);
  useEffect(() => {
    const AccountAddress = localStorage.getItem("AccountAddress");
    setAddress(AccountAddress);
    // if (!AccountAddress) {
    //   router.push("/Account");
    // } else {
    //   router.push("/Account/Check");
    // }
  }, [addressGlobal]);
  useEffect(() => {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    headroom.init();
  });

  const handleGetAllMembers = async () => {
    setAdminMode(false);
    try {
      const contract = await createHTContract();

      const adminAddress = await contract.getAllAdmins();
      if (!adminAddress) return;
      for (let i of adminAddress) {
        if (i?.toLowerCase() == address?.toLowerCase()) {
          setAdminMode(true);
          break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMyAccount = () => {
    handleClose();
    router.push("/Account/AccountMgmt");
  };
  const handleLogout = () => {
    localStorage.removeItem("AccountAddress");
    localStorage.removeItem("pwd");
    setAddress();
    setAddressGlobal();
    setPasswordGlobal();
    handleClose();
    router.push("/");
  };
  useEffect(() => {
    handleGetAllMembers();
  }, [address]);

  return (
    <nav
      id="navbar-main"
      className="navbar-transparent headroom head flex flex-row justify-between items-center fixed px-8"
    >
      <Link href="/">
        <h1 className="py-4 px-4 font-bold text-3xl">HealthTrust</h1>
      </Link>

      <Link className="mr-4 p-4" href="/Register">
        Find a Doctor
      </Link>
      <Link className="mr-4 p-4" href="/Reports">
        Reports
      </Link>
      {address && (
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            className="text-white"
          >
            Dashboard
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleMyAccount}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      )}
      {adminMode && (
        <Link className="mr-4 p-4" href="/Manage">
          Manage
        </Link>
      )}
      <w3m-button />
    </nav>
  );
};
