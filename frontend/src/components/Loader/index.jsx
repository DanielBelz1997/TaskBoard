import "./loader.css";

export function Loader() {
  return (
    <div
      style={{
        width: "100%",
        height: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <div className="loader" />
    </div>
  );
}
