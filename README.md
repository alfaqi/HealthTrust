# HealthTrust Platform

**Demo:** [HealthTrust](https://healthtrust-ten.vercel.app/)

## Description

HealthTrust is a blockchain-based healthcare system that facilitates secure and transparent medical record management. This platform ensures the integrity and accessibility of medical reports, connecting patients and doctors in a decentralized and efficient way.

## Features

1. **Secure Medical Reports:**

   - Encrypt your medical report in the blockchain, ensuring that only authorized individuals (you and doctors) can access it.

2. **Downloadable PDF Reports:**

   - Easily download your medical report as a PDF file for convenient offline access.

3. **IPFS Integration:**
   - Save your medical report to IPFS, enhancing accessibility and permanence.

## Smart Contract Details

### HTContract - main contract

- **Network:** Tọ̀rọ̀Net Testnet
- **Address:** [0xC359681269Fbcb90da069Fd88FC3D42c58168031](https://testnet.toronet.org/address.html?address=0xC359681269Fbcb90da069Fd88FC3D42c58168031)

```
https://testnet.toronet.org/address.html?address=0xC359681269Fbcb90da069Fd88FC3D42c58168031
```

### IPFSContract

- **Network:** Tọ̀rọ̀Net Testnet
- **Address:** [0xb89a1Df0E13AEf94B1260c7749174469BC6EcD88](https://testnet.toronet.org/address.html?address=0xb89a1Df0E13AEf94B1260c7749174469BC6EcD88)

```
https://testnet.toronet.org/address.html?address=0xb89a1Df0E13AEf94B1260c7749174469BC6EcD88
```

### HTChatMessenger

- **Network:** Tọ̀rọ̀Net Testnet
- **Address:** [0x185954cF2F089904C3e7d113EF21344C2fdfaab8](https://testnet.toronet.org/address.html?address=0x185954cF2F089904C3e7d113EF21344C2fdfaab8)

```
https://testnet.toronet.org/address.html?address=0x185954cF2F089904C3e7d113EF21344C2fdfaab8
```

### Transactions

- **Transaction Hash 1:** [0x96ee0f021ff5e60f6e7b8f2d529412d6e33f498106a1013d2900f7b38817811e](https://testnet.toronet.org/tx.html?id=0x96ee0f021ff5e60f6e7b8f2d529412d6e33f498106a1013d2900f7b38817811e)

```
https://testnet.toronet.org/tx.html?id=0x96ee0f021ff5e60f6e7b8f2d529412d6e33f498106a1013d2900f7b38817811e
```

- **Transaction Hash 2:** [0xa5b44ca7b51bb3131e26eddf6bbcc56ac05ed218b146096821a94fa7f66a851f](https://testnet.toronet.org/tx.html?id=0xa5b44ca7b51bb3131e26eddf6bbcc56ac05ed218b146096821a94fa7f66a851f)

```
https://testnet.toronet.org/tx.html?id=0xa5b44ca7b51bb3131e26eddf6bbcc56ac05ed218b146096821a94fa7f66a851f
```

- **Transaction Hash 3:** [0xc025d0ef119f2b09106bd5ec2580542f6a3c7ed899746561b09a8b2bb071b915](https://testnet.toronet.org/tx.html?id=0xc025d0ef119f2b09106bd5ec2580542f6a3c7ed899746561b09a8b2bb071b915)

```
https://testnet.toronet.org/tx.html?id=0xc025d0ef119f2b09106bd5ec2580542f6a3c7ed899746561b09a8b2bb071b915
```

- **Transaction Hash 4:** [0xebd8fe57e9fa2c62582bcb954e7ab5e3211d899a3f5b23b9cd7b3da4d744da42](https://testnet.toronet.org/tx.html?id=0xebd8fe57e9fa2c62582bcb954e7ab5e3211d899a3f5b23b9cd7b3da4d744da42)

```
https://testnet.toronet.org/tx.html?id=0xebd8fe57e9fa2c62582bcb954e7ab5e3211d899a3f5b23b9cd7b3da4d744da42
```

- **Transaction Hash 5:** [0xea521716099fbee2a08a0fa787a54c98b8805898cbcfdfae7e19cc8e266d397e](https://testnet.toronet.org/tx.html?id=0xea521716099fbee2a08a0fa787a54c98b8805898cbcfdfae7e19cc8e266d397e)

```
https://testnet.toronet.org/tx.html?id=0xea521716099fbee2a08a0fa787a54c98b8805898cbcfdfae7e19cc8e266d397e
```

## Originality

This project is an original creation by our team. We have built upon the following tools and frameworks:

### Backend

- Solidity
- Toronet Blockchain
- Hardhat
- Openzeppelin
- Ethers
- Axios

### Frontend

- Nextjs
- MUI: Material-UI library
- TailwindCSS

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

5. Set `Chain ID` to

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

## Challenges

There are some challenges that we faced, here's some of them and there solution:

### Challenge 1: msg.sender Limitations

- **Issue:** The blockchain doesn't fully support `msg.sender`.
- **Solution:** Utilize the entered address for identification.

### Challenge 2: Payable Function Issues

- **Issue:** Challenges with payable functions.
- **Solution:** Implement a more robust solution for handling payments.
