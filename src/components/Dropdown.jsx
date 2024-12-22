import React from "react";
import { EllipsisVertical } from "lucide-react";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import Link from "next/link";

const Dropdown = () => {
  return (
    <div>
      <DropdownMenu className="right-5">
        <DropdownMenuTrigger className="bg-green-300 outline-none flex size-8 items-center justify-center rounded-full">
          <EllipsisVertical size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/orders">Orders</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogoutLink>
              <p className="text-red-500">Logout</p>
            </LogoutLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Dropdown;
