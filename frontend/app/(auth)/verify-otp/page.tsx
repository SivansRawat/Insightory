'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get('email') || '';

  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(60); // 60 seconds for resend
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (!initialEmail) {
      setMessage('No email provided. Please go back to login.');
    }
  }, [initialEmail]);

//   useEffect(() => {
//     let timer: NodeJS.Timeout;
//     if (countdown > 0 && !canResend) {
//       timer = setInterval(() => {
//         setCountdown((prev) => prev - 1);
//       }, 1000);
//     } else if (countdown === 0) {
//       setCanResend(true);
//       clearInterval(timer);
//     }
//     return () => clearInterval(timer);
//   }, [countdown, canResend]);

let timer: NodeJS.Timeout | undefined;


useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    if (countdown > 0 && !canResend) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown, canResend]);
  

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message + ' Redirecting to dashboard...');
        // In a real app, you would store the received token (data.token) here
        // e.g., localStorage.setItem('jwtToken', data.token);
        router.push('/dashboard/overview'); // Redirect to dashboard
      } else {
        setMessage(data.message || 'OTP verification failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    setMessage('');
    setCanResend(false); // Disable resend button immediately
    setCountdown(60); // Reset countdown

    try {
      const response = await fetch('http://localhost:5000/api/auth/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message + ' A new OTP has been sent.');
      } else {
        setMessage(data.message || 'Failed to resend OTP.');
        setCanResend(true); // Allow resend if there was an error not related to rate limiting
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Network error during resend. Please try again.');
      setCanResend(true);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="text-center">
      <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
        Verify Your Email
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        An OTP has been sent to <span className="font-semibold">{email || 'your email'}</span>.
      </p>

      <form className="mt-8 space-y-6" onSubmit={handleVerify}>
        <div>
          <Label htmlFor="otp" className="sr-only">OTP Code</Label>
          <Input
            id="otp"
            name="otp"
            type="text"
            required
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm text-center tracking-widest"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
          />
        </div>

        <div>
          <Button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </Button>
        </div>
      </form>
      {message && (
        <p className={`mt-4 text-sm ${message.includes('Error') || message.includes('Failed') ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </p>
      )}

      <div className="mt-4 text-sm">
        <Button
          variant="link"
          onClick={handleResendOtp}
          disabled={resendLoading || !canResend}
          className="text-indigo-600 hover:text-indigo-500"
        >
          {resendLoading ? 'Resending...' : (canResend ? 'Resend OTP' : `Resend in ${countdown}s`)}
        </Button>
      </div>

      <p className="mt-4 text-xs text-gray-500">
        Didn't receive an email? Check your spam folder.
      </p>
    </div>
  );
}