const axios = require("axios");
export const getBalance = async (addr) => {
  let params = {
    op: "getbalance",
    params: [
      {
        name: "addr",
        value: addr,
      },
    ],
  };
  let output;

  await axios
    .get("https://testnet.toronet.org/api/token/toro/", {
      headers: {
        "Content-Type": "application/json",
      },
      params: params,
    })
    .then((response) => {
      output = response;
    })
    .catch((error) => {
      output = error;
    });
  return output;
};

export const transferAmount = async (from, to, pwd, amount) => {
  let data = {
    op: "transfer",
    params: [
      { name: "client", value: from },
      { name: "clientpwd", value: pwd },
      { name: "to", value: to },
      { name: "val", value: amount },
    ],
  };

  let output;

  await axios
    .post("https://testnet.toronet.org/api/token/toro/cl", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      output = response;
    })
    .catch((error) => {
      output = error;
    });
  return output;
};

export const createNewAccount = async (PWD) => {
  let data = {
    op: "createkey",
    params: [{ name: "pwd", value: PWD }],
  };

  let output;

  await axios
    .post("https://testnet.toronet.org/api/keystore", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      output = response;
    })
    .catch((error) => {
      output = error;
    });
  return output;
};

export const changePWD = async (addr, oldPassword, newPassword) => {
  let data = {
    op: "updatekeypwd",
    params: [
      { name: "addr", value: addr },
      { name: "oldpwd", value: oldPassword },
      { name: "newpwd", value: newPassword },
    ],
  };

  let output;

  await axios
    .post("https://testnet.toronet.org/api/keystore", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      output = response;
    })
    .catch((error) => {
      output = error;
    });
  return output;
};

export const verifyKey = async (addr, password) => {
  let params = {
    op: "verifykey",
    params: [
      { name: "addr", value: addr },
      { name: "pwd", value: password },
    ],
  };
  let output;

  await axios
    .get("https://testnet.toronet.org/api/keystore/", {
      headers: {
        "Content-Type": "application/json",
      },
      params: params,
    })
    .then((response) => {
      output = response;
    })
    .catch((error) => {
      output = error;
    });
  return output;
};
