"use client";

import { logoutAction } from "@/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site-config";

interface LogoutFormProps {
  isOpen?: boolean;
  className?: string;
}

export default function LogoutForm({ isOpen, className }: LogoutFormProps) {
  return (
    <form action={logoutAction}>
      <Button
        type="submit"
        variant="outline"
        className={cn("w-full justify-center h-10 mt-5", className)}
      >
        <span className={cn(isOpen === false ? "" : "mr-4")}>
          <LogOut size={18} />
        </span>
        <span
          className={cn(
            "whitespace-nowrap",
            isOpen === false ? "opacity-0 hidden" : "opacity-100"
          )}
        >
          {siteConfig.adminPanel.menu.signOut}
        </span>
      </Button>
    </form>
  );
}