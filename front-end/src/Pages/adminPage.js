import React, { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";
import UserList from "../components/userList";
import AdminBarChart from "../components/adminBarChart";
import AdminChartActivity from "../components/adminChartActivity";

export default function MainPage() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Router>
        <h1>admin Page</h1>
        {user.Role == "Admin" ? (
          <>
            <UserList />
            <AdminBarChart />
            <AdminChartActivity />
          </>
        ) : (
          <></>
        )}
      </Router>
    </div>
  );
}
