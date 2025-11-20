'use server';

import { ActionResult } from "@/interfaces/server-action.interface";
import { requireUser } from "@/lib/auth/authHelpers";
import { safeServerAction } from "./safeServerAction.actions";
import { AppError } from "../errors/app-error";

export async function getPatreonMembership(): Promise<ActionResult<{ tier: string | null; pledgeAmount: number; nextPaymentDate: Date | null }>> {
  return safeServerAction(async () => {
    const user = await requireUser();

    // If the user has no Patreon connection, return a valid empty membership.
    if (!user.patreon?.accessToken) {
      return {
        tier: null,
        pledgeAmount: 0,
        nextPaymentDate: null,
      };
    }

    const res = await fetch('https://www.patreon.com/api/oauth2/v2/identity?include=memberships', {
      headers: {
        Authorization: `Bearer ${user.patreon.accessToken}`,
      },
    });

    if (!res.ok) {
      throw new AppError(`Failed to fetch Patreon membership: ${res.statusText}`, 500);
    }

    const data = await res.json();

    // The memberships are usually in included array
    const membership = data.included?.[0]?.attributes;

    if (!membership){
      throw new AppError("Your Patreon membership could not be found.", 500);
    };

    return {
      tier: membership.patron_status ?? null,
      pledgeAmount: (membership.currently_entitled_amount_cents ?? 0) / 100,
      nextPaymentDate: membership.next_billing_date
        ? new Date(membership.next_billing_date)
        : null,
    };
  });
}
