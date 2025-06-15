
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Calendar, User } from "lucide-react";

const tabs = [
  { label: "홈", path: "/", icon: <Home size={20} /> },
  { label: "예약현황", path: "/status", icon: <Calendar size={20} /> },
  { label: "마이", path: "/my", icon: <User size={20} /> },
];

export default function TabsBar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    // desktop style: top horizontal nav, sticky
    <nav className="w-full bg-white border-b flex justify-center sticky top-0 z-30 shadow-sm">
      <div className="w-full max-w-5xl flex items-center justify-start px-8 h-16">
        {tabs.map((tab) => {
          const active = location.pathname === tab.path;
          return (
            <button
              key={tab.label}
              onClick={() => navigate(tab.path)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md mr-2 font-medium text-base transition 
                ${active ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100 text-gray-500"}
              `}
              aria-current={active ? "page" : undefined}
            >
              {React.cloneElement(tab.icon, {
                className: `transition ${active ? "stroke-blue-700" : "stroke-gray-400"}`,
              })}
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
