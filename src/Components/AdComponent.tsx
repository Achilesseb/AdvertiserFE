"use client";

import React, { useState, useEffect } from "react";

import { useParams, useRouter } from "next/navigation";
type Add = {
  uri: string;
};
const AdsComponent = () => {
  const [tabletData, setTabletData] = useState<Add[] | null>(null);

  const { tabletId } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/tablets/${tabletId}`
        );
        const data = await response.json();
        setTabletData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAds();
  }, []);

  if (!tabletData) return;
  return (
    <>
      <button
        type="button"
        onClick={() => router.push("/tablets")}
        className="bg-gray-800 text-white rounded-l-md border-r border-gray-100 py-2 hover:bg-red-700 hover:text-white px-3 mb-2"
      >
        <div className="flex flex-row align-middle">
          <svg
            className="w-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <p className="ml-2">Prev</p>
        </div>
      </button>
      <div className="bg-white rounded z-0 px-20 py-4">
        <h3 className="text-2xl mb-5">
          Tablet data
          <p className="text-gray-400 text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo,
            laborum.
          </p>
        </h3>

        <div className="flex gap-5 p-10 max-w-max border border-gray-300 rounded">
          <div className="text-center"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-5 mt-10">
          <div className="w-full lg:w-1/5">
            <div className="p-2 rounded text-center bg-teal-500 text-white">
              Currently playing
            </div>
            <div className="border border-gray-300 rounded text-center py-8 mt-2">
              <h2 className="text-2xl font-bold pb-2"></h2>
              <h4 className="inline text-gray-500 text-sm">Title</h4>
            </div>
          </div>

          <div className="w-full lg:w-3/5">
            <div className="p-2 rounded text-center bg-teal-500 text-white">
              Driver
            </div>
            <div className="flex gap-5 mt-2">
              <div className="flex-grow border border-gray-300 rounded text-center py-8">
                <h2 className="text-2xl font-bold pb-2"> </h2>
                <h4 className="inline text-gray-500 text-sm">Name</h4>
              </div>
              <div className="flex-grow border border-gray-300 rounded text-center py-8">
                <h2 className="text-2xl font-bold pb-2"></h2>
                <h4 className="inline text-gray-500 text-sm">City</h4>
              </div>
            </div>
            <div className="flex-grow border border-gray-300 rounded text-center py-8 mt-2">
              <h2 className="text-2xl font-bold pb-2"></h2>
              <h4 className="inline text-gray-500 text-sm">Phone</h4>
            </div>
          </div>
          <div className="w-full lg:w-1/5">
            <div className="p-2 rounded text-center bg-teal-500 text-white">
              Tablet
            </div>
            <div className="flex gap-5 mt-2">
              <div className="flex-grow border border-gray-300 rounded text-center py-8">
                <h2 className="text-medium font-bold pb-2"></h2>
                <h4 className="inline text-gray-500 text-sm">Tablet id</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdsComponent;
