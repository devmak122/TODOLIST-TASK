import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import DeleteModel from "../models/DeleteTask";

const Header = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    logout();
    toast.success("logged out successfully");
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // const handleDelete = () => {
  //   setIsDeleteModalOpen(false);
  //   toast.success("Task deleted successfully");
  // };
  return (
    <header className="w-full px-4 py-4 flex items-center justify-between bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 shadow-lg dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-300">
      {/* Left side - logo/title */}
      <div className="flex items-center">
        <span className="text-3xl font-extrabold tracking-wide mr-4 font-mono dark:text-white">
          Todo
        </span>
      </div>

      {/* Navigation links */}
      {token ? (
        <nav className="flex-1 flex justify-center items-center gap-6 animate-fade-in">
          <Link
            to="/tasks"
            className="text-xl font-semibold text-purple-700 hover:text-pink-500 transition-all duration-200"
          >
            Task List
          </Link>
          {/* <button 
            onClick={() => set(true)}
            className="text-xl font-semibold text-purple-700 hover:text-pink-500 transition-all duration-200"
          >
            Add New Task
          </button> */}
        </nav>
      ) : null}

      {/* Right side  */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {token ? (
          <button
            className="px-5 py-2 rounded-lg bg-gradient-to-r text-xl from-pink-400 to-purple-400 text-white font-bold shadow hover:scale-105 transition-all duration-200"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="px-3 py-1 rounded-lg bg-gradient-to-r from-purple-400 to-blue-400 text-white font-bold shadow hover:scale-105 transition-all duration-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-3 py-1 rounded-lg bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold shadow hover:scale-105 transition-all duration-200"
            >
              Register
            </Link>
          </>
        )}
      </div>
      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <DeleteModel
          onClose={() => setIsDeleteModalOpen(false)}
          isLoading={false}
          handleDelete={() => {
            setIsDeleteModalOpen(false);
            toast.success("Task deleted successfully");
          }}
        />
      )}
    </header>
  );
};

export default Header;
