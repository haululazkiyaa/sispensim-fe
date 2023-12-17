import { AuthContext } from "../../context/AuthContext";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from "react";

export default function SupervisorPage() {
  const { profile } = useContext(AuthContext);
  {
  }
  return (
    <DashboardLayout>
      {profile.role === "PEMBIMBING" ? (
        <Outlet />
      ) : (
        <div>Anda tidak memiliki akses ke halaman ini!</div>
      )}
    </DashboardLayout>
  );
}

SupervisorPage.propTypes = {
  children: PropTypes.node,
};
