import { Edit, useForm } from "@refinedev/mui";
import { Box, TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useList } from "@refinedev/core";

export const RemesasEdit = () => {
  const { formProps, saveButtonProps, formLoading } = useForm({ resource: "remesas" });
  const { data: canalesData } = useList({ resource: "canales" });

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Box component="form" {...formProps} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          name="codigo_rastreo"
          label="Código de Rastreo"
          required
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Canal</InputLabel>
          <Select name="canal_id" label="Canal" required>
            {canalesData?.data?.map((canal) => (
              <MenuItem key={canal.id} value={canal.id}>
                {canal.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          name="monto_origen"
          label="Monto Origen (USD)"
          type="number"
          required
          fullWidth
        />
        <TextField
          name="monto_destino"
          label="Monto Destino (CUP)"
          type="number"
          required
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Estado</InputLabel>
          <Select name="estado" label="Estado">
            <MenuItem value="Emitida">Emitida</MenuItem>
            <MenuItem value="En tránsito">En tránsito</MenuItem>
            <MenuItem value="Disponible">Disponible</MenuItem>
            <MenuItem value="Retirada">Retirada</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Edit>
  );
};