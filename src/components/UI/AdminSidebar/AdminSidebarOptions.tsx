import Link from "next/link";
import { usePathname } from "next/navigation";
import { TLinkItem } from "@/src/types";

const AdminSidebarOptions = ({ links }: { links: TLinkItem[] }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-1 sticky top-20">
      {links.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          className={`w-full rounded-md px-3 py-2 flex gap-2 items-center ${
            pathname === href
              ? "text-secondary-500 hover:bg-primary-500 hover:text-white"
              : "hover:bg-primary-500 hover:text-white"
          }`}
          href={href}
        >
          <Icon className="w-5 h-5" /> {label}
        </Link>
      ))}
    </div>
  );
};

export default AdminSidebarOptions;
