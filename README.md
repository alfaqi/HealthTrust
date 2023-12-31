# HealthTrust Platform

**Live Demo:** [HealthTrust](https://healthtrust-blond.vercel.app/) (Toronet testnet)

**Video:** [HealthTrust](https://drive.google.com/file/d/1zEihvdMUQzQgAV4I4oulNBSiOkfrfSGf/view?usp=drive_link)

**Accounts for testing**:

- Admin
  - Address: 0xfb29a4e3a100fbafd368f2a74e907cf4e276e10f
  - Password: toronet
- Doctor 1
  - Address: 0xb72ab84f684537f992e9d9d1ef6cadb03854f148
  - Password: toronet
- Doctor 2
  - Address: 0xd65959409f7a87f4f153851969330002cdd11cb6
  - Password: toronet
- Doctor 3
  - Address: 0x054cf4979a65e9686269c8e6a3872a600e4d55db
  - Password: toronet
- Patient 1
  - Address: 0xb678706b2dc47642acb3f93ce87e8703712ef329
  - Password: toronet
- Patient 2
  - Address: 0x52d7f2bfd31bb3f801340b75f7d9f9635dfa241d
  - Password: toronet

## Description

HealthTrust is a blockchain-based healthcare system that facilitates secure and transparent medical record management. This platform ensures the integrity and accessibility of medical reports, connecting patients and doctors in a decentralized and efficient way.

## Features

1. **Secure Medical Reports:**

   - Encrypt your medical report in the blockchain, ensuring that only authorized individuals (you and doctors) can access it.
   - Only the doctor involved can add the medical report.

2. **Downloadable PDF Reports:**

   - Easily download your medical report as a PDF file for convenient offline access.

3. **IPFS Integration:**

   - Save your medical report to IPFS, enhancing accessibility and permanence.

4. **Livestreaming Capabilities:**

   - Integrated livestream functionality allows for real-time interaction with healthcare providers, facilitating remote consultations and support.

5. **Chat Messenger (Integrated within HealthTrust Platform):**

   - Utilize the chat messenger for real-time interaction with doctors to discuss health concerns before providing the medical report.

![HealthTrust Platform](HealthTrust.png)

## Getting Started

### Setting Up MetaMask and Adding Toro Token

Follow these steps to configure MetaMask and add Toro Token:

[Step 1: Install MetaMask Extension in Chrome](#step-1-install-metamask-extension-in-chrome)  
[Step 2: Connecting to Toronet With MetaMask](#step-2-connecting-to-toronet-with-metamask)  
[Step 3: Add Toro Token into MetaMask](#step-3-add-toro-token-into-metamask)

### Step 1: Install MetaMask Extension in Chrome

To install MetaMask, follow the instructions provided.

```
https://www.geeksforgeeks.org/how-to-install-and-use-metamask-on-google-chrome/
```

### Step 2: Connecting to Toronet With MetaMask

1. Inside of MetaMask, click the toggle that by default says `Ethereum Mainnet`.
2. Then select `Custom RPC`.
3. Set the name to `Toronet Test` Network.
4. Set the `New RPC URL` to the current public RPC address for the Toronet testnet:

```
https://testnet.toronet.org/rpc/
```

5. Set `ChainID` to

```
54321
```

6. Set the blockchain explorer to

```
https://testnet.toronet.org/
```

7. The rest of the entries on the interface are optional and not required.

### Step 3: Add Toro Token into MetaMask

1. On the Add Token page, click on the Custom Token tab to expand the search window.
2. Enter the token address in the field called Token Address:

```
0x21fe4779B8b8e00Fb76e754A1D527ad758DfEdE7
```

3. In most cases, the Token Symbol and Decimals of Precision will autofill; otherwise, refer to the token project’s documentation for these details.
4. Click `Next` to proceed.
5. You will be redirected to confirm adding a token. Click `Add Token` to confirm.

The contract address of other tokens on the network will be added on this page as they become available on the RPC port.

## Preparations

Follow the steps below to start project locally.

**Installing**
Clone the repo

```
git clone https://github.com/alfaqi/HealthTrust.git
```

**Change into the directory**

```
cd HealthTrust
```

**Install dependencies**

```
npm i
```

**Run the project**

```
npm run dev
```

**Open the browser**

```
http://localhost:3000/
```

## Smart Contract Details

### HT Contract - main contract

- **Network:** Tọ̀rọ̀Net Testnet
- **Address:** [0xC359681269Fbcb90da069Fd88FC3D42c58168031](https://testnet.toronet.org/address.html?address=0xC359681269Fbcb90da069Fd88FC3D42c58168031)

```
https://testnet.toronet.org/address.html?address=0xC359681269Fbcb90da069Fd88FC3D42c58168031
```

### IPFS Contract

- **Network:** Tọ̀rọ̀Net Testnet
- **Address:** [0xb89a1Df0E13AEf94B1260c7749174469BC6EcD88](https://testnet.toronet.org/address.html?address=0xb89a1Df0E13AEf94B1260c7749174469BC6EcD88)

```
https://testnet.toronet.org/address.html?address=0xb89a1Df0E13AEf94B1260c7749174469BC6EcD88
```

### HTChatMessenger Contract

- **Network:** Tọ̀rọ̀Net Testnet
- **Address:** [0x185954cF2F089904C3e7d113EF21344C2fdfaab8](https://testnet.toronet.org/address.html?address=0x185954cF2F089904C3e7d113EF21344C2fdfaab8)

```
https://testnet.toronet.org/address.html?address=0x185954cF2F089904C3e7d113EF21344C2fdfaab8
```

### HTLivestream Contract

- **Network:** Tọ̀rọ̀Net Testnet
- **Address:** [0x0f2bc42F45CD95d10AB3a93aC3C31f32451DBc4c](https://testnet.toronet.org/address.html?address=0x0f2bc42F45CD95d10AB3a93aC3C31f32451DBc4c)

```
https://testnet.toronet.org/address.html?address=0x0f2bc42F45CD95d10AB3a93aC3C31f32451DBc4c
```

### Transactions

1. HTContract

   - **Transaction Hash 1:** [0x96ee0f021ff5e60f6e7b8f2d529412d6e33f498106a1013d2900f7b38817811e](https://testnet.toronet.org/tx.html?id=0x96ee0f021ff5e60f6e7b8f2d529412d6e33f498106a1013d2900f7b38817811e)

   - **Transaction Hash 2:** [0xa5b44ca7b51bb3131e26eddf6bbcc56ac05ed218b146096821a94fa7f66a851f](https://testnet.toronet.org/tx.html?id=0xa5b44ca7b51bb3131e26eddf6bbcc56ac05ed218b146096821a94fa7f66a851f)

   - **Transaction Hash 3:** [0xc025d0ef119f2b09106bd5ec2580542f6a3c7ed899746561b09a8b2bb071b915](https://testnet.toronet.org/tx.html?id=0xc025d0ef119f2b09106bd5ec2580542f6a3c7ed899746561b09a8b2bb071b915)

   - **Transaction Hash 4:** [0xebd8fe57e9fa2c62582bcb954e7ab5e3211d899a3f5b23b9cd7b3da4d744da42](https://testnet.toronet.org/tx.html?id=0xebd8fe57e9fa2c62582bcb954e7ab5e3211d899a3f5b23b9cd7b3da4d744da42)

   - **Transaction Hash 5:** [0xea521716099fbee2a08a0fa787a54c98b8805898cbcfdfae7e19cc8e266d397e](https://testnet.toronet.org/tx.html?id=0xea521716099fbee2a08a0fa787a54c98b8805898cbcfdfae7e19cc8e266d397e)

2. IPFSContract

   - **Transaction Hash 1:** [0xcb14aa394d0e591db13f02ded0baa77fbe6be68b02533a87df6dc99a122a8e65](https://testnet.toronet.org/tx.html?id=0xcb14aa394d0e591db13f02ded0baa77fbe6be68b02533a87df6dc99a122a8e65)

3. HTChatMessenger

   - **Transaction Hash 1:** [0xa30721d9b869362e92ee3e5263ed65759b699b1180b6b888b925a9cadb4addc8](https://testnet.toronet.org/tx.html?id=0xa30721d9b869362e92ee3e5263ed65759b699b1180b6b888b925a9cadb4addc8)

4. HTLivestream
   - **Transaction Hash 1:** [0x018518b5562655b537b9fcfd8520aecda49a567791c1dab2996e15448759e560](https://testnet.toronet.org/tx.html?id=0x018518b5562655b537b9fcfd8520aecda49a567791c1dab2996e15448759e560)

## Originality

This project is an original creation by our team. We have built upon the following tools and frameworks:

### Backend

- Solidity
- Toronet Blockchain
- Toronet API stack
- Hardhat
- Openzeppelin
- Ethers
- Axios
- Web3.storage
- Livepeer

### Frontend

- Nextjs
- MUI: Material-UI library
- TailwindCSS

## Challenges

There are some challenges that we faced, here's some of them and there solution:

### Challenge 1: msg.sender Limitations

- **Issue:** The blockchain doesn't fully support `msg.sender`.
- **Solution:** Utilize the entered address for identification.

### Challenge 2: Payable Function Issues

- **Issue:** Challenges with payable functions.
- **Solution:** Implement a more robust solution for handling payments.
