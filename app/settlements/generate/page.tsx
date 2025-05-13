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
import { generateSettlementValues } from '@/lib/modules/settlementRules';


export default function GenerateSettlementPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<GenerateSettlementInput>({
    resolver: zodResolver(generateSettlementSchema),
    defaultValues: {
      size: '',
      terrain: [],
      tags: [],
      climate: '',
      magic: '',
      rulingStyle: '',
      wealth: '',
      crime: [],
      createSights: true
    },
  });

  const onSubmit = async (data: GenerateSettlementInput) => {
    console.log(data);
    const processed = generateSettlementValues(data);
    console.log("Processed: ", processed);
    /*
    try {
      // Call server action to generate the settlement here
      const response = await fetch('/api/settlements/generate', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      const result = await response.json();
      router.push(`/settlements/${result._id}`); // or redirect to edit
    } catch (error) {
      console.error('Error generating settlement:', error);
    }
    */
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2, maxWidth: 1400, mx: 'auto' }}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} p={2}>
        <Typography variant="h4" component="h1" gutterBottom> Generate a Settlement </Typography>
        <Typography variant="subtitle1" component="p" gutterBottom>Use the generator to create a starting point for your settlement. You can edit everything afterward!</Typography>


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
            />

            <FormSelect
                name="climate"
                label="Climate"
                control={control}
                options={[{ label: "Random", value: "random" }, ...toSelectOptions(CLIMATE_TYPES)]}
                fieldError={errors.climate}
            />

            <FormSelect
                name="magic"
                label="Magic Level / Use"
                control={control}
                options={[{ label: "Random", value: "random" }, ...toSelectOptions(MAGIC_LEVELS)]}
                fieldError={errors.magic}
            />

            <FormSelect
                name="wealth"
                label="Wealth"
                control={control}
                options={[{ label: "Random", value: "random" }, ...toSelectOptions(WEALTH_LEVELS)]}
                fieldError={errors.wealth}
            />
            
            <FormSelect
                name="rulingStyle"
                label="Ruling Style"
                control={control}
                options={[{ label: "Random", value: "random" }, ...toSelectOptions(RULING_TYPES)]}
                fieldError={errors.rulingStyle}
            />

            <FormChipSelect
                name="crime"
                label="Criminal Activity"
                control={control}
                options={[{ label: "Random", value: "random" }, ...toSelectOptions(CRIMINAL_ACTIVITY_TYPES)]}
                fieldError={errors.crime}
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

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}> Generate Settlement </Button>
        </Box>
    </Paper>
  );
}
