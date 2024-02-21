import React, {
  ReactElement,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

import {
  AiOutlineBarChart,
  AiOutlineCar,
  AiOutlineSetting,
  AiOutlineTablet,
  AiOutlineTeam,
} from "react-icons/ai";

import { BsPinMap } from "react-icons/bs";
import { TbUserDollar } from "react-icons/tb";
import DefaultButtonComponent from "../DefaultButton";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export const navigationTemplate = (
  router: AppRouterInstance
): NavigationTemplateType => ({
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
    type: "custom",
    label: "Reports",
    path: "/reports",
    icon: <AiOutlineBarChart />,
    submenu: {
      drivers: {
        type: "submenu",
        label: "Drivers Reports",
        onClick: () => router?.push(`/reports?entity=drivers`),
        path: "/reports",
        icon: <AiOutlineBarChart />,
      },
      clients: {
        type: "submenu",
        label: "Clients Reports",
        onClick: () => router?.push(`/reports?entity=clients`),
        path: "/reports",
        icon: <AiOutlineBarChart />,
      },
    },
    customElement: (_setSubmenuStatus, submenuStatus, router) => {
      const onButtonClick = (statisticsPath: string) => {
        router?.push(`/reports?entity=${statisticsPath}`);
      };
      return (
        <>
          {submenuStatus && (
            <div className="absolute flex  flex-col justify-evenly w-full right-0 gap-2 p-2  bg-primary-50 border-spacing-1 border-4 border-r-primary-10">
              <DefaultButtonComponent
                buttonText="Drivers"
                styleType="outlined"
                modifier="w-full px-4 py-2 rounded landscapeMobile:min-w-[170px] hover:bg-white ease-in-out hover:text-primary-40 hover:shadow-lg no-underline flex transition-transform duration-200 justify-center items-center gap-2"
                onButtonClick={() => onButtonClick("drivers")}
              ></DefaultButtonComponent>
              <DefaultButtonComponent
                buttonText="Clients"
                styleType="outlined"
                modifier="w-full px-4 py-2 rounded landscapeMobile:min-w-[170px] hover:bg-white ease-in-out hover:text-primary-40 hover:shadow-lg no-underline flex transition-transform duration-200 justify-center items-center gap-2"
                onButtonClick={() => onButtonClick("clients")}
              ></DefaultButtonComponent>
            </div>
          )}
        </>
      );
    },
  },
  settings: {
    label: "Settings",
    path: "/settings",
    icon: <AiOutlineSetting />,
  },
});

export type NavigationTemplateItemType = {
  label: string;
  icon: ReactElement;
  path?: string;
  type?: "custom" | "submenu";
  submenu?: Record<string, NavigationTemplateItemType>;
  onClick?: () => void;
  customElement?: (
    setSubmenuStatus: Dispatch<SetStateAction<boolean>>,
    submenuStatus: boolean,
    router?: AppRouterInstance
  ) => ReactNode;
};

export type NavigationTemplateType = Record<string, NavigationTemplateItemType>;
