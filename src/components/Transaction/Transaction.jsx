// Customer.jsx

import React from "react";
import TransactionTable from "../TransactionTable/TransactionTable";

const Transaction = () => {
  return (
    <div className="container mt-4">
      <h2 className="h1 fw-bold mb-4">Transactions</h2>
      <TransactionTable />
    </div>
  );
};

export default Transaction;
