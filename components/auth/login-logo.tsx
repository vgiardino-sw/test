import Image from "next/image";
import logo from "@/public/sw-logo.png";

export default function LoginLogo() {
  return <Image src={logo} alt="Logo" height={500} width={500} priority />;
}
