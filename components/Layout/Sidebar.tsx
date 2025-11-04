"use client";

import { useRouter } from "next/navigation";
import { useUIStore } from "@/store/uiStore";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Accordion, AccordionDetails, AccordionSummary, Box, Drawer, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ThemeSwitch from "./ThemeSwitch";
import { APP_VERSION } from "@/version";
import { useAuthStore } from "@/store/authStore";
import { useSetActiveCampaign } from "@/hooks/campaign/useSetActiveCampaign";
import { useCampaignAccess } from "@/hooks/campaign/useCampaignAccess";

export const Sidebar = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const user = useAuthStore(state => state.user);

  const { activeCampaign } = useSetActiveCampaign();

  const { setOpenDialog } = useUIStore();
  const isDrawerOpen = useUIStore((state) => state.isDrawerOpen);
  const closeDrawer = useUIStore((state) => state.closeDrawer);

  const { canAccessCampaigns, isLoggedIn, isPremium } = useCampaignAccess();

  const drawerWidth = 250;
  const navItems = [
    {
      label: "Campaigns",
      visible: canAccessCampaigns,
      children: [
        { 
          label: "View my campaigns",
          path: "/campaigns/all",
          enabled: true,
          visible: true,
        },
        {
          label: "Create campaign",
          path: "/campaigns/new",
          enabled: true,
          visible: isPremium
        }
      ]
    },
    {
      label: "Settlements",
      visible: true,
      children: [
        {
          label: "View my settlements",
          path: "/settlements/all",
          enabled: true,
          visible: isLoggedIn
        },
        {
          label: "View my wilderness",
          path: "/settlements/wilderness",
          enabled: true,
          visible: isLoggedIn
        },
        {
          label: "Create settlement",
          enabled: true,
          path: "/settlements/new",
          visible: true
        }
      ]
    },
    {
      label: "Sites",
      visible: true,
      children: [
        {
          label: "View my sites",
          path: "/sites/all",
          enabled: true,
          visible: isLoggedIn
        },
        {
          label: "Create site",
          enabled: true,
          visible: true,
          onClick: () =>
          setOpenDialog("siteTypeDialog", {
              dialogMode: "global"
          })
        }
      ]
    },
    {
      label: "NPCs",
      visible: true,
      children: [
        {
          label: "View my NPCs",
          path: "/npcs/all",
          enabled: true,
          visible: isLoggedIn
        },
        {
          label: "Create NPC",
          enabled: true,
          path: "/npcs/new",
          visible: true
        }
      ]
    },
    {
      label: "Release Info",
      visible: true,
      children: [
        {
          label: "All Releases",
          path: "/releases/",
          enabled: true,
          visible: true
        },
        {
          label: "Roadmap",
          path: "/roadmap",
          enabled: true,
          visible: true
        }
      ]
    }
  ];

  const handleNavigation = (path?: string, enabled?: boolean, onClick?: () => void) => {
    if (!enabled) return;
    if (onClick) onClick();
    else if (path) router.push(path);
    if (isMobile) closeDrawer(); // automatically close on mobile
  };

  const drawerContent = (
    <Box
      sx={{
        width: drawerWidth,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '60px'
      }}
      role="presentation"
    >
      <Box display="flex" alignItems="center" p={2}>
        <Typography variant="h6">Navigation</Typography>
      </Box>

      { (user?.tier === "Artisan" || user?.tier === "Architect") && activeCampaign && (
        <Box display="flex" alignItems="center" sx={{ py: 1, px: 2}}>
          <Typography variant="body2">Active campaign:<br /> {activeCampaign?.name}</Typography>
        </Box>
      )}

      <List disablePadding>
        {navItems.map((item) => (
          <div key={item.label}>
            {item.visible && (
              <Accordion disableGutters elevation={0} square>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1">{item.label}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ py: 0 }}>
                  {item.children
                  .filter((child) => child.visible)
                  .map((child) => (
                    <ListItemButton
                      key={child.label}
                      onClick={() => handleNavigation(child.path, child.enabled, child.onClick)}
                      disabled={!child.enabled}
                    >
                      <ListItemText primary={child.label} />
                    </ListItemButton>
                  ))}
                </AccordionDetails>
              </Accordion>
            )}
          </div>
        ))}
      </List>

      <Box sx={{ mt: "auto", p: 2 }}>
        <ThemeSwitch />
      </Box>
      <Box sx={{ px: 2, paddingBottom: 0.5 }}>
        <Typography variant="caption">Version: {APP_VERSION}</Typography>
      </Box>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: drawerWidth, flexShrink: 0 }}>
      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        open={isDrawerOpen}
        onClose={closeDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            overflowX: "hidden",
          }
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};