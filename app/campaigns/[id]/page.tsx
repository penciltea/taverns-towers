import ViewCampaign from "@/components/Campaign/View/ViewCampaign";
import { AppError } from "@/lib/errors/app-error";
import { getCampaignById } from "@/lib/actions/campaign.actions";
import { Typography } from "@mui/material";


export default async function ViewCampaignPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const result = await getCampaignById(id);

    if (result.success) {
        const campaign = result.data;
        return <ViewCampaign campaign={campaign} />;
    } else {
        return (
            <>
                <Typography variant="h5" component="p" gutterBottom>Campaign Not Found</Typography>
                <Typography>{ result.message }</Typography>
            </>
        );
    }
  } catch (err: unknown) {
    // Catch unexpected errors
    const message =
      err instanceof AppError
        ? err.userMessage
        : "Something went wrong loading this campaign.";

    return (
        <>
            <Typography variant="h5" component="p" gutterBottom>Campaign Not Found</Typography>
            <Typography>{ message }</Typography>
        </>
    );
  }
}
