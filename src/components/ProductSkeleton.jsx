export default function ProductSkeleton() {
  return (
    <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-200 shadow-sm animate-pulse">
      <div className="space-y-3 w-1/2">
        <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded-full w-1/3"></div>
        <div className="h-3 bg-gray-200 rounded-full w-1/4"></div>
      </div>
      <div className="flex gap-2">
        <div className="h-9 w-16 bg-gray-200 rounded-xl"></div>
        <div className="h-9 w-16 bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  );
}