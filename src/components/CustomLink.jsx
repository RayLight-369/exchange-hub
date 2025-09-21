"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CustomLink = ( {
  href,
  className,
  active,
  children
} ) => {

  const pathName = usePathname();

  return (
    <Link className={ cn( className, pathName == href ? active : "" ) } href={ href }>{ children }</Link>
  );
};

export default CustomLink;