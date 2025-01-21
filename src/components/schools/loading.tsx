export default function Loading() {
  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Search Skeleton */}
      <div className='h-12 bg-gray-200 rounded-lg w-full max-w-2xl mx-auto mb-8 animate-pulse' />

      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        {/* Filters Skeleton */}
        <div className='hidden md:block'>
          <div className='space-y-4 p-4 bg-white rounded-lg shadow'>
            {[1, 2, 3].map((i) => (
              <div key={i} className='space-y-2'>
                <div className='h-4 bg-gray-200 rounded w-1/3 animate-pulse' />
                <div className='h-10 bg-gray-200 rounded animate-pulse' />
              </div>
            ))}
          </div>
        </div>

        {/* Schools Grid Skeleton */}
        <div className='md:col-span-3'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className='bg-white rounded-lg overflow-hidden shadow animate-pulse'>
                <div className='h-48 bg-gray-200' />
                <div className='p-4 space-y-3'>
                  <div className='h-6 bg-gray-200 rounded w-3/4' />
                  <div className='h-4 bg-gray-200 rounded w-1/2' />
                  <div className='h-4 bg-gray-200 rounded w-1/4' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
