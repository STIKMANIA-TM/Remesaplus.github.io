import { List, useTable } from "@refinedev/mui";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const TasasList = () => {
  const { tableProps } = useTable({
    resource: "tasas_historico",
    sorters: { initial: [{ field: "fecha_hora", order: "desc" }] },
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      { field: "id", headerName: "ID", minWidth: 200 },
      { field: "canal_id", headerName: "Canal ID", minWidth: 200 },
      { field: "tasa_oficial", headerName: "Tasa Oficial", type: "number", minWidth: 120 },
      { field: "tasa_informal", headerName: "Tasa Informal", type: "number", minWidth: 120 },
      { 
        field: "fecha_hora", 
        headerName: "Fecha/Hora", 
        minWidth: 180,
        valueGetter: (params) => new Date(params.value).toLocaleString("es-CU"),
      },
    ],
    []
  );

  return (
    <List>
      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid {...tableProps} columns={columns} autoPageSize />
      </Box>
    </List>
  );
};

import React from "react";