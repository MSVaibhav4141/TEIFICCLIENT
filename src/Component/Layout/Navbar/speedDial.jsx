import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import WidgetsIcon from "@mui/icons-material/Widgets";
import Backdrop from "@mui/material/Backdrop";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { logoutUser } from "../../../actions/userAction";
import { useDispatch } from "react-redux";
import "./speedDial.css";
import { toast } from "react-toastify";
const SpeedDials = ({ user }) => {
  // const { error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Functions
  const dashboard = () => {
    navigate("/admin/dashboard");
  };
  const account = () => {
    navigate("/account");
  };
  const orders = () => {
    navigate("/orders");
  };
  const logout = () => {
    dispatch(logoutUser());
    toast.info("Logout Successfully");
  };

  const actions = [
    { icon: <AccountCircleIcon />, name: "Account", func: account },
    { icon: <WidgetsIcon />, name: "Orders", func: orders },
    { icon: <LogoutIcon />, name: "Logout", func: logout },
  ];

  // Hooks Initialization
  const [role, setRole] = useState(false);
  // Hooks
  useEffect(() => {
    if (user) {
      setRole(user);
    }
  }, [user]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (role && role.user !== undefined) {
    if (role.user.role === "admin") {
      actions.unshift({
        icon: <DashboardIcon />,
        name: "Dashboard",
        func: dashboard,
      });
    }
  }
  return (
    <div>
      <Backdrop open={open} style={{ zIndex: "4" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: "absolute", top: 0, right: 16 }}
        icon={<AccountCircleIcon className="_speeddialicon" />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="down"
        style={{ width: "0vmax" }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            className="speed"
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => {
              handleClose();
              action.func();
            }}
          />
        ))}
      </SpeedDial>
    </div>
  );
};

export default SpeedDials;
