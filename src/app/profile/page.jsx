"use client";
import React from "react";
import { useGrocery } from "@/context/GroceryContext";
import MobileTabHead from "@/components/MobileTabHead";
import BottomNav from "@/components/BottomNav";
import {
  User,
  Mail,
  Calendar,
  MapPin,
  ShoppingBag,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import useIsMobile from "@/hooks/use-mobile";
import BackBar from "../../components/BackBar";

const ProfilePage = () => {
  const { user } = useGrocery();
  const isMobile = useIsMobile();
  return (
    <div className="min-h-screen bg-gray-50">
      {!isMobile && <BackBar path="/" />}
      {isMobile && <MobileTabHead TabHead="My Orders" />}

      <div className="pt-20 pb-20 px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-yellow-500" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                {user?.given_name || "User"}
              </h1>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Profile Options */}
        <div className="space-y-4">
          {/* <Link href="/orders" className="block">
            <div className="bg-white rounded-lg shadow-sm p-4 flex items-center space-x-4">
              <ShoppingBag className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">My Orders</span>
            </div>
          </Link>

          <Link href="/address" className="block">
            <div className="bg-white rounded-lg shadow-sm p-4 flex items-center space-x-4">
              <MapPin className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">My Addresses</span>
            </div>
          </Link> */}

          <LogoutLink className="bg-white rounded-lg shadow-sm p-4 flex items-center space-x-4">
            <LogOut className="w-5 h-5 text-red-500" />
            <span className="text-red-500">Logout</span>
          </LogoutLink>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Mail className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">{user?.email}</span>
              </div>
              <div className="flex items-center space-x-4">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">
                  Member since {new Date(user?.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default ProfilePage;
