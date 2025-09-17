import React from "react";
import { Navigate } from "react-router-dom";

// //login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";

import PrivacyPolicy from "../pages/Pages/PrivacyPolicy";

// // User Profile
import UserProfile from "../pages/Authentication/user-profile";

import ResetPassword from "pages/Authentication/ResetPassword";
import VerifyUser from "pages/Authentication/VerifyUser";
import Alt401 from "pages/AuthenticationInner/Errors/Alt401";
import Users from "pages/Users";
import Customers from "pages/Customers";
import CustomersOrders from "pages/CustomersOrders";
import Vendors from "pages/Vendors";
import VendorProfile from "pages/Vendors/vendor-profile";
import Advertisements from "pages/Advertisements";
import CustomerOrderInvoiceDetails from "pages/CustomersOrders/CustomerOrderInvoiceDetails";
import Dashboard from "pages/Dashboard";
import VendorAdd from "pages/Vendors/vendor-add";
import VendorProductDetails from "pages/Vendors/vendor-product-details";
import Products from "pages/Products";
import CreateProduct from "pages/Products/create-product";
import Categories from "pages/Categories";
import CreateCategory from "pages/Categories/create-category";
import CustomersInvoices from "pages/CustomersInvoices";
import AddUser from "pages/Users/add-user";

const authProtectedRoutes = [
  // Admin Pages
  { path: "/dashboard", component: <Dashboard /> },

  { path: "/dashboard/products", component: <Products /> }, // Used Later
  { path: "/dashboard/products/add", component: <CreateProduct /> }, // Used Later
  {
    path: "/dashboard/products/:productId",
    component: <VendorProductDetails />,
  }, // Used Later

  { path: "/dashboard/categories", component: <Categories /> }, // Used Later
  { path: "/dashboard/categories/add", component: <CreateCategory /> }, // Used Later

  // Users
  { path: "/dashboard/users", component: <Users /> },
  { path: "/dashboard/users/add", component: <AddUser /> },

  // Invoices
  {
    path: "/dashboard/invoices",
    component: <CustomersInvoices />,
  },

  // Orders
  { path: "/dashboard/customers", component: <Customers /> },
  { path: "/dashboard/customers/orders", component: <CustomersOrders /> },
  {
    path: "/dashboard/customers/orders/:orderId",
    component: <CustomerOrderInvoiceDetails />,
  },

  // Advertisements
  { path: "/dashboard/advertisements", component: <Advertisements /> },

  // Fallback
  { path: "/index", component: <Dashboard /> },

  //User Profile
  { path: "/profile", component: <UserProfile /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
  { path: "*", component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/reset-password", component: <ResetPassword /> },
  { path: "/verify-user", component: <VerifyUser /> },
  { path: "/verify", component: <VerifyUser /> },
  { path: "/register", component: <Register /> },
  { path: "/privacy-policy", component: <PrivacyPolicy /> },
  { path: "/auth-401", component: <Alt401 /> },
  // --------------------------------------------------------

];

export { authProtectedRoutes, publicRoutes };
