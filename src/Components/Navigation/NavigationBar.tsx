import { supabase } from "@/supabase";
import { AuthSession } from "@supabase/supabase-js";
import { useState, useEffect, ReactNode } from "react";
import "../../styles/input.css";
import { MenuSvg } from "@/constants/svg";
import { usePathname, useRouter } from "next/navigation";
import {
  NavigationTemplateItemType,
  navigationTemplate,
} from "./navigationTemplate";

export const NavigationBar = () => {
  const router = useRouter();

  const [submenuStatus, setSubmenuStatus] = useState(false);
  const [verticalNavigation, setVerticalNavigation] = useState(false);

  const [session, setSession] = useState<AuthSession | null>(null);
  const [navigationMenuItems, setNavigationMenuItems] = useState(
    Object.entries(navigationTemplate(router))
  );
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

  useEffect(() => {
    if (!submenuStatus || !verticalNavigation) {
      setNavigationMenuItems(Object.entries(navigationTemplate(router)));
      return;
    }
    const indexOfMenu = navigationMenuItems.findIndex(
      ([key, _value]) => key === "reports"
    );

    const newNavigationMenuItems = [
      ...navigationMenuItems.slice(0, indexOfMenu + 1),
      ...Object.entries(
        navigationMenuItems[indexOfMenu][1]
          .submenu as unknown as NavigationTemplateItemType
      ),
      ...navigationMenuItems.slice(indexOfMenu + 1),
    ];

    setNavigationMenuItems(
      newNavigationMenuItems as unknown as Array<
        [string, NavigationTemplateItemType]
      >
    );
  }, [submenuStatus, router]);

  return (
    <nav
      className="w-full flex items-center bg-primary-50 text-primary-99 py-4 px-10 tablet:h-28 laptop:h-28 laptop:px-20 gap-4 z-99"
      onClick={() => setSubmenuStatus(false)}
    >
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
          className={` laptop:w-auto  text-primary-99 laptop:visible desktop:visible" ${
            verticalNavigation
              ? " mobile:h-full tablet:absolute mobile:top-[100px] landscapeMobile:top-[90px] mobile:w-full landscapeMobile:w-[100%] left-0 tablet:visible z-50"
              : " laptop:relative laptop:inline-flex laptop:flex-grow tablet:hidden laptop:h-full"
          }`}
          id="navigation"
        >
          <ul
            className={`h-full w-full flex tablet:justify-start  laptop:justify-evenly tablet:p-4 ${
              verticalNavigation
                ? " mobile:flex-col landscapeMobile:flex-col landscapeMobile:px-20 tablet:gap-2 tablet:border-b-2 tablet:border-r-2 tablet:border-l-2 tablet:border-primary-50 tablet:bg-white "
                : " laptop:inline-flex laptop:flex-row laptop:ml-auto laptop:w-auto laptop:h-full laptop:items-center laptop:text-2xl laptop:gap-4 desktop:text-2xl "
            }`}
          >
            {
              navigationMenuItems.map(([_key, item]) => {
                const DynamicNavTag = item.type === "custom" ? "div" : "a";
                return (
                  <li
                    className={`tablet:border-2 cursor-pointer  tablet:border-neutral-40 tablet:bg-primary-50 ${
                      item.type === "custom" ? "relative" : null
                    } ${
                      item.type === "submenu" ? "w-[70%] self-center" : null
                    }`}
                    key={item.label}
                  >
                    <DynamicNavTag
                      className={`w-full px-4 py-2 rounded landscapeMobile:min-w-[170px] hover:bg-white ease-in-out hover:text-primary-40 hover:shadow-lg no-underline flex transition-transform duration-200 justify-center items-center gap-2 ${
                        pathname.startsWith(item.path ?? "")
                          ? "bg-white text-primary-40"
                          : "text-primary-99"
                      }`}
                      {...(item?.type === "custom"
                        ? {
                            onClick: (e) => {
                              e.stopPropagation();
                              setSubmenuStatus(!submenuStatus);
                              return false;
                            },
                          }
                        : {
                            href: item.path,
                          })}
                    >
                      {item.icon}
                      {!verticalNavigation &&
                        item.type === "custom" &&
                        item.customElement?.(
                          setSubmenuStatus,
                          submenuStatus,
                          router
                        )}
                      <span>{item.label}</span>
                    </DynamicNavTag>
                  </li>
                );
              }) as ReactNode
            }
          </ul>
        </div>
      ) : null}
    </nav>
  );
};
