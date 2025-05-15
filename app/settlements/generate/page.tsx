'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateSettlementSchema, GenerateSettlementInput } from '@/schemas/generateSettlement.schema';
import { Paper, Button, Box, Typography, FormControlLabel, Checkbox } from '@mui/material';
import FormSelect from '@/components/Form/FormSelect';
import FormChipSelect from '@/components/Form/FormChipSelect';
import { useRouter } from 'next/navigation';
import { toSelectOptions } from '@/lib/util/formatSelectOptions';
import { CLIMATE_TYPES, CRIMINAL_ACTIVITY_TYPES, MAGIC_LEVELS, RULING_TYPES, SIZE_TYPES, TAG_TYPES, TERRAIN_TYPES, WEALTH_LEVELS } from '@/constants/settlementOptions';
import { generateSettlementWithName } from '@/lib/modules/settlementRules';
import { createSettlement } from '@/lib/actions/settlement.actions';
import { useSaveSettlementMutation } from "@/hooks/useSaveSettlementMutation";
import { useUIStore } from '@/store/uiStore';


export default function GenerateSettlementPage() {
  const router = useRouter();
  const { isSubmitting, showErrorDialog } = useUIStore();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<GenerateSettlementInput>({
    resolver: zodResolver(generateSettlementSchema),
    defaultValues: {
      size: "random",
      terrain: ["random"],
      tags: ["random"],
      climate: "random",
      magic: "random",
      rulingStyle: "random",
      wealth: "random",
      crime: ["random"],
      createSights: true
    },
  });

  const handleClearAll = () => {
    reset({
      size: "",
      terrain: [],
      tags: [],
      climate: "",
      magic: "",
      rulingStyle: "",
      wealth: "",
      crime: [],
      createSights: true,
    });
  };

  const { saveSettlement } = useSaveSettlementMutation({ mode: "add" });

  const onSubmit = async (data: GenerateSettlementInput) => {
    try {
        // Generate full settlement object
       const generatedSettlement = await generateSettlementWithName(data);

        // Create the settlement in the DB
        const result = await saveSettlement(generatedSettlement);
        if (result && result.success && result.settlement) {
            router.push(`/settlements/${result.settlement._id}`);
        }
    } catch (error) {
        console.error("Error generating or saving settlement:", error);
        showErrorDialog("There was a problem generating the settlement. Please try again later!");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2, maxWidth: 1400, mx: 'auto' }}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} p={2}>
        <Typography variant="h4" component="h1" gutterBottom> Generate a Settlement </Typography>
        <Typography variant="subtitle1" component="p" gutterBottom>Use the generator to create a starting point for your settlement. You can edit everything afterward!</Typography>
        <Typography variant="subtitle1" component="p" gutterBottom>All fields default to "Random" - select options to customize your settlement!</Typography>


            <FormSelect
                name="size"
                label="Size Category"
                control={control}
                options={[{ label: "Random", value: "random" }, ...toSelectOptions(SIZE_TYPES)]}
                fieldError={errors.size}
                required
            />

            <FormChipSelect
                name="terrain"
                label="Terrain Type"
                control={control}
                options={[{ label: "Random", value: "random" }, ...toSelectOptions(TERRAIN_TYPES)]}
                fieldError={errors.terrain}
                required
            />

            <FormChipSelect
                name="tags"
                label="Tags"
                control={control}
                options={[{ label: "Random", value: "random" }, ...toSelectOptions(TAG_TYPES)]}
                fieldError={errors.tags}
                required
            />

            <FormSelect
                name="climate"
                label="Climate"
                control={control}
                options={[{ label: "Random", value: "random" }, ...toSelectOptions(CLIMATE_TYPES)]}
                fieldError={errors.climate}
                required
            />

            <FormSelect
                name="magic"
                label="Magic Level / Use"
                control={control}
                options={[{ label: "Random", value: "random" }, ...toSelectOptions(MAGIC_LEVELS)]}
                fieldError={errors.magic}
                required
            />

            <FormSelect
                name="wealth"
                label="Wealth"
                control={control}
                options={[{ label: "Random", value: "random" }, ...toSelectOptions(WEALTH_LEVELS)]}
                fieldError={errors.wealth}
                required
            />
            
            <FormSelect
                name="rulingStyle"
                label="Ruling Style"
                control={control}
                options={[{ label: "Random", value: "random" }, ...toSelectOptions(RULING_TYPES)]}
                fieldError={errors.rulingStyle}
                required
            />

            <FormChipSelect
                name="crime"
                label="Criminal Activity"
                control={control}
                options={[{ label: "Random", value: "random" }, ...toSelectOptions(CRIMINAL_ACTIVITY_TYPES)]}
                fieldError={errors.crime}
                required
            />

            <FormControlLabel 
                control={
                    <Checkbox 
                        {...register("createSights")}
                        defaultChecked 
                    />
                } 
                label="Create sights in my settlement too!" 
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                <Button variant="text" color="primary" onClick={handleClearAll}> Clear All </Button>

                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}> {isSubmitting ? "Generating settlement..." : "Generate Settlement"} </Button>
            </Box>
        </Box>
    </Paper>
  );
}
