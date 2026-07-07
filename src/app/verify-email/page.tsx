export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF8F6]">
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-[#211711]">Check your email</h1>

        <p className="mt-3 text-[#70655E]">
          We have sent a verification link to your email address. Please verify
          your account before signing in.
        </p>
      </div>
    </div>
  );
}
