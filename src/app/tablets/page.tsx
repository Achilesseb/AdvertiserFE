// src/components/DriversPage.js
"use client";
import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const DriversPage = () => {
  const router = useRouter();
  const [rowData, setRowData] = useState([]);
  const authToken = useAuthContext();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/tablets", {
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
      headerName: "Id",
      valueGetter: "node.id",
      headerCheckboxSelection: true,
      showDisabledCheckboxes: true,
      checkboxSelection: (params) => params.data.id,
    },
    { headerName: "Name", field: "driver.Name" },
    { headerName: "Email", field: "driver.Email" },
    { headerName: "Phone", field: "driver.Phone" },
    { headerName: "Address", field: "driver.Address" },
    { headerName: "Car", field: "driver.Car" },
    { headerName: "City", field: "driver.City" },
    { headerName: "Team", field: "driver.Team" },
    {
      headerName: "Currently Playing",
      field: "currentlyPlaying.title",
      cellRenderer: "agGroupCellRenderer",
    },
    { headerName: "Tablet No", field: "tabletNo" },
    {
      headerName: "In Use",
      field: "inUse",
      cellRenderer: "agBooleanCellRenderer",
    },
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
  console.log(rowData);
  return (
    <div className="h-full ag-theme-alpine px-20 py-4">
      <h3 className="text-2xl mb-5">
        Tablets data
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
        onRowClicked={(params) => router.push(`/tablets/${params.data.id}`)}
      />
    </div>
  );
};

export default DriversPage;
