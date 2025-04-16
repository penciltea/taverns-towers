'use client'

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Location } from "@/interfaces/location.interface";
import { locationSchema, defaultLocationValues, LocationFormData } from "@/schemas/locationSchema";
import { useUIStore } from "@/store/uiStore";
import { useLocationStore } from "@/store/locationStore";
import { Typography, Button, TextField } from "@mui/material";

export default function LocationForm(){
    const searchParams = useSearchParams();
    const typeParam = searchParams?.get("type") as LocationFormData["type"];
    const router = useRouter();

    const { showSnackbar } = useUIStore();
    const { setLocation, mode } = useLocationStore();

    const methods = useForm<LocationFormData>({
        resolver: zodResolver(locationSchema),
        defaultValues: {
            ...defaultLocationValues[typeParam],
        },
    });

    const { 
        register,
        handleSubmit,
        formState: { errors },
        control,
        watch,
        setValue 
    } = methods;

    const onSubmit = async (data: LocationFormData) => {
        console.log("test")
        console.log(data);
    }

    const watchedType = watch("type");
    
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h4" gutterBottom>
                    {mode === 'edit' ? "Edit Location" : "Create Location"}
                </Typography>

                <TextField
                    fullWidth
                    label="Location Name"
                    {...register("name")}
                    error={!!errors.name}
                    helperText={typeof errors.name?.message === "string" ? errors.name.message : ""}
                    margin="normal"
                />

                <Button type="submit" variant="contained" sx={{ mt: 3 }} size="large">
                    {mode === 'edit' ? "Update" : "Create"} Location
                </Button>
            </form>
        </FormProvider>
    
    )
} 