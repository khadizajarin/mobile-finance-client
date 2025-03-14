

```md
# Mobile Finance Web App - Server Side  

🚀 **Live API:** https://mobile-finance-server-production.up.railway.app/

This is the **backend** of the Mobile Finance Web App, a secure financial transaction platform inspired by services like **bKash & Nagad**. It provides API endpoints for **User, Agent, and Admin** functionalities, including secure authentication, transactions, and role-based access control.  

## 🔹 **Tech Stack**  
- **Node.js & Express.js**  
- **MongoDB & Mongoose**  
- **JWT Authentication**  
- **BCrypt for Password & PIN Hashing**  
- **CORS & Helmet for Security**  

## 🔹 **Features**  
✅ **User Features:**  
- Register/Login securely  
- Send Money with PIN validation  
- Cash-in & Cash-out functionalities  
- View transaction history  

✅ **Agent Features:**  
- Approve Cash-in/Cash-out transactions  
- Manage balance for users  
- Dashboard access  

✅ **Admin Features:**  
- Manage users & agents  
- Approve new agents  
- Monitor all transactions  

## 🔹 **Setup Instructions**  

### 1️⃣ Clone the Repository  
```bash
git clone [Server Repo GitHub Link]
cd server
```

### 2️⃣ Install Dependencies  
```bash
npm install
```

### 3️⃣ Create a `.env` file and add:  
```env
PORT=5000
MONGO_URI=[Your MongoDB Connection String]
JWT_SECRET=[Your JWT Secret Key]
CORS_ORIGIN=http://localhost:3000,https://mobile-finance.netlify.app
```

### 4️⃣ Run Locally  
```bash
npm start
```

## 🔹 **API Endpoints**  

📌 **Authentication**  
- `POST /api/auth/register` → Register new users  

📌 **Transactions**  
- `POST /api/transactions/send-money` → Send money to another user  
- `POST /api/transactions/cash-in` → Deposit money to user balance  
- `POST /api/transactions/cash-out` → Withdraw money  

📌 **User Management**  
- `GET /api/users?email=user@example.com` → Get user details  
- `GET /api/users/approved` → List approved users  

📌 **Admin Management**  
- `GET /api/admin/pending-agents` → Get pending agent requests  
- `PUT /api/admin/approve-agent` → Approve agent registration  

## 🔹 **Login Credentials for Testing**  
👨‍💼 **Admin**  
📧 Email: `khadiza131310@gmail.com` | 🔑 Password: `12345678`  

👤 **User**  
📧 Email: `khadiza131313@gmail.com` | 🔑 Password: `12345678` | PIN: `24680` | 📱 Mobile: `01315929363`  

🧑‍💼 **Agent**  
📧 Email: `n.ahmed@gmail.com` | 🔑 Password: `12345678` | PIN: `40321` | 📱 Mobile: `01676804470`  

## 🔹 **Deployment**  
- **Backend deployed on:** [\[Railway Deployment Link\]  ](https://mobile-finance-server-production.up.railway.app/)
- **Frontend (Client Side) deployed on:** [\[Netlify Deployment Link\]  ](https://mobile-finance.netlify.app)

🚀 **Contributions are welcome!**  
```
