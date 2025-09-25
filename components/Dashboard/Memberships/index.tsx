'use client';

import { UserInterface } from "@/interfaces/user.interface";
import PatreonMembershipPanel from "./PatreonMembershipPanel";
import DefaultMembershipPanel from "./DefaultMembershipPanel";
import { userTier } from "@/constants/user.options";

interface MembershipPanelProps {
  user: UserInterface;
}

export default function MembershipPanel({ user }: MembershipPanelProps) {
  // Future providers can be added here
  if (user.patreon) {
    const tier = user.patreon.tier ?? user.tier ?? userTier[0];
    return <PatreonMembershipPanel tier={tier} patreon={user.patreon} />;
  }

  return <DefaultMembershipPanel user={user} />;
}
