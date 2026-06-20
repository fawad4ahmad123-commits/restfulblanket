"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { navigation } from "../constant";

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      className="hidden items-center gap-6 lg:flex xl:gap-8"
    >
      {navigation.map((item: any) => {
        const isActive = pathname === item.href;
        const hasChildren = item.children?.length > 0;

        if (!hasChildren) {
          return (
            <Link
              key={item.title}
              href={item.href}
              aria-label={`Go to ${item.title}`}
              title={item.title}
              className={`whitespace-nowrap text-sm transition-colors hover:text-white/70 ${
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
              aria-label={`${item.title} menu`}
              aria-haspopup="menu"
              title={item.title}
              className={`flex items-center gap-1 whitespace-nowrap text-sm transition-colors hover:text-white/70 ${
                isActive ? "text-white" : "text-white/90"
              }`}
            >
              {item.title}
              <ChevronDown
                aria-hidden="true"
                className="size-3.5 transition-transform group-hover:rotate-180"
              />
            </Link>

            <div
              role="menu"
              aria-label={`${item.title} submenu`}
              className="invisible absolute left-0 top-full z-[9999] mt-3 min-w-[240px] rounded-xl border border-white/10 bg-[#392A22] p-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100"
            >
              {item.children.map((child: any) => (
                <Link
                  key={child.title}
                  href={child.href}
                  role="menuitem"
                  aria-label={`Go to ${child.title}`}
                  title={child.title}
                  className="block whitespace-nowrap rounded-lg px-3 py-2 text-sm text-[#E9DDD4] transition-colors hover:bg-white/10"
                >
                  {child.title}
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </nav>
  );
};

export default Navigation;
