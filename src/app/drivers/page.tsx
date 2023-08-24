// src/components/DriversPage.js
"use client";
import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useAuthContext } from "@/context/AuthContext";

const DriversPage = () => {
  const [rowData, setRowData] = useState([]);
  const authToken = useAuthContext();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users", {
          method: "GET",
          headers: {
            authorization: authToken.user.accessToken,
          },
        });
        const data = await response.json();
        setRowData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const columnDefs = [
    {
      headerName: "Row ID",
      valueGetter: "node.id",
      headerCheckboxSelection: true,
      showDisabledCheckboxes: true,
      checkboxSelection: (params: any) => params.data.id,
    },
    { headerName: "Name", field: "Name" },
    { headerName: "Email", field: "Email" },
    { headerName: "Phone", field: "Phone" },
    { headerName: "Address", field: "Address" },
    { headerName: "Car", field: "Car" },
    { headerName: "City", field: "City" },
    { headerName: "Team", field: "Team" },
  ];
  //   function generateRandomDate(start, end) {
  //     return new Date(
  //       start.getTime() + Math.random() * (end.getTime() - start.getTime())
  //     );
  //   }

  //   // Generate a single entity based on the template
  //   function generateEntity() {
  //     const entity = {
  //       Address: faker.location.streetAddress(),
  //       Car: faker.vehicle.vehicle(),
  //       City: faker.location.city(),
  //       Email: faker.internet.email(),
  //       Name: faker.person.fullName(),
  //       Phone: faker.phone.number(),
  //       Team: "Team 1",
  //       createAt: generateRandomDate(new Date(2023, 7, 1), new Date(2023, 7, 31)),
  //       id: faker.datatype.uuid(),
  //     };

  //     return entity;
  //   }

  //   // Generate 10 entities
  //   function generateEntities(count) {
  //     const entities = [];
  //     for (let i = 0; i < count; i++) {
  //       entities.push(generateEntity());
  //     }
  //     return entities;
  //   }
  //   const addUsers = async () => {
  //     try {
  //       await fetch("http://localhost:3000/api/users", {
  //         method: "POST",

  //         headers: {
  //           authorization: authToken.user.accessToken, // Include the auth token in the headers
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(generateEntities(10)),
  //       });
  //       //   const data = await response.json();
  //       //   setRowData(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   if (!rowData) return;
  //   const generatedEntities = generateEntities(10);
  //   console.log(generatedEntities);
  //   //   addUsers();
  return (
    <div className="h-full ag-theme-alpine px-20 py-4">
      <h3 className="text-2xl mb-5">
        Driver data
        <p className="text-gray-400 text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo,
          laborum.
        </p>
      </h3>
      <AgGridReact
        rowData={rowData as any}
        columnDefs={columnDefs}
        getRowId={(params) => params.data.id}
        defaultColDef={{
          resizable: true,
          width: 200,
        }}
        rowSelection="multiple"
      />
    </div>
  );
};

export default DriversPage;
