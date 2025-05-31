export default function Loading() {
  return (
    <div className="h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-2xl bg-gray-50 shadow-sm rounded-lg border border-gray-200 p-4">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Messages Skeleton */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-48 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Input Skeleton */}
        <div className="mt-4 border-t border-gray-200 pt-3">
          <div className="flex gap-2">
            <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-20 h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

  