"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const body = new URLSearchParams();
    body.append('username', email);
    body.append('password', password);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.access_token);
        setSuccess('Login successful!');
        setError('');
        setTimeout(() => router.push('/upload'), 1000);
      } else {
        setError(data.detail || 'Login failed');
        setSuccess('');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-70 relative overflow-hidden">
      <div className="fixed inset-0 z-0">
  <video
    className="w-full h-full object-cover brightness-50"
    autoPlay
    muted
    loop
    playsInline
  >
    <source src="/images/background.mp4" type="video/mp4" />
  </video>
</div>

        <div className="relative z-10 w-full max-w-lg mx-4 backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl px-12 py-12">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-light text-white mb-3 tracking-wide" style={{ fontFamily: 'var(--font-manrope)' }} >
          Welcome Back
        </h2>
        <p style={{ fontFamily: 'var(--font-nunito)' }} className="text-white/70 text-sm">Sign in to continue to your account</p>
        </div>
          {error && <p className="text-red-400 text-center mb-4">{error}</p>}
          {success && <p className="text-green-400 text-center mb-4">{success}</p>}

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-2">
              <label style={{ fontFamily: 'var(--font-manrope)' }} className="text-white/80 text-sm font-medium">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                style={{ fontFamily: 'var(--font-nunito)' }}
                className="w-full bg-transparent border-0 border-b-2 border-white/20 focus:border-blue-400 text-white placeholder-white/50 py-4 px-0 outline-none transition-all duration-300 text-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label style={{ fontFamily: 'var(--font-manrope)' }} className="text-white/80 text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                style={{ fontFamily: 'var(--font-nunito)' }}
                className="w-full bg-transparent border-0 border-b-2 border-white/20 focus:border-blue-400 text-white placeholder-white/50 py-4 px-0 outline-none transition-all duration-300 text-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>


            <button
              type="submit"
              style={{ fontFamily: 'var(--font-manrope)' }}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl py-4 mt-8 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              Sign In
            </button>
          </form>
            <p style={{ fontFamily: 'var(--font-nunito)' }}className="text-center mt-4 text-sm text-white">
              Don't have an account?{' '}
              <Link
                href="/register"
                className="text-blue-200 hover:underline"
              >
                Create Account
              </Link>
            </p>
          
      </div>
    </div>
    </>
  );
}