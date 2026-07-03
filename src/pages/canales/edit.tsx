import { Edit, useForm } from "@refinedev/mui";
import { Box, TextField, FormControlLabel, Switch } from "@mui/material";

export const CanalesEdit = () => {
  const { formProps, saveButtonProps, formLoading, queryResult } = useForm({ resource: "canales" });

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Box component="form" {...formProps} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          name="nombre"
          label="Nombre del Canal"
          required
          fullWidth
        />
        <TextField
          name="comision_fija"
          label="Comisión Fija (USD)"
          type="number"
          fullWidth
        />
        <TextField
          name="margen_tasa"
          label="Margen de Tasa (%)"
          type="number"
          fullWidth
        />
        <TextField
          name="logo_url"
          label="URL del Logo"
          fullWidth
        />
        <FormControlLabel
          control={<Switch name="activo" defaultChecked={queryResult?.data?.data.activo} />}
          label="Activo"
        />
      </Box>
    </Edit>
  );
};