import { useFieldArray, useFormContext } from "react-hook-form";
import { Table, TableHead, TableRow, TableCell, TableBody, TextField, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface FormEditableTableProps {
  name: string;
  columns: {
    label: string;
    field: string;
  }[];
}

export default function FormEditableTable({ name, columns }: FormEditableTableProps) {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableCell key={col.field}>{col.label}</TableCell>
          ))}
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {fields.map((item, index) => (
          <TableRow key={item.id}>
            {columns.map((col) => (
              <TableCell key={col.field}>
                <TextField
                  {...register(`${name}.${index}.${col.field}`)}
                  fullWidth
                  size="small"
                />
              </TableCell>
            ))}
            <TableCell>
              <IconButton onClick={() => remove(index)}><DeleteIcon /></IconButton>
            </TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell colSpan={columns.length + 1}>
            <Button
              onClick={() => append(Object.fromEntries(columns.map(c => [c.field, ""])))}
            >
              Add Item
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
