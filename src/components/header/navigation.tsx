"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { navigation } from "../constant";

const Navigation = () => {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex items-center gap-6 xl:gap-8">
      {navigation.map((item: any) => {
        const isActive = pathname === item.href;
        const hasChildren = item.children?.length > 0;

        if (!hasChildren) {
          return (
            <Link
              key={item.title}
              href={item.href}
              className={`text-sm whitespace-nowrap transition-colors hover:text-white/70 ${
                isActive ? "text-white" : "text-white/90"
              }`}
            >
              {item.title}
            </Link>
          );
        }

        return (
          <div key={item.title} className="group relative">
            <Link
              href={item.href}
              className={`flex items-center gap-1 text-sm whitespace-nowrap transition-colors hover:text-white/70 ${
                isActive ? "text-white" : "text-white/90"
              }`}
            >
              {item.title}
              <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" />
            </Link>

            <div className="absolute left-0 top-full z-[9999] mt-3 min-w-[240px] rounded-xl border border-white/10 bg-[#392A22] p-2 opacity-0 invisible transition-all duration-200 group-hover:visible group-hover:opacity-100">
              {item.children.map((child: any) => (
                <Link
                  key={child.title}
                  href={child.href}
                  className="block whitespace-nowrap rounded-lg px-3 py-2 text-sm text-[#E9DDD4] transition-colors hover:bg-white/10"
                >
                  {child.title}
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Navigation;