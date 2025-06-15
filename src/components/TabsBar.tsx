
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Calendar, User } from "lucide-react";

const tabs = [
  { label: "홈", path: "/", icon: <Home size={24} /> },
  { label: "예약현황", path: "/status", icon: <Calendar size={24} /> },
  { label: "마이", path: "/my", icon: <User size={24} /> },
];

export default function TabsBar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t flex justify-between items-center px-4 py-1 max-w-md mx-auto w-full shadow-lg h-16">
      {tabs.map((tab) => {
        const active = location.pathname === tab.path;
        return (
          <button
            key={tab.label}
            onClick={() => navigate(tab.path)}
            className={`flex flex-col items-center flex-1 py-2 text-xs font-medium focus:outline-none transition ${
              active ? "text-blue-600" : "text-gray-400"
            }`}
            aria-current={active ? "page" : undefined}
          >
            <span
              className={`mb-0.5 transition ${
                active ? "scale-110" : ""
              }`}
            >
              {React.cloneElement(tab.icon, {
                className: `mx-auto ${active ? "stroke-blue-600" : "stroke-gray-400"}`,
              })}
            </span>
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
