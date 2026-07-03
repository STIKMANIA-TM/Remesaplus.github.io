import { List, useTable, EditButton, DeleteButton, CreateButton } from "@refinedev/mui";
import { Box, Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const CanalesList = () => {
  const { tableProps } = useTable({ resource: "canales" });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      { field: "id", headerName: "ID", minWidth: 200 },
      { field: "nombre", headerName: "Nombre", flex: 1, minWidth: 150 },
      { field: "comision_fija", headerName: "Comisión (USD)", type: "number", minWidth: 120 },
      { field: "margen_tasa", headerName: "Margen (%)", type: "number", minWidth: 120 },
      { field: "activo", headerName: "Activo", type: "boolean", minWidth: 100 },
      {
        field: "actions",
        headerName: "Acciones",
        minWidth: 150,
        renderCell: function render({ row }) {
          return (
            <Stack direction="row" spacing={1}>
              <EditButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
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