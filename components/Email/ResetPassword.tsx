import * as React from "react";

export default function PasswordResetEmail({ resetUrl }: { resetUrl: string }) {
  return (
    <div
      style={{
        fontFamily: "'Roboto', Arial, sans-serif",
        lineHeight: "1.6",
        backgroundColor: "#f9fafb",
        padding: "20px",
      }}
    >
      <table
        width="100%"
        cellPadding={0}
        cellSpacing={0}
        style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "#ffffff", borderRadius: "8px", overflow: "hidden" }}
      >
        <tbody>
          <tr>
            <td style={{ padding: "20px" }}>
              <h2 style={{ fontWeight: 500, color: "#111827" }}>Reset your password</h2>
              <p style={{ fontSize: "14px", color: "#374151" }}>You requested a password reset for your RealmFoundry account.</p>
              <p style={{ fontSize: "14px", color: "#374151" }}>Click the button below to reset your password. This link will expire in <strong>15 minutes</strong>.</p>
              <p style={{ textAlign: "center", margin: "30px 0" }}>
                <a
                  href={resetUrl}
                  style={{
                    backgroundColor: "#4f46e5",
                    color: "#ffffff",
                    padding: "12px 24px",
                    borderRadius: "6px",
                    textDecoration: "none",
                    fontWeight: 500,
                    display: "inline-block",
                  }}
                >
                  Reset Password
                </a>
              </p>
              <p style={{ fontSize: "12px", color: "#6b7280", wordBreak: "break-all" }}>
                Or copy and paste this URL into your browser: <br />
                <a href={resetUrl}>{resetUrl}</a>
              </p>

              <p style={{ fontSize: "12px", color: "#6b7280" }}>If you didn&apos;t request this, you can safely ignore this email.</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}