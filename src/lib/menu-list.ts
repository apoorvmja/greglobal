import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  DollarSign,
  Book,
  MonitorSpeaker
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Contents",
      menus: [
        // {
        //   href: "",
        //   label: "Posts",
        //   active: pathname.includes("/posts"),
        //   icon: SquarePen,
        //   submenus: [
        //     {
        //       href: "/posts",
        //       label: "All Posts",
        //       active: pathname === "/posts"
        //     },
        //     {
        //       href: "/posts/new",
        //       label: "New Post",
        //       active: pathname === "/posts/new"
        //     }
        //   ]
        // },
        {
          href: "/mock-tests",
          label: "Mock tests",
          active: pathname.includes("/mock-tests"),
          icon: Bookmark,
          submenus: []
        },
        {
          href: "https://gre-resources.com/gre-books",
          label: "Resources",
          active: pathname.includes("/gre-resources"),
          icon: Book,
          submenus: []
        },
        {
          href: "/gre-voucher",
          label: "Exam voucher",
          active: pathname.includes("/gre-voucher"),
          icon: Tag,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Additional",
      menus: [
        {
          href: "https://www.toeflgoglobal.com/",
          label: "Toefl site",
          active: pathname.includes("/toeflgoglobal"),
          icon: MonitorSpeaker,
          submenus: []
        },
        {
          href: "/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings,
          submenus: []
        }
      ]
    }
  ];
}
