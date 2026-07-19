const NoticePreviewSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      <div className="relative bg-linear-to-r from-primary/5 via-primary/10 to-transparent px-8 py-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="bg-gray-200 w-10 h-10 rounded-xl" />
          <div>
            <div className="bg-gray-200 h-6 w-40 rounded" />
            <div className="bg-gray-200 h-4 w-28 rounded mt-1" />
          </div>
        </div>
        <div className="absolute -bottom-5 right-8 bg-gray-200 h-12 w-36 rounded-xl" />
      </div>

      <div className="p-8 pt-10 space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100"
          >
            <div className="bg-gray-200 w-4 h-4 rounded-full shrink-0" />
            <div className="bg-gray-200 h-4 flex-1 rounded" />
            <div className="bg-gray-200 h-5 w-14 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticePreviewSkeleton;
