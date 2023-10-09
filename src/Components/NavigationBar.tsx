import { supabase } from "@/supabase";
import { AuthSession } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import {
  AiOutlineBarChart,
  AiOutlineCar,
  AiOutlineSetting,
  AiOutlineTablet,
  AiOutlineTeam,
} from "react-icons/ai";
import "../styles/input.css";
import { MenuSvg } from "@/constants/svg";
import { BsPinMap } from "react-icons/bs";
import { TbUserDollar } from "react-icons/tb";
import { usePathname } from "next/navigation";

const navigationTemplate = {
  dashboard: {
    label: "Dashboard",
    path: "/dashboard",
    icon: <BsPinMap />,
  },
  clients: {
    label: "Clients",
    path: "/clients",
    icon: <TbUserDollar />,
  },
  drivers: {
    label: "Drivers",
    path: "/drivers",
    icon: <AiOutlineCar />,
  },
  devices: {
    label: "Devices",
    path: "/devices",
    icon: <AiOutlineTablet />,
  },
  teams: {
    label: "Teams",
    path: "/teams",
    icon: <AiOutlineTeam />,
  },
  reports: {
    label: "Reports",
    path: "/reports",
    icon: <AiOutlineBarChart />,
  },
  settings: {
    label: "Settings",
    path: "/settings",
    icon: <AiOutlineSetting />,
  },
};

export const NavigationBar = () => {
  const [verticalNavigation, setVerticalNavigation] = useState(false);
  const [session, setSession] = useState<AuthSession | null>(null);
  const pathname = usePathname();
  useEffect(() => {
    if (window !== undefined && window.innerWidth > 1600) {
      setVerticalNavigation(false);
    }
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);
  console.log(pathname);
  return (
    <nav className="w-full flex items-center bg-primary-50 text-primary-99 py-4 px-10 tablet:h-28 laptop:h-28 laptop:px-20 gap-4 z-99">
      {session && session.user.user_metadata?.role === "admin" && (
        <div className=" tablet:visible laptop:hidden desktop:hidden ">
          <button
            onClick={() => setVerticalNavigation(!verticalNavigation)}
            className="text-white  focus:outline-none"
          >
            <MenuSvg color="white" />
          </button>
        </div>
      )}

      <a
        href="/"
        className="p-2 inline-flex items-center no-underline gap-1 text-3xl font-roboto"
      >
        <span className=" text-white font-bold uppercase tracking-widest">
          Gorilla
        </span>
        <span className="px-2 text-primary-50 bg-white font-bold uppercase tracking-widest py-1 rounded-md">
          Ads
        </span>
      </a>

      {session && session.user.user_metadata?.role === "admin" ? (
        <div
          className={` top-navbar  laptop:w-auto  text-primary-99 laptop:visible desktop:visible" ${
            verticalNavigation
              ? "tablet:absolute mobile:top-[100px] landscapeMobile:top-[92px] mobile:w-full landscapeMobile:w-[100%] left-0 tablet:visible z-50"
              : " laptop:relative laptop:inline-flex laptop:flex-grow tablet:hidden laptop:h-full"
          }`}
          id="navigation"
        >
          <ul
            className={`h-full w-full flex tablet:justify-center laptop:justify-evenly tablet:p-4 ${
              verticalNavigation
                ? " mobile:flex-col landscapeMobile:flex-row landscapeMobile:flex-wrap landscapeMobile:px-20 tablet:gap-2 tablet:border-b-2 tablet:border-r-2 tablet:border-l-2 tablet:border-primary-50 tablet:bg-white tablet:rounded-xl"
                : " laptop:inline-flex laptop:flex-row laptop:ml-auto laptop:w-auto laptop:h-full laptop:items-center laptop:text-2xl laptop:gap-4 desktop:text-2xl "
            }`}
          >
            {Object.values(navigationTemplate).map((item) => (
              <li
                className="tablet:border-2  tablet:border-neutral-40 tablet:bg-primary-50 "
                key={item.label}
              >
                <a
                  href={item.path}
                  className={`w-full px-4 py-2 rounded landscapeMobile:min-w-[170px] hover:bg-white ease-in-out hover:text-primary-40 hover:shadow-lg no-underline flex transition-transform duration-200 justify-center items-center gap-2 ${
                    pathname.includes(item.path)
                      ? "bg-white text-primary-40"
                      : "text-primary-99"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </nav>
  );
};
