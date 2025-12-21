import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, ChevronLeft, ChevronDown } from "lucide-react";
import { menuConfig } from "../config/menuConfig";

export default function HomeLayout() {
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [openGroups, setOpenGroups] = useState({});

  const toggleGroup = (label) => {
    setOpenGroups((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ===== SIDEBAR ===== */}
      <aside
        className={`bg-gradient-to-b from-sky-200 to-sky-600 transition-all duration-300
        ${open ? "w-fit" : "w-16"}`}
      >
        {/* ===== TOGGLE BUTTON ===== */}
        <div className="flex items-center justify-between p-2 border-b">
          {open && (
            <span className="font-bold text-blue-600 text-lg">ID Card</span>
          )}
          <button
            onClick={() => setOpen(!open)}
            className="btn btn-ghost btn-sm"
          >
            {open ? <ChevronLeft size={16}/> : <Menu size={16}/>}
          </button>
        </div>

        {/* ===== MENU LIST ===== */}
        <ul className="menu px-2 py-4 gap-1 text-sm">
          {menuConfig.map((item) => {
            const Icon = item.icon;

            // ===== MENU WITH SUBMENU =====
            if (item.children) {
              const isGroupActive = item.children.some((c) => isActive(c.path));

              const isGroupOpen = openGroups[item.label] ?? isGroupActive;

              return (
                <li key={item.label}>
                  <button
                    onClick={() => toggleGroup(item.label)}
                    className={`flex items-center gap-3 rounded-lg
                    ${isGroupActive ? "bg-blue-50 text-blue-600" : ""}`}
                  >
                    <Icon size={18} />
                    {open && (
                      <>
                        <span className="flex-1 text-left">{item.label}</span>
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${
                            isGroupOpen ? "rotate-180" : ""
                          }`}
                        />
                      </>
                    )}
                  </button>

                  {/* Submenu */}
                  {open && isGroupOpen && (
                    <ul className="ml-6 mt-1 border-l pl-3">
                      {item.children.map((sub) => (
                        <li key={sub.path}>
                          <Link
                            to={sub.path}
                            className={`rounded-md ${
                              isActive(sub.path) ? "bg-blue-600 text-white" : ""
                            }`}
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            }

            // ===== SINGLE MENU =====
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 rounded-lg ${
                    isActive(item.path) ? "bg-blue-600 text-white" : ""
                  }`}
                >
                  <Icon size={18} />
                  {open && item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
