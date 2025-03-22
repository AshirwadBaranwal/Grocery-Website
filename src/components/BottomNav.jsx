import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingCart, User, MapPin, Grid } from "lucide-react";
import { useGrocery } from "@/context/GroceryContext";

const BottomNav = () => {
  const { cart } = useGrocery();
  const pathname = usePathname();

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/categories", icon: Grid, label: "Categories" },
    { href: "/orders", icon: ShoppingCart, label: "Orders" },
    { href: "/address", icon: MapPin, label: "Address" },
    { href: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-5 items-center h-16 relative">
        {/* Animated background indicator */}
        <div
          className="absolute bottom-0 h-1 bg-green-400 transition-all duration-300 ease-in-out rounded-t-lg"
          style={{
            width: "20%",
            left: `${
              navItems.findIndex((item) => item.href === pathname) * 20
            }%`,
          }}
        />

        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center relative transition-all duration-300 ${
                isActive ? "text-green-500" : "text-gray-500"
              }`}
            >
              <div
                className={`transform transition-transform duration-300 ${
                  isActive ? "scale-110" : "scale-100"
                }`}
              >
                <item.icon size={24} />
              </div>
              <span
                className={`text-xs mt-1 transition-all duration-300 ${
                  isActive ? "font-medium" : "font-normal"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
