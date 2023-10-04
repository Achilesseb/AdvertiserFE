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
    <nav className=" relative w-full grid grid-cols-6 items-center bg-primary-50 text-primary-99 py-4 px-10 ">
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
          className={`top-navbar w-full  lg:w-auto col-start-2 col-end-7 text-primary-99 laptop:visible desktop:visible"   ${
            verticalNavigation
              ? "absolute top-20 left-0 tablet:visible bg-primary-40 "
              : "lg:inline-flex lg:flex-grow tablet:hidden "
          }`}
          id="navigation"
        >
          <ul
            className={`h-full m-0  justify-evenly ${
              verticalNavigation
                ? "flex flex-col "
                : "flex lg:inline-flex lg:flex-row lg:ml-auto lg:w-autow-full lg:items-center lg:h-auto "
            }`}
          >
            <li>
              <a
                href="/"
                className=" flex lg:inline-flex lg:w-auto w-full px-4 py-2 rounded text-xl hover:text-primary-40 text-primary-99    items-center justify-center  hover:bg-white no-underline"
              >
                <span className=" ">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="/clients"
                className="flex lg:inline-flex lg:w-auto w-full px-4 py-2 rounded  text-xl items-center hover:text-primary-40 text-primary-99   justify-center hover:bg-white  no-underline"
              >
                <span className="">Clients</span>
              </a>
            </li>
            <li>
              <a
                href="/drivers"
                className=" flex lg:inline-flex lg:w-auto w-full px-4 py-2 rounded text-xl items-center justify-center hover:text-primary-40 text-primary-99   hover:bg-white  no-underline"
              >
                <span className="">Drivers</span>
              </a>
            </li>
            <li>
              <a
                href="/devices"
                className=" flex lg:inline-flex lg:w-auto w-full px-4 py-2 rounded text-xl items-center hover:text-primary-40 text-primary-99   justify-center hover:bg-white  no-underline"
              >
                <span className="">Devices</span>
              </a>
            </li>
            <li>
              <a
                href="/teams"
                className=" flex  lg:inline-flex lg:w-auto w-full px-4 py-2 rounded text-xl items-center justify-center text-primary-99 hover:bg-white hover:text-primary-40   no-underline"
              >
                <span className=" ">Teams</span>
              </a>
            </li>
            <li>
              <a
                href="/reports"
                className="lg:inline-flex lg:w-auto w-full flex px-4 py-2 rounded  text-xl items-center justify-center text-primary-99 hover:bg-white hover:text-primary-40  no-underline"
              >
                <span className="">Reports</span>
              </a>
            </li>
            <li>
              {session ? (
                <a
                  href="/settings"
                  className="flex gap-2 w-full px-3 py-2 rounded  hover:text-primary-40 hover:text-opacity-100 text-xl items-center justify-center text-primary-99 hover:bg-white  no-underline"
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
