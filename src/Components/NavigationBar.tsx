import { supabase } from "@/supabase";
import { AuthSession } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import "../styles/input.css";
import { MenuSvg } from "@/constants/svg";

export const NavigationBar = () => {
  const [verticalNavigation, setVerticalNavigation] = useState(false);
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    if (window !== undefined && window.innerWidth > 1200) {
      setVerticalNavigation(false);
    }
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);

  return (
    <nav className="tablet:relative  w-full grid grid-cols-6 items-center bg-primary-50 text-primary-99 py-4 px-10 tablet:h-20 laptop:h-28 laptop:px-20 ">
      {session && session.user.user_metadata?.role === "admin" && (
        <div className="  tablet:visible laptop:hidden desktop:hidden">
          <button
            onClick={() => setVerticalNavigation(!verticalNavigation)}
            className="text-white  focus:outline-none"
          >
            <MenuSvg color="white" />
          </button>
        </div>
      )}

      <a href="/" className="p-2 mr-4 inline-flex items-center no-underline">
        <span className="text-xl text-white font-bold uppercase tracking-wide">
          Advertiser
        </span>
      </a>

      {session && session.user.user_metadata?.role === "admin" ? (
        <div
          className={`top-navbar  laptop:w-auto laptop:col-start-2 laptop:col-end-7 text-primary-99 laptop:visible desktop:visible"   laptop:w-8/12${
            verticalNavigation
              ? "tablet:absolute tablet:top-20 tablet:visible  z-50"
              : " laptop:relative laptop:inline-flex laptop:flex-grow tablet:hidden laptop:h-full"
          }`}
          id="navigation"
        >
          <ul
            className={`h-full w-full flex tablet:justify-center laptop:justify-evenly tablet:p-4 ${
              verticalNavigation
                ? " tablet:flex-col tablet:gap-2 tablet:border-b-2 tablet:border-r-2 tablet:border-l-2 tablet:border-primary-50 tablet:bg-neutral-90 tablet:rounded-xl"
                : " laptop:inline-flex laptop:flex-row laptop:ml-auto laptop:w-auto laptop:h-full laptop:items-center laptop:text-3xl desktop:text-2xl laptop:gap-10"
            }`}
          >
            <li className="tablet:border-2 tablet:border-neutral-40 tablet:min-w-40 tablet:bg-primary-50">
              <a
                href="/"
                className=" flex lg:inline-flex lg:w-auto w-full px-4 py-2 rounded  hover:text-primary-40 text-primary-99 items-center justify-center hover:bg-white no-underline"
              >
                <span className=" ">Dashboard</span>
              </a>
            </li>
            <li className="tablet:border-2 tablet:border-neutral-40 tablet:bg-primary-50">
              <a
                href="/clients"
                className="flex lg:inline-flex lg:w-auto w-full px-4 py-2 rounded   items-center hover:text-primary-40 text-primary-99   justify-center hover:bg-white  no-underline"
              >
                <span className="">Clients</span>
              </a>
            </li>
            <li className="tablet:border-2 tablet:border-neutral-40 tablet:bg-primary-50">
              <a
                href="/drivers"
                className=" flex lg:inline-flex lg:w-auto w-full px-4 py-2 rounded  items-center justify-center hover:text-primary-40 text-primary-99   hover:bg-white  no-underline"
              >
                <span className="">Drivers</span>
              </a>
            </li>
            <li className="tablet:border-2 tablet:border-neutral-40 tablet:bg-primary-50">
              <a
                href="/devices"
                className=" flex lg:inline-flex lg:w-auto w-full px-4 py-2 rounded  items-center hover:text-primary-40 text-primary-99   justify-center hover:bg-white  no-underline"
              >
                <span className="">Devices</span>
              </a>
            </li>
            <li className="tablet:border-2 tablet:border-neutral-40 tablet:bg-primary-50">
              <a
                href="/teams"
                className=" flex  lg:inline-flex lg:w-auto w-full px-4 py-2 rounded  items-center justify-center text-primary-99 hover:bg-white hover:text-primary-40   no-underline"
              >
                <span className=" ">Teams</span>
              </a>
            </li>
            <li className="tablet:border-2 tablet:border-neutral-40 tablet:bg-primary-50">
              <a
                href="/reports"
                className="lg:inline-flex lg:w-auto w-full flex px-4 py-2 rounded   items-center justify-center text-primary-99 hover:bg-white hover:text-primary-40  no-underline"
              >
                <span className="">Reports</span>
              </a>
            </li>
            <li className="tablet:border-2 tablet:border-neutral-40 tablet:bg-primary-50">
              {session ? (
                <a
                  href="/settings"
                  className="flex gap-2 w-full px-3 py-2 rounded  hover:text-primary-40 hover:text-opacity-100  items-center justify-center text-primary-99 hover:bg-white  no-underline"
                >
                  <AiOutlineUser />
                  Settings
                </a>
              ) : null}
            </li>
          </ul>
        </div>
      ) : null}
    </nav>
  );
};
