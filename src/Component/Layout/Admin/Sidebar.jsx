import React from "react";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import PostAddIcon from "@mui/icons-material/PostAdd";
import "./sidebar.css";
const Sidebar = ({ isShown }) => {
  return (
    <>

      <div className={`_admin-panel ${isShown ? "_toggle-admin-panel" : ""}`}>
        <Link to="/admin/dashboard">
          <DashboardIcon />
          Dashboard
        </Link>
        <SimpleTreeView
          defaultExpandedItems={["1"]}
          slots={{
            expandIcon: ImportExportIcon,
            collapseIcon: ExpandMoreIcon,
            endIcon: PostAddIcon,
          }}
        >
          <TreeItem itemId="1" label="Products">
            <Link to="/admin/products/all">
              <TreeItem itemId="2" label="All" />
            </Link>

            <Link to="/admin/product/new/create" className="_tree-view">
              <TreeItem itemId="3" label="Create" />
            </Link>
          </TreeItem>
        </SimpleTreeView>
        <Link to="/admin/orders/all">
          <p>
            <ListAltIcon />
            Orders
          </p>
        </Link>
        <Link to="/admin/users/all">
          <p>
            <PeopleIcon /> Users
          </p>
        </Link>
        <Link to="/admin/reviews">
          <p>
            <RateReviewIcon />
            Reviews
          </p>
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
