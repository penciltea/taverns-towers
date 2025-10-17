import { SiteMenuDialogProps, SiteTypeMap } from "@/interfaces/site.interface";
import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";
import MenuList from "./MenuList";
import { siteTypeHasMenu } from "@/lib/util/siteHelpers";

export default function SiteMenuDialog({ open, onClose, site }: SiteMenuDialogProps){    
    const siteType = site.type as keyof SiteTypeMap;
    const typedSite = site as SiteTypeMap[typeof siteType];

    if (!siteTypeHasMenu(site)) {
        // Optional fallback if someone somehow opens the dialog for a non-menu site
        return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{site.name}</DialogTitle>
            <DialogContent>
                <Typography>This site has no menu.</Typography>
            </DialogContent>
        </Dialog>
        );
    }

    return (
         <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth scroll="paper" aria-labelledby="site-dialog-title">
            <DialogTitle id="site-dialog-title">{site.name} Menu</DialogTitle>
            <DialogContent>
                <MenuList menu={site.menu ?? []} label="Menu" />
            </DialogContent>
        </Dialog>
    )
}