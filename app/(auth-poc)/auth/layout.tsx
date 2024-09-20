import { Inter } from "next/font/google";
import NestedNavbar from "@/components/auth-poc/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NextAuth Tutorial",
  description: "Learn NextAuth.js by Dave Gray",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { title: "Home Page", href: "/auth" },
    {
      title: "Session Retrieving",
      children: [
        {
          title: "Client Session Retrieving",
          href: "/auth/session/client",
          description: "Retrieve session data on the client-side.",
        },
        {
          title: "Server Session Retrieving",
          href: "/auth/session/server",
          description: "Retrieve session data on the server-side.",
        },
      ],
    },
    {
      title: "Roles",
      children: [
        {
          title: "Middleware Protection",
          description: "Middleware for role-based access control.",
          children: [
            { title: "User", href: "/auth/roles/middleware/user" },
            { title: "Admin", href: "/auth/roles/middleware/admin" },
          ],
        },
        {
          title: "Dynamic View",
          href: "/auth/roles/dynamic-view",
          description: "Dynamic view based on user role.",
        },
      ],
    },
    { title: "Logout", href: "/api/auth/signout" },
  ];
  return (
    <html lang="en">
      <body className={inter.className}>
        <NestedNavbar brandName="TechTitans" navItems={navItems} />
        <main className="flex justify-center items-start p-6 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
