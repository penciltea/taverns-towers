'use server';

import { requireUser } from "@/lib/auth/authHelpers";

export async function getPatreonMembership() {
  const user = await requireUser();

  if (!user.patreon?.accessToken) return null;

  const res = await fetch('https://www.patreon.com/api/oauth2/v2/identity?include=memberships', {
    headers: {
      Authorization: `Bearer ${user.patreon.accessToken}`,
    },
  });

  if (!res.ok) {
    console.error('Failed to fetch Patreon membership:', res.statusText);
    return null;
  }

  const data = await res.json();

  // The memberships are usually in included array
  const membership = data.included?.[0]?.attributes;

  if (!membership) return null;

  return {
    tier: membership.patron_status,      // e.g., active_patron
    pledgeAmount: membership.currently_entitled_amount_cents / 100,
    nextPaymentDate: membership.next_billing_date,
  };
}
