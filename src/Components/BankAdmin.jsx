import React from "react";
import { Outlet } from "react-router-dom";

export default function BankAdmin() {
  return (
    <div>
      <h1 className="text-center">Admin Panel</h1>
      <Outlet />
    </div>
  );
}
