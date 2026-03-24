# EXASHARP ERP 🏗️

Exasharp is a modern, modular, and lightweight Enterprise Resource Planning (ERP) solution designed to streamline business operations without the complexity of legacy systems.

> [!WARNING]  
> **Status: Work in Progress.** Exasharp is currently in the active development phase. Features are being added daily, and the API/Database schema is subject to change.

---

## ✨ Core Features (Planned & In-Dev)

* **📈 Financials:** General Ledger, Accounts Payable/Receivable, and Multi-currency support.
* **📦 Inventory:** Real-time stock tracking, multi-warehouse management, and SKU history.
* **🤝 CRM & Sales:** Lead tracking, quotation management, and automated invoicing.
* **👥 Human Resources:** Employee directory, leave management, and basic payroll.
* **📊 Analytics:** Interactive dashboards with real-time business health metrics.

---

## 🛠️ Technical Stack

- **Backend:** Node / Express.js
- **Frontend:** React / Tailwind CSS
- **Database:** PostgreSQL

---

## ▶️ Run the Project

Install dependencies first:

```bash
npm run install-all
```

Run from project root (`EXASHARP_new`):

```bash
# Run backend (nodemon) + frontend (vite)
npm run dev

# Run backend only (nodemon)
npm start
```

Run backend only from `server` folder:

```bash
npm install
npm run dev
# or
npm start
```

Run frontend only from `client` folder:

```bash
npm install
npm run dev
# or
npm start
```

