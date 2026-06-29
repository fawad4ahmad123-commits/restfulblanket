interface LoaderProps {
  size?: number;
  className?: string;
}

export function Loader({ size = 50, className = '' }: LoaderProps) {
  const borderWidth = size * 0.16;

  return (
    <div
      className={`flex items-center justify-center px-4 py-8 ${className}`}
      style={{ minHeight: '200px' }}
    >
      <div
        className="animate-spin rounded-full"
        style={{
          width: size,
          height: size,
          border: `${borderWidth}px solid #35281E`,
          borderTopColor: 'transparent',
          borderRightColor: 'transparent',
        }}
      />
    </div>
  );
}
