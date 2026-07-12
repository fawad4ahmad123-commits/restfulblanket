export function OrderLoadingState() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF3EC]">
      <p className="text-sm text-[#8A7F73]">Loading your order...</p>
    </div>
  );
}

export function OrderNotFoundState() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF3EC]">
      <div className="text-center">
        <p className="font-serif text-lg text-[#2B2118]">Order not found</p>
        <p className="mt-2 text-sm text-[#8A7F73]">
          We couldn&apos;t find an order matching this link. Double check the
          link or contact support.
        </p>
      </div>
    </div>
  );
}
