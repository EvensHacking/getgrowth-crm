import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Home, Users, PieChart, Settings as SettingsIcon, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';

const navigation = [
  { name: 'Dashboard', to: '/', icon: Home },
  { name: 'Contacts', to: '/contacts', icon: Users },
  { name: 'Pipeline', to: '/pipeline', icon: PieChart },
  { name: 'Settings', to: '/settings', icon: SettingsIcon },
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className="lg:hidden">
        <div className="fixed inset-0 z-50 bg-gray-900/80 backdrop-blur-sm" 
             style={{ display: sidebarOpen ? 'block' : 'none' }} 
             onClick={() => setSidebarOpen(false)} />
        
        <div className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-white transition-transform duration-300 transform",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex h-16 items-center justify-between px-6 border-b">
            <span className="text-xl font-semibold text-indigo-600">GetGrowth</span>
            <button onClick={() => setSidebarOpen(false)} className="p-2 text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col gap-1 p-4">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg",
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                <item.icon size={20} />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col flex-grow border-r border-gray-200 bg-white">
          <div className="flex h-16 items-center px-6 border-b">
            <span className="text-xl font-semibold text-indigo-600">GetGrowth</span>
          </div>
          <nav className="flex flex-col gap-1 p-4">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg",
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                <item.icon size={20} />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            className="lg:hidden -m-2.5 p-2.5 text-gray-700"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <div className="flex flex-1 gap-4 items-center justify-between">
            <div />
            <div className="flex items-center gap-4">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white">
                <span className="text-sm font-medium">JD</span>
              </div>
            </div>
          </div>
        </div>

        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}