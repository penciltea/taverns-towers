import CircularProgress from "@mui/material/CircularProgress";

export function Spinner() {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1300 // MUI's modal z-index baseline
    }}>
      <CircularProgress color="primary" size={60} thickness={5} />
    </div>
  );
}
