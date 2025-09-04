import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { FaHeart, FaHome, FaSearch } from "react-icons/fa";

const navItems = [
  { to: "/", label: "Homepage", icon: <FaHome size="1.4em" /> },
  { to: "/search", label: "Search", icon: <FaSearch size="1.3em" /> },
  { to: "/favourites", label: "Favourites", icon: <FaHeart size="1.3em" /> },
];

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-4 py-5 bg-red-700 text-white shadow-md sticky top-0 z-50">
      <Logo />
      <ul className="flex items-center gap-6 text-lg">
        {navItems.map(({ to, label, icon }) => (
          <li key={to}>
            <NavLink
              title={label}
              to={to}
              aria-label={label}
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-300"
                  : "hover:text-yellow-300 transition duration-200"
              }
            >
              {icon}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
