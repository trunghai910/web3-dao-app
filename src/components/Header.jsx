import { Link } from "react-router-dom";
import { MdLightMode } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import { useEffect, useState } from "react";
import { truncate, useGlobalState } from "../store";
import { connectWallet } from "../Blockchain.services";

const Header = () => {
  const [theme, setTheme] = useState(localStorage.theme || "dark");
  const themeColor = theme === "dark" ? "light" : "dark";
  const darken = theme === "dark";
  const [connectedAccount] = useGlobalState("connectedAccount");

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(themeColor);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [themeColor, theme]);

  const toggleLight = () => {
    setTheme(themeColor);
  };

  return (
    <header className="sticky top-0 z-50 dark:text-blue-500">
      <nav className="navbar navbar-expand-lg shadow-md py-2 relative flex items-center w-full justify-between bg-white dark:bg-[#212936]">
        <div className="px-6 w-full flex flex-wrap items-center justify-between">
          <div className="grow flex flex-row justify-between items-center p-2">
            <Link to="/" className="flex flex-row justify-start items-center space-x-3">
              <span className="dark:text-gray-300 font-bold text-xl">PTIT Dominion</span>
            </Link>
            <div className="flex flex-row justify-center items-center space-x-5">
              {darken ? (
                <MdLightMode className="cursor-pointer" size={25} onClick={toggleLight} />
              ) : (
                <FaMoon className="cursor-pointer" size={25} onClick={toggleLight} />
              )}
              {connectedAccount ? (
                <button className="px-4 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 focus:bg-blue-700 focus:outline-none dark:text-blue-500 dark:border dark:border-blue-500 dark:bg-transparent">
                  {truncate(connectedAccount, 4, 4, 11)}
                </button>
              ) : (
                <button
                  className="px-4 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 focus:bg-blue-700 focus:outline-none dark:text-blue-500 dark:border dark:border-blue-500 dark:bg-transparent"
                  onClick={connectWallet}
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
