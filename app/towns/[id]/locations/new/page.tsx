'use client'

import { useState, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { Location } from "@/interfaces/location.interface";
import { locationSchema, defaultLocationValues, LocationFormData } from "@/schemas/locationSchema";
import { useUIStore } from "@/store/uiStore";
import { useLocationStore } from "@/store/locationStore";
import { Typography, Button, TextField } from "@mui/material";
import { createLocation, updateLocation, getLocationById } from "@/lib/actions/location.action";
import { FormTextField, FormSelect } from "@/components/Form";
import { LOCATION_SIZE, LOCATION_CONDITION } from "@/constants/locationOptions";
import { locationFormFieldsByType } from "@/components/Location/Form/FieldsByType";

export default function LocationForm(){
    const params = useParams();
    const searchParams = useSearchParams();
    const townId = params.id as string;
    const typeParam = searchParams?.get("type") as LocationFormData["type"];
    const router = useRouter();

    const { showSnackbar } = useUIStore();
    const { setLocation, mode } = useLocationStore();

    const SpecificFieldsComponent = locationFormFieldsByType[typeParam];

    const methods = useFormWithSchema(locationSchema, {
        defaultValues: {
          ...defaultLocationValues[typeParam],
        }
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

        try {
            let savedLocation;
            savedLocation = await createLocation(data, townId);

            showSnackbar(`Location ${mode === 'edit' ? "updated" : "created"} successfully!`, "success");
            router.push(`/towns/${townId}`);
        } catch (err){
            showSnackbar(`Something went wrong: ${err}`, "error");
        }
    }

    const watchedType = watch("type");
    
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h4" gutterBottom>
                    {mode === 'edit' ? "Edit Location" : "Create Location"}
                </Typography>

                <FormTextField
                    name="name"
                    label="Location Name"
                    registration={register("name")}
                    fieldError={errors.name}
                    required
                />

                <FormSelect
                    name="size"
                    label="Size Category"
                    control={control}
                    options={LOCATION_SIZE}
                    fieldError={errors.size}
                />

                {SpecificFieldsComponent ? (
                    <SpecificFieldsComponent />
                ) : (
                    <Typography variant="body2">Unknown location type: {typeParam}</Typography>
                )}

                <Button type="submit" variant="contained" sx={{ mt: 3 }} size="large">
                    {mode === 'edit' ? "Update" : "Create"} Location
                </Button>
                <Button type="button" variant="outlined" sx={{ marginTop: 3, marginLeft: 3 }} size="small" onClick={() => router.back()}>
                    cancel
                </Button>
            </form>
        </FormProvider>
    )
} 