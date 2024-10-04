export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Recipe Sharing Community",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Recipe Feed",
      href: "/recipe-feed",
    },
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "About Us",
      href: "/about",
    },
    {
      label: "Contact Us",
      href: "/contact",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Recipe Feed",
      href: "/recipe-feed",
    },
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "About Us",
      href: "/about",
    },
    {
      label: "Contact Us",
      href: "/contact",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
