"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Menu } from "lucide-react"

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

interface NavItem {
    title: string;
    href?: string;
    description?: string;
    children?: NavItem[];
  }
  
  interface NestedNavbarProps {
    brandName: string;
    navItems: NavItem[];
  }
  
  export default function NestedNavbar({ brandName, navItems }: NestedNavbarProps) {
    const [isOpen, setIsOpen] = React.useState(false)
  
    const renderNavItem = (item: NavItem) => {
      if (item.children) {
        return (
          <NavigationMenuItem key={item.title}>
            <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {item.children.map((child) => (
                  <ListItem key={child.title} href={child.href} title={child.title}>
                    {child.children ? (
                      <ul className="mt-2 space-y-2">
                        {child.children.map((subChild) => (
                          <li key={subChild.title}>
                            <Link href={subChild.href || '#'} className="text-sm hover:underline">
                              {subChild.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : child.description || child.title}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )
      } else {
        return (
          <NavigationMenuItem key={item.title}>
            <Link href={item.href || '#'} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {item.title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        )
      }
    }
  
    return (
      <nav className="bg-background p-4 shadow">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            {brandName}
          </Link>
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
          <NavigationMenu className={cn("hidden md:block", { "block": isOpen })}>
            <NavigationMenuList>
              {navItems.map(renderNavItem)}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>
    )
  }