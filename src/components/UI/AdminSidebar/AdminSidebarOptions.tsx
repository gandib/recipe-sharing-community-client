import Link from "next/link";
import { usePathname } from "next/navigation";

type TLinkItem = {
  href: string;
  label: string;
};
const AdminSidebarOptions = ({ links }: { links: TLinkItem[] }) => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-1 sticky top-20">
      {links.map((link) => (
        <Link
          key={link?.href}
          href={link?.href}
          className={`block w-full rounded-md px-3 py-2 ${pathname === link.href ? "bg-primary-500" : "hover:bg-primary-500"}`}
        >
          {link?.label}
        </Link>
      ))}
    </div>
  );
};

export default AdminSidebarOptions;
