import { Resend } from "resend";
import VerifyEmail from "@/components/Email/VerifyEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(to: string, verifyUrl: string) {
  await resend.emails.send({
    from: "RealmFoundry <noreply@realmfoundry.app>",
    to,
    subject: "Verify your RealmFoundry Account",
    react: VerifyEmail({ verifyUrl }),
  });
}
