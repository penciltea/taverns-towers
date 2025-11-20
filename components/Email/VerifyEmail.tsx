import * as React from "react";

export default function VerifyEmail({ verifyUrl }: { verifyUrl: string }) {
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
              <h2 style={{ fontWeight: 500, color: "#111827" }}>Welcome to RealmFoundry</h2>
              <p style={{ fontSize: "14px", color: "#374151" }}>To begin crafting your worlds, please verify your email by clicking the button below.</p>
              <p style={{ textAlign: "center", margin: "30px 0" }}>
                <a
                  href={verifyUrl}
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
                  Verify Account
                </a>
              </p>
              <p style={{ fontSize: "12px", color: "#6b7280", wordBreak: "break-all" }}>
                Or copy and paste this URL into your browser: <br />
                <a href={verifyUrl}>{verifyUrl}</a>
              </p>

              <p style={{ fontSize: "12px", color: "#6b7280" }}>If you didn&apos;t sign up with RealmFoundry, you can safely ignore this email.</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}