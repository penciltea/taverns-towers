"use client";

import { useState } from "react";
import { useForm, useFormContext, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CasinoIcon from "@mui/icons-material/Casino";
import { Box, Button, Tab, Tabs, TextField, Typography, MenuItem, Select, OutlinedInput, Chip, FormControl, InputLabel } from "@mui/material";
import { townSchema, TownFormData } from "@/schemas/townSchema";
import TownFormTabs from '@/components/forms/town/TownFormTabs';


const tabLabels = ["Basics", "Economics", "Culture", "Geography"];

const sizeOptions = ["Hamlet", "Village", "Town", "City", "Metropolis"];
const terrainOptions = ["Forest", "Desert", "Mountains", "Coast", "Plains", "Swamp"];


export default function TownForm() {
  const methods = useForm<TownFormData>({
    resolver: zodResolver(townSchema),
    defaultValues: {
      name: "",
      size: "",
      population: "",
      leadership: "",
      wealth: "",
      description: "",
      terrain: [],
      map: undefined
    },
  });

  const [tab, setTab] = useState(0);
  const { register, control, watch, handleSubmit, formState: { errors } } = methods;

  const mapFile = watch("map"); // watch the file input
  const previewUrl = mapFile && mapFile[0] ? URL.createObjectURL(mapFile[0]) : null;

  const onSubmit = (data: TownFormData) => {
    console.log("Form submitted:", data);
    // send to API here
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" gutterBottom>Create Town</Typography>

        <TownFormTabs tab={tab} setTab={setTab} />

        <Box hidden={tab !== 0}>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button variant="text" startIcon={<CasinoIcon />}>
              Generate All Fields
            </Button>
          </Box>

          <TextField
            fullWidth
            label="Town Name"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            margin="normal"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Size Category</InputLabel>
            <Controller
              name="size"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Size Category">
                  {sizeOptions.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Terrain</InputLabel>
            <Controller
              name="terrain"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  multiple
                  input={<OutlinedInput label="Terrain" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value: string) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {terrainOptions.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          <Box mt={2}>
            <Typography variant="subtitle1">Upload Town Map</Typography>
            <input
              type="file"
              accept="image/*"
              {...register("map")}
            />
            {typeof errors.map?.message === "string" && (
              <Typography color="error">{errors.map.message}</Typography>
            )}
          </Box>

          {previewUrl && (
            <Box mt={2}>
              <Typography variant="subtitle2">Preview:</Typography>
              <img
                src={previewUrl}
                alt="Town map preview"
                style={{ width: "100%", maxWidth: 400, borderRadius: 8 }}
              />
            </Box>
          )}
        </Box>

        <Box hidden={tab !== 1}>
          <TextField
            fullWidth
            label="Leadership"
            {...register("leadership")}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Wealth Level"
            {...register("wealth")}
            margin="normal"
          />
        </Box>

        <Box hidden={tab !== 2}>
          <TextField
            fullWidth
            label="Town Description"
            {...register("description")}
            multiline
            rows={5}
            margin="normal"
          />
        </Box>

        <Button type="submit" variant="contained" sx={{ mt: 3 }} size="large">
          Save Town
        </Button>
      </form>
    </FormProvider>
  );
}