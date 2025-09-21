import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome, AiOutlineUser, AiOutlinePlusCircle } from "react-icons/ai";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const iconStyle = { color: "white", fontSize: "24px", marginRight: "20px" };

  return (
    <nav
      style={{
        background: "#007bff",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {}
      <div>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          <AiFillHome style={{ fontSize: "28px" }} />
        </Link>
      </div>

      {}
      <div style={{ display: "flex", alignItems: "center" }}>
        {isLoggedIn ? (
          <>
            <Link to="/create-post" style={iconStyle}>
              <AiOutlinePlusCircle title="Create Post" />
            </Link>
            <Link to="/profile" style={iconStyle}>
              <AiOutlineUser title="Profile" />
            </Link>
            <button
              onClick={handleLogout}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{ color: "white", textDecoration: "none", marginRight: "20px" }}
            >
              Login
            </Link>
            <Link to="/register" style={{ color: "white", textDecoration: "none" }}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
