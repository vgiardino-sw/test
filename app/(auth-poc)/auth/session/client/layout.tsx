import SessionWrapper from "@/components/auth/session-wrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionWrapper>{children}</SessionWrapper>;
}
