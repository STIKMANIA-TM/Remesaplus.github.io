import { Create, useForm } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";

export const CanalesCreate = () => {
  const { formProps, saveButtonProps } = useForm({ resource: "canales" });

  return (
    <Create saveButtonProps={saveButtonProps}>
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
      </Box>
    </Create>
  );
};