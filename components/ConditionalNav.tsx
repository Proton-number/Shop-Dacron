"use client";
import Nav from "./Nav";
import { usePathname } from "next/navigation";

export default function ConditionalNav() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return <Nav />;
}
