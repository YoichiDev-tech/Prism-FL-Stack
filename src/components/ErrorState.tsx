interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

// Generic error display used whenever a Supabase call fails.
// Optionally shows a retry button if the caller provides a handler.
export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-md border border-gray-200 py-12 text-center">
      <p className="text-sm text-gray-600">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-900 hover:border-gray-500"
        >
          Try again
        </button>
      )}
    </div>
  );
}
