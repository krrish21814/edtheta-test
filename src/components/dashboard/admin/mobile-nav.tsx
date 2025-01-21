/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { menuItems } from "./admin-nav"; // Assuming menuItems from the desktop nav is imported here

export const MobileMenu = ({ role = "admin" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const items = menuItems[role] || []; // Fetch role-specific menu items

  return (
    <div className='lg:hidden'>
      {/* Mobile Header */}
      <header className='fixed top-0 left-0 right-0 bg-white shadow-sm z-50'>
        <div className='flex items-center justify-between px-4 py-3'>
          <div className='flex items-center gap-3'>
            <button onClick={() => setIsOpen(true)}>
              <Menu className='w-6 h-6' />
            </button>
            <h1 className='font-bold text-gray-800'>Edtheta School</h1>
          </div>
          <button className='relative'>
            <Bell className='w-6 h-6' />
            <span className='absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full'></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 bg-black bg-opacity-50 z-50'
              onClick={() => setIsOpen(false)}
            />
            {/* Slide-in Menu */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween" }}
              className='fixed top-0 left-0 bottom-0 w-64 bg-white z-50'>
              <div className='flex items-center justify-between p-4 border-b'>
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 bg-emerald-100 rounded-full' />
                  <h2 className='font-bold text-gray-800 capitalize'>
                    {role} Panel
                  </h2>
                </div>
                <button onClick={() => setIsOpen(false)}>
                  <X className='w-6 h-6' />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className='p-4'>
                {items.map((item: any) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                      pathname === item.href
                        ? "bg-emerald-50 text-emerald-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}>
                    <item.icon className='w-5 h-5' />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
