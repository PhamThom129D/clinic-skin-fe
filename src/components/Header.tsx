"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const navItems = ["Trang chủ", "Ưu đãi", "Bác sĩ", "Về chúng tôi", "Liên hệ"];

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <h1 className="text-2xl font-bold text-primary">Thu Cúc</h1>

        {/* Desktop */}
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="text-gray-700 hover:text-primary font-medium"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Mobile */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="block px-4 py-3 border-b text-gray-700 hover:text-primary"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
