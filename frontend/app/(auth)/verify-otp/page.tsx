
// 'use client';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { useState, useEffect, useRef } from 'react';

// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { 
//   ArrowRight, 
//   CheckCircle, 
//   AlertCircle, 
//   Loader2, 
//   RefreshCw,
//   Mail,
//   Clock,
//   Shield
// } from 'lucide-react';

// export const dynamic = 'force-dynamic';


// export default function VerifyOtpPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const initialEmail = searchParams.get('email') || '';

//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [resendLoading, setResendLoading] = useState(false);
//   const [countdown, setCountdown] = useState(60);
//   const [canResend, setCanResend] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);

//   const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

//   useEffect(() => {
//     if (!initialEmail) {
//       setMessage('No email provided. Please go back to login.');
//     }
//   }, [initialEmail]);

//   useEffect(() => {
//     let timer: ReturnType<typeof setInterval> | undefined;
//     if (countdown > 0 && !canResend) {
//       timer = setInterval(() => {
//         setCountdown((prev) => prev - 1);
//       }, 1000);
//     } else if (countdown === 0) {
//       setCanResend(true);
//     }
//     return () => {
//       if (timer) clearInterval(timer);
//     };
//   }, [countdown, canResend]);

//   const handleOtpChange = (index: number, value: string) => {
//     if (value.length > 1) return;
    
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     // Auto-focus next input
//     if (value && index < 5) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
//     if (e.key === 'Backspace' && !otp[index] && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   const handlePaste = (e: React.ClipboardEvent) => {
//     e.preventDefault();
//     const pastedData = e.clipboardData.getData('text').slice(0, 6);
//     const newOtp = [...otp];
    
//     for (let i = 0; i < pastedData.length; i++) {
//       if (i < 6) {
//         newOtp[i] = pastedData[i];
//       }
//     }
//     setOtp(newOtp);
//   };

//   const handleVerify = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const otpString = otp.join('');
    
//     if (otpString.length !== 6) {
//       setMessage('Please enter all 6 digits');
//       return;
//     }

//     setLoading(true);
//     setMessage('');
//     setIsSuccess(false);

//     try {
//       const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email: initialEmail, otp: otpString }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setIsSuccess(true);
//         setMessage('Verification successful! Redirecting...');
//         setTimeout(() => {
//           router.push('/dashboard/overview');
//         }, 1500);
//       } else {
//         setMessage(data.message || 'OTP verification failed.');
//         setOtp(['', '', '', '', '', '']);
//         inputRefs.current[0]?.focus();
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setMessage('Network error. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOtp = async () => {
//     setResendLoading(true);
//     setMessage('');
//     setCanResend(false);
//     setCountdown(60);

//     try {
//       const response = await fetch('http://localhost:5000/api/auth/resend-otp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email: initialEmail }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage('New OTP sent to your email.');
//         setOtp(['', '', '', '', '', '']);
//         inputRefs.current[0]?.focus();
//       } else {
//         setMessage(data.message || 'Failed to resend OTP.');
//         setCanResend(true);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setMessage('Network error during resend.');
//       setCanResend(true);
//     } finally {
//       setResendLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         {/* Header */}
//         <div className="text-center">
//           <div className="mx-auto w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
//             <Mail className="h-8 w-8 text-white" />
//           </div>
//           <h2 className="text-3xl font-bold tracking-tight text-gray-900">
//             Check your email
//           </h2>
//           <p className="mt-2 text-sm text-gray-600">
//             We&apos;ve sent a 6-digit code to{' '}
//             <span className="font-semibold text-indigo-600">{initialEmail}</span>
//           </p>
//         </div>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
//           <CardHeader className="text-center pb-4">
//             <CardTitle className="text-xl">Enter verification code</CardTitle>
//             <CardDescription>
//               Enter the 6-digit code we sent to your email
//             </CardDescription>
//           </CardHeader>

//           <CardContent className="space-y-6">
//             <form onSubmit={handleVerify} className="space-y-6">
//               {/* OTP Input */}
//               <div className="flex justify-center space-x-3">
//                 {otp.map((digit, index) => (
//                   <input
//                     key={index}
//                    ref={(el) => { inputRefs.current[index] = el; }}

//                     type="text"
//                     inputMode="numeric"
//                     pattern="[0-9]"
//                     maxLength={1}
//                     value={digit}
//                     onChange={(e) => handleOtpChange(index, e.target.value)}
//                     onKeyDown={(e) => handleKeyDown(index, e)}
//                     onPaste={handlePaste}
//                     className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
//                     disabled={loading || isSuccess}
//                   />
//                 ))}
//               </div>

//               <Button
//                 type="submit"
//                 className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
//                 disabled={loading || isSuccess || otp.join('').length !== 6}
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Verifying...
//                   </>
//                 ) : isSuccess ? (
//                   <>
//                     <CheckCircle className="mr-2 h-4 w-4" />
//                     Verified!
//                   </>
//                 ) : (
//                   <>
//                     Verify Code
//                     <ArrowRight className="ml-2 h-4 w-4" />
//                   </>
//                 )}
//               </Button>
//             </form>

//             {message && (
//               <Alert className={isSuccess ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
//                 {isSuccess ? (
//                   <CheckCircle className="h-4 w-4 text-green-600" />
//                 ) : (
//                   <AlertCircle className="h-4 w-4 text-red-600" />
//                 )}
//                 <AlertDescription className={isSuccess ? "text-green-800" : "text-red-800"}>
//                   {message}
//                 </AlertDescription>
//               </Alert>
//             )}

//             {/* Resend Section */}
//             <div className="text-center space-y-4">
//               <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
//                 <Clock className="h-4 w-4" />
//                 <span>
//                   {canResend ? "Didnt receive the code?" : `Resend available in ${countdown}s`}
//                 </span>
//               </div>

//               <Button
//                 variant="outline"
//                 onClick={handleResendOtp}
//                 disabled={resendLoading || !canResend}
//                 className="w-full border-indigo-200 text-indigo-600 hover:bg-indigo-50"
//               >
//                 {resendLoading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Sending...
//                   </>
//                 ) : (
//                   <>
//                     <RefreshCw className="mr-2 h-4 w-4" />
//                     Resend Code
//                   </>
//                 )}
//               </Button>
//             </div>

//             {/* Security note */}
//             <div className="flex items-center space-x-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
//               <Shield className="h-4 w-4" />
//               <span>This code expires in 10 minutes for your security</span>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Help text */}
//         <div className="mt-6 text-center">
//           <p className="text-xs text-gray-500">
//             Check your spam folder if you don&apos;t see the email.{' '}
//             <button 
//               onClick={() => router.push('/login')} 
//               className="text-indigo-600 hover:text-indigo-500"
//             >
//               Back to login
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }




'use client';

import { Suspense } from 'react';
import VerifyOtpPage from './VerifyOtpPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpPage />
    </Suspense>
  );
}
