import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch customers data
        const customersResponse = await axios.get(
          `https://customer-transaction.vercel.app/customers`
        );
        if (customersResponse.status !== 200) {
          throw new Error("Failed to fetch customers");
        }
        setCustomers(
          Array.isArray(customersResponse.data) ? customersResponse.data : []
        );

        // Fetch transactions data
        const transactionsResponse = await axios.get(
          `https://customer-transaction.vercel.app/transaction`
        );
        if (transactionsResponse.status !== 200) {
          throw new Error("Failed to fetch transactions");
        }
        setTransactions(
          Array.isArray(transactionsResponse.data)
            ? transactionsResponse.data
            : []
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        // Log the detailed Axios error response for debugging
        if (error.response) {
          console.log("Axios detailed error response:", error.response);
        }
      }
    };

    fetchData();
  }, []);

  // Function to map transactions with customer names
  const getTransactionsWithCustomerNames = () => {
    if (!Array.isArray(transactions)) return [];
    return transactions.map((transaction) => {
      // Find corresponding customer for the transaction
      const customer = customers.find((customer) => {
        return customer.id === transaction.customer_id;
      });
      // Return transaction with customerName
      return {
        ...transaction,
        customerName: customer ? customer.name : "Unknown",
      };
    });
  };

  return (
    <DataContext.Provider
      value={{
        customers,
        transactions: getTransactionsWithCustomerNames(),
        selectedCustomerId,
        setSelectedCustomerId,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
