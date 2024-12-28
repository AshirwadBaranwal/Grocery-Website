"use client";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useGrocery } from "@/context/GroceryContext";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SearchBar from "./SearchBar";
import Dropdown from "@/components/Dropdown.jsx";

const Navbar = () => {
  const { cart } = useGrocery();
  const { user, getUser } = useKindeBrowserClient();
  return (
    <>
      <div className="flex items-center w-full fixed top-0  z-50 bg-white justify-between pr-5 md:px-10 py-3 md:py-3 border border-gray-300">
        <div className="flex">
          <Link href="/">
            <Image src="/logo.png" height={70} width={120} alt="logo" />
          </Link>

          {/* <span className=" hidden md:flex items-center mx-5 w-fit gap-2  px-3 rounded-full border cursor-pointer">
            <Search size={20} />
            <input
              className=" outline-none p-1"
              type="text"
              placeholder="Search"
            />
          </span> */}
          <SearchBar className=" hidden md:flex ml-20 " />
        </div>

        <div className="flex items-center gap-5 md:gap-10">
          <Link href="/cart">
            <span className="cursor-pointer relative">
              <ShoppingCart />
              <span className="h-5  w-5 flex justify-center items-center bg-[#e80000] font-bold text-white absolute text-[10px]   rounded-full  -top-2 -right-2">
                {cart?.length}
              </span>
            </span>
          </Link>
          {/* {!user ? (
            <LoginLink>
              <Button>Login</Button>
            </LoginLink>
          ) : (
            <LogoutLink>
              <Button>Logout</Button>
            </LogoutLink>
          )} */}
          <Dropdown />
        </div>
      </div>
    </>
  );
};

export default Navbar;
