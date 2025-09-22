'use client';

import { UserInterface } from "@/interfaces/user.interface";
import PatreonMembershipPanel from "./PatreonMembershipPanel";
import DefaultMembershipPanel from "./DefaultMembershipPanel";

interface MembershipPanelProps {
  user: UserInterface;
}

export default function MembershipPanel({ user }: MembershipPanelProps) {
  // Future providers can be added here
  if (user.patreon) {
    return <PatreonMembershipPanel tier={user.tier} patreon={user.patreon} />;
  }

  return <DefaultMembershipPanel user={user} />;
}
