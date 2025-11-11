import { Resend } from "resend";
import PasswordResetEmail from "@/components/Email/ResetPassword";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  await resend.emails.send({
    from: "RealmFoundry <noreply@realmfoundry.app>",
    to,
    subject: "Reset your RealmFoundry password",
    react: PasswordResetEmail({ resetUrl }),
  });
}
