import { Box, Typography, Button, Chip, Stack } from "@mui/material";
import { Settlement } from "@/interfaces/settlement.interface";
import { useUIStore } from "@/store/uiStore";
import InfoListItem from "@/components/Common/InfoListItem";

export default function SettlementDetails({ settlement }: { settlement: Settlement }) {
  const { setOpenDialog } = useUIStore();


  const fields = [
    { label: "Size", type: "text", value: settlement.size },
    { label: "Tags", type: "chip", value: settlement.tags ?? [] },
    { label: "Terrain", type: "text", value: settlement.terrain ?? [] },
    { label: "Climate", type: "text", value: settlement.climate },
    { label: "Magic Use/Level", type: "text", value: settlement.magic },
    { label: "Wealth", type: "text", value: settlement.wealth },
    { label: "Tone", type: "chip", value: settlement.tone ?? [] }
  ];

  if (!settlement) {
    return <Typography>Loading settlement details...</Typography>;
  }

  return (
    <>
      <Box sx={{marginTop: 1}}>
        <Typography variant="h4" component="h2">Details</Typography>
        
        <Box>
          {fields.map((field) => {
            if (field.type === "chip") {
              return (
                <Box key={field.label} component="dl" sx={{ display: "flex", gap: 1, mb: 1, flexWrap: "wrap" }}>
                  <Typography component="dt" fontWeight="bold" minWidth={200}>
                    {field.label}
                  </Typography>
                  {Array.isArray(field.value) && field.value.length > 0 ? (
                    <Stack direction="row" spacing={1} component="span" useFlexGap sx={{ flexWrap: "wrap", mt: 0.5 }}>
                        { field.value.map((value) => <Chip key={value} label={value} size="small" sx={{ my: 0.25 }} />) }
                    </Stack>            
                  ) : (
                    <Typography>N/A</Typography>
                  )}
                </Box>
              );
            } else {
              // Only allow string | number | undefined here
              const value: string | number | undefined =
                typeof field.value === "string" || typeof field.value === "number"
                  ? field.value
                  : undefined;

              return <InfoListItem key={field.label} label={field.label} value={value ?? "N/A"} />;
            }
          })}
        </Box>
        <Button variant="outlined" color="secondary" onClick={() => setOpenDialog('SettlementDetailsDialog', { settlement: settlement })}>Additional Details</Button>
      </Box>
    </>
  );
}