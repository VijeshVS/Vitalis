# Vitalis

Vitalis is a **decentralized healthcare platform** developed as part of a 36-hour hackathon at **NMIT Bangalore**. The platform fosters transparency between doctors and patients, giving patients greater control over their healthcare data. 

In the current healthcare system, patients often lack ownership of their data, which is typically controlled by organizations and third parties. Vitalis addresses this problem by empowering patients with full ownership and control over their data on a **blockchain-powered decentralized platform**.

---

## 🛠️ Features and Tracks

### 1. **Patients**
- **Book Appointments**: Patients can consult and schedule appointments with doctors based on their needs.
- **Doctor Recommendation**: Integrated with the **Gemini API**, Vitalis suggests doctors based on user details like age, height, weight, and symptoms.
- **Manage Data**: Patients can view their upcoming appointments and securely access documents (e.g., diagnosis reports) issued by doctors.
- **Privacy**: All documents are accessible only by the patient and the issuing doctor.

### 2. **Doctors**
- **Manage Appointments**: Doctors can view and manage their appointments with patients.
- **Diagnosis and Reports**: Doctors can generate and issue diagnosis reports.
- **Security**: Diagnosis reports are stored securely on **IPFS**, with encryption to ensure only the intended patient can access them.

---

## 🔐 Data Security and Encryption

- Diagnosis reports are stored on **IPFS** to minimize transaction costs.
- Reports are encrypted using the patient's **public key**, ensuring that only the patient can decrypt them using their **private key**.

---

## 💡 Why Smart Contracts?

Smart contracts are the backbone of Vitalis, automating critical processes and ensuring security, transparency, and decentralization. They eliminate the need for intermediaries, reducing operational inefficiencies and costs. 

### **Key Benefits**:
- **Automation**: Smart contracts handle tasks like doctor and user sign-up/sign-in, booking appointments, and issuing documents seamlessly.
- **Transparency**: All actions are recorded immutably on the blockchain, fostering trust between stakeholders.
- **Security**: Sensitive patient data and documents are encrypted, ensuring only authorized parties can access them.
- **Decentralization**: Eliminates reliance on centralized systems prone to data breaches or misuse.

The use of smart contracts ensures a smooth and efficient workflow for both doctors and patients, making healthcare interactions more accessible and trustworthy.

---

## 🚀 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Blockchain**: [Solidity](https://soliditylang.org/) smart contracts
- **Tools**: [Remix IDE](https://remix.ethereum.org/)
- **Storage**: [IPFS](https://ipfs.tech/)
- **Integration**: Gemini API
- **Blockchain Network**: Sepolia testnet
- **Web3 Library**: [Web3.js](https://web3js.readthedocs.io/)

---

## 🎉 Team Members

Special thanks to my amazing team members who made this project possible:

| Name       | GitHub Profile                                                   |
|------------|------------------------------------------------------------------|
| Varenya    | ![Varenya](https://github.com/harishpuvvada.png?size=25) [varenyathaker](https://github.com/varenyathaker) |
| Shrish     | ![Shrish](https://github.com/BoogieMonster1O1.png?size=50) [BoogieMonster1O1](https://github.com/BoogieMonster1O1) |
| Samkit     | ![Samkit](https://github.com/samkitsamsukha.png?size=50) [samkitsamsukha](https://github.com/samkitsamsukha) |

---

## 🌐 Deployment

Vitalis is live! [Check it out here](https://vitalis.shrishdeshpande.com)

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

> Made with ❤️ during a 36-hour hackathon at NMIT Bangalore.
