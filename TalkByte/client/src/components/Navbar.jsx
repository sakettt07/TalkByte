import { LogOut, BotMessageSquare, User } from "lucide-react";
import React, { use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/slices/auth.slice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <header className="py-1 px-8 fixed top-0 w-full backdrop-blur-md bg-white/10 text-white z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-14">
        <div className="flex items-center justify-between h-full">
          {/* left logo */}
          <div className="flex items-center gap-8">
            <Link
              to={"/"}
              className="flex items-center gap-2.5 hover:opacity-80 transition"
            >
              <div className="w-9 h-9 rounded-lg bg-black flex items-center justify-center">
                <BotMessageSquare className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-bold text-white hover:text-gray-300">
                TalkByte
              </h1>
            </Link>
          </div>
          {/* right side */}
          <div>
            {user && (
              <>
                <Link
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition text-gray-400 hover:bg-gray-100"
                  to={"/profile"}
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>
                <button
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition text-red-400 hover:bg-red-100"
                  onClick={handleLogout}
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
