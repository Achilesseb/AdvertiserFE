import { supabase } from "@/supabase";
import { AuthSession } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import "../styles/input.css";

export const NavigationBar = () => {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });
  }, []);

  return (
    <nav className="w-full grid grid-cols-6 items-center bg-primary-50 text-primary-99 py-4 px-10">
      <a href="/" className="p-2 mr-4 inline-flex items-center no-underline">
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 mr-2"
          fill="white"
        >
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
        </svg>
        <span className="text-xl text-white font-bold uppercase tracking-wide">
          Advertiser
        </span>
      </a>

      <div
        className="top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto col-start-3 col-end-7 text-primary-99"
        id="navigation"
      >
        <ul className=" lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto flex w-full h-full m-0 lg:items-center lg:h-auto justify-evenly ">
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
    </nav>
  );
};
