'use client'

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
}

export default function FormEditableTable({ name, columns }: FormEditableTableProps) {
    const isMobile = useIsMobile();
    const { control, register } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name,
    });

    return isMobile ? (
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
                    <IconButton onClick={() => remove(index)}><DeleteIcon /></IconButton>
                </Card>
            ))}
            <Box>
                <Button
                    variant="outlined"
                    onClick={() => append(Object.fromEntries(columns.map(c => [c.field, ""])))}
                >
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
                        <Typography variant="body2" component="span">
                            Actions
                        </Typography>
                        </TableCell>
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
                            variant="outlined"
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