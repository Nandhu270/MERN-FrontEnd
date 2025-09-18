import React from "react";
import Register from "./Components/Register";
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentData from "./Components/StudentData";
import Domino from "./Components/Domino";
import Food from "./Components/Food";
import Order from "./Components/Order";
import Student from "./Components/Student";
import Edit from "./Components/Edit";
import Adminlogin from "./Components/Adminlogin";
import Dashboard from "./Components/Dashboard";
import BankAdmin from "./Components/BankAdmin";
import Account from "./Components/Account";
import AccountDetails from "./Components/AccountDetails";
import Jwt from "./Components/Jwt";
import Page from './Components/Page'
import RestaurantApp from "./RestaurantApp";
import DashBoard from './RestaurantApp/Dashboard';
import CustomerLogin from "./RestaurantApp/CustomerLogin";
import CustomerRegister from './RestaurantApp/CustomerRegister';
import Natureindex from "./NatureApp/Natureindex";
import NatureLogin from "./NatureApp/NatureLogin";
import NatureRegister from "./NatureApp/NatureRegister";
import NatureDashboard from "./NatureApp/NatureDashboard";
import Imageindex from "./ImageApp/Imageindex";
import ImageForm from "./ImageApp/ImageForm";
import ViewImage from "./ImageApp/ViewImage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Jwt />}/>
        <Route path="/student" element={<Student />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/order" element={<Order />} />
        <Route path="/domino" element={<Domino />} />
        <Route path="/food" element={<Food />} />
        <Route path="/table" element={<StudentData />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/page" element={<Page />} />

        <Route path="/bank/admin/*" element={<BankAdmin />}>
          <Route index element={<Adminlogin />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="account" element={<Account />} />
          <Route path="details" element={<AccountDetails />} />
        </Route>

        <Route path="/app/food/*" element={<RestaurantApp />}> 
          <Route index element={<CustomerLogin />} />
          <Route path="register" element={<CustomerRegister />} />
          <Route path="dashboard" element={<DashBoard />} />
        </Route>

        <Route path="/app/nature/*" element={<Natureindex />}>
          <Route index element={<NatureLogin />} />
          <Route path="register" element={<NatureRegister />} />
          <Route path="dashboard" element={<NatureDashboard />} />
        </Route>

        <Route path="/app/image/*" element={<Imageindex />}>
          <Route index element={<ImageForm />} />
          <Route path="view" element={<ViewImage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
