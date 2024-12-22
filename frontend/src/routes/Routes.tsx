import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage/HomePage";
import SearchPage from "../pages/SearchPage/SearchPage";
import CompanyPage from "../pages/CompanyPage/CompanyPage";
import CompanyProfile from "../components/CompanyProfile/CompanyProfile";
import DesignPage from "../pages/DesignPage/DesignPage";
import IncomeStatement from "../components/IncomeStatement/IncomeStatement";
import BalanceSheet from "../components/BalanceSheet/BalanceSheet";
import CashFlowStatement from "../components/CashFlowStatement/CashFlowStatement";
import LoginPage from "../pages/LoginPage/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      { path: "", element: <HomePage/> },
      { path: "login", element: <LoginPage /> },
      { path: "search", element: <SearchPage/> },
      { path: "design-guide", element: <DesignPage/> },
      { path: "company/:ticker", element: <CompanyPage/>,
        children: [
          { path: "company-profile", element: <CompanyProfile/> },
          { path: "income-statement", element: <IncomeStatement/> },
          { path: "balance-sheet", element: <BalanceSheet/> },
          { path: "cashflow-statement", element: <CashFlowStatement/> }
        ]
      }
    ]
  }
])