import ViewCampaign from "@/components/Campaign/View/ViewCampaign";

export default async function ViewCampaignPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { getCampaignById } = await import('@/lib/actions/campaign.actions');
    const campaign = await getCampaignById(id);

    if (!campaign) {
        return <p>Campaign not found!</p>;
    }

    return (
        <ViewCampaign campaign={campaign} />
    );
}