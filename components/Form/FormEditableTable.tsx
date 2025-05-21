'use client';

import { useIsMobile } from "@/hooks/useIsMobile";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Box, Card, Typography, Table, TableHead, TableRow, TableCell, TableBody, TextField, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface FormEditableTableProps {
  name: string;
  columns: {
    label: string;
    field: string;
  }[];
  header?: string;
  onGenerate?: () => void;
  buttonLabel?: string;
}

export default function FormEditableTable({
  name,
  columns,
  header,
  onGenerate,
  buttonLabel = "Generate",
}: FormEditableTableProps) {
  const isMobile = useIsMobile();
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name });

  const handleAdd = () =>
    append(Object.fromEntries(columns.map((col) => [col.field, ""])));

  return (
    <>
      {(header || onGenerate) && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          {header && <Typography variant="h6">{header}</Typography>}
          {onGenerate && (
            <Button
              type="button"
              variant="outlined"
              onClick={onGenerate}
              size="large"
              sx={{ py: 1.65 }}
            >
              {buttonLabel}
            </Button>
          )}
        </Box>
      )}

      {isMobile ? (
        <>
          {fields.map((item, index) => (
            <Card key={item.id} variant="outlined" sx={{ mb: 2, p: 2 }}>
              {columns.map((col) => (
                <Box key={col.field} mb={1}>
                  <Typography variant="subtitle2">{col.label}</Typography>
                  <TextField
                    {...register(`${name}.${index}.${col.field}`)}
                    fullWidth
                    size="small"
                  />
                </Box>
              ))}
              <IconButton onClick={() => remove(index)}>
                <DeleteIcon />
              </IconButton>
            </Card>
          ))}
          <Box>
            <Button variant="outlined" onClick={handleAdd}>
              Add Item
            </Button>
          </Box>
        </>
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.field}>{col.label}</TableCell>
              ))}
              <TableCell>
                <Typography variant="body2">Actions</Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {fields.map((item, index) => (
              <TableRow key={item.id}>
                {columns.map((col) => (
                  <TableCell key={col.field} sx={{verticalAlign: 'top'}}>
                    <TextField
                      {...register(`${name}.${index}.${col.field}`)}
                      fullWidth
                      size="small"
                      multiline={col.field === "description"}
                      rows={col.field === "description" ? 3 : 1}
                    />
                  </TableCell>
                ))}
                <TableCell sx={{verticalAlign: 'top'}}>
                  <IconButton onClick={() => remove(index)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={columns.length + 1}>
                <Button variant="outlined" onClick={handleAdd}>
                  Add Item
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </>
  );
}