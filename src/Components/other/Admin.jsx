import React, { useEffect, useState } from "react";
import service from "../../appwrite/appwrite";
import { useNavigate } from "react-router-dom";
import "../../CSS/home/Admin.css";
import { FaRegUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import AddPhotos from "./AddPhotos";

const Admin = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await service.logout();
      navigate("/admin/login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  useEffect(() => {
    async function getUserdata() {
      try {
        const userData = await service.getCurrentUser(); 
        setUser(userData);
      } catch (error) {
        console.error("Failed to get user data:", error);
      }
    }

    getUserdata();
  }, []);

  return (
    <div className="admin-main">
      <div className="admin-top">
        <div className="admin-top-left">
          <FaRegUserCircle size={50} />
          <div className="admin-name-email">
            <h5>{user.name}</h5>
            <p>{user.email}</p>
          </div>
        </div>
        <button className="bg-danger" onClick={handleLogout}>
          Logout <MdLogout size={25} className="ps-1" />
        </button>
      </div>
      <AddPhotos/>
    </div>
  );
};

export default Admin;
