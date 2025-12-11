import { Link, useLocation } from "react-router-dom";

export default function Home() {
  const location = useLocation();

  const tabs = [
    { label: "Institutions", path: "/institutions" },
    { label: "Create Single Card", path: "/generate-id-card" },
    { label: "Bulk Student Upload", path: "/bulk-student-upload" },
    { label: "Show all ID Card", path: "/show-all-id-card" },
    { label: "Show ID Card Back side", path: "/show-id-card-back" },
  ];

  return (
    <div className=" flex justify-center items-center ">
      <div className="tabs tabs-boxed flex flex-wrap gap-2 lg:gap-6 justify-start">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`tab ${
                isActive
                  ? "tab-active bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } transition-colors duration-200`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
