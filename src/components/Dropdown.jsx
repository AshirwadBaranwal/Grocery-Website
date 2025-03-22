import React from "react";
import {
  CircleUserRound,
  Container,
  EllipsisVertical,
  LogOut,
  MapPinHouse,
} from "lucide-react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const Dropdown = () => {
  return (
    <div className="hidden md:block">
      <DropdownMenu className="right-5 ">
        <DropdownMenuTrigger className="bg-green-300 outline-none flex size-8 items-center justify-center rounded-full">
          <EllipsisVertical size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="text-md">My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-md w-[200px] mt-3">
            <CircleUserRound size={10} />
            <Link href="/profile"> My Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-md w-[200px] mt-3">
            <Container />
            <Link href="/orders">My Orders</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-md w-[200px] mt-3">
            <MapPinHouse />
            <Link href="/address">Manage Address</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-md w-[200px] mt-3">
            <LogoutLink className="flex items-center gap-2">
              <LogOut className="text-red-500 size-4" />
              <p className="text-red-500">Logout</p>
            </LogoutLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Dropdown;
