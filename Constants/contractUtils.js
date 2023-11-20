import { ethers } from "ethers";
import jsPDF from "jspdf";

import HealthTrustAbi from "/Constants/HealthTrust.json";
import IPFSHashesAbi from "/Constants/IPFSHashes.json";
import HTChatMessengerAbi from "/Constants/HTChatMessenger.json";
import HTLivestreamAbi from "/Constants/HTLivestream.json";

// Contracts Addresses
export const HealthTrustAddress = "0xC359681269Fbcb90da069Fd88FC3D42c58168031"; // Toronet Testnet

export const IPFSHashesAddress = "0xb89a1Df0E13AEf94B1260c7749174469BC6EcD88"; // Toronet Testnet

export const HTChatMessengerAddress =
  "0xE402962b7c651bFE9B6269323Ca7c72e0E169b97"; // Toronet Testnet

export const HTLivestreamAddress = "0x0f2bc42F45CD95d10AB3a93aC3C31f32451DBc4c"; // Toronet Testnet

// Toronet wallet Addresses
export const adminAddress = "0xfb29a4e3a100fbafd368f2a74e907cf4e276e10f";

// toronet
export const WalletForContract = "0xf5664df82321cab6591ee267cd9ab53f2369692d";
export const WalletForContractPWD = "1234567890";

export const doctorAddress = "0xb72ab84f684537f992e9d9d1ef6cadb03854f148";
export const doctorAddress2 = "0xd65959409f7a87f4f153851969330002cdd11cb6";

export const patientAddress = "0xb678706b2dc47642acb3f93ce87e8703712ef329";
export const patientAddress2 = "0x52d7f2bfd31bb3f801340b75f7d9f9635dfa241d";

export const createHTContract = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(
    HealthTrustAddress,
    HealthTrustAbi,
    signer
  );
  return contract;
};

export const createHTContractIPFS = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(
    IPFSHashesAddress,
    IPFSHashesAbi,
    signer
  );
  return contract;
};

export const createHTChatMessengerContract = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(
    HTChatMessengerAddress,
    HTChatMessengerAbi,
    signer
  );
  return contract;
};

export const createHTLivestreamContract = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(
    HTLivestreamAddress,
    HTLivestreamAbi,
    signer
  );
  return contract;
};

function breakStringIntoLines(text, lineLength) {
  const regex = new RegExp(`.{1,${lineLength}}`, "g");
  return text.match(regex).join("\n\t");
}

export const downloadPdf = (reportID, from, to, summary, upload) => {
  const lineLength = 90;

  const brokenLines = breakStringIntoLines("\t" + summary, lineLength);

  const text = `
  Report ID: ${reportID}
  Doctor: ${from}
  Patient: ${to}

  --------------------SUMMARY:--------------------
  ${brokenLines}
  -------------------------------------------------
  `;
  const pdf = new jsPDF();
  pdf.setFontSize(12);
  pdf.text(text, 10, 10);
  if (upload) {
    const file = pdf.output();
    return file;
  }
  pdf.save(`Report ${reportID}.pdf`);
};
