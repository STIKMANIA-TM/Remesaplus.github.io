import { List, useTable, EditButton, CreateButton } from "@refinedev/mui";
import { Box, Stack, Chip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const RemesasList = () => {
  const { tableProps } = useTable({ resource: "remesas" });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      { field: "id", headerName: "ID", minWidth: 200 },
      { field: "codigo_rastreo", headerName: "Código Rastreo", minWidth: 150 },
      { field: "canal_id", headerName: "Canal ID", minWidth: 150 },
      { field: "monto_origen", headerName: "Monto Origen (USD)", type: "number", minWidth: 150 },
      { field: "monto_destino", headerName: "Monto Destino (CUP)", type: "number", minWidth: 150 },
      { 
        field: "estado", 
        headerName: "Estado", 
        minWidth: 120,
        renderCell: function render({ value }) {
          const color = value === "Disponible" ? "success" : value === "En tránsito" ? "warning" : "default";
          return <Chip label={value} color={color} />;
        },
      },
      {
        field: "actions",
        headerName: "Acciones",
        minWidth: 100,
        renderCell: function render({ row }) {
          return (
            <Stack direction="row" spacing={1}>
              <EditButton hideText recordItemId={row.id} />
            </Stack>
          );
        },
      },
    ],
    []
  );

  return (
    <List headerButtons={<CreateButton />}>
      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid {...tableProps} columns={columns} autoPageSize />
      </Box>
    </List>
  );
};

import React from "react";