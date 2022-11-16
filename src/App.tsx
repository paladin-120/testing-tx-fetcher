import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import Transactions from "./pages/transactions/transactions";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Navigate replace to="/" />} />
        <Route path="" element={<Dashboard />} />
        <Route path="tx/:pubkey" element={<Transactions />} />
      </Routes>
    </div>
  );
}

export default App;
