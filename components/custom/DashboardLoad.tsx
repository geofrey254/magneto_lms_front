import { FaCertificate } from "react-icons/fa6";

export default function DashboardLoading() {
  return (
    <div className="w-full flex flex-col items-center justify-center h-[60vh]">
      <div className="mb-12">
        <FaCertificate className="text-[#350203] cert" size={50} />
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Loading your dashboard
        </h1>
        <p className="text-gray-600">Please wait while we fetch your data...</p>
      </div>
      <div className="mt-8 space-y-2">
        <div className="w-64 h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="w-full h-full bg-[#f8d6b6] rounded-full animate-pulse"></div>
        </div>
        <div className="w-40 h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="w-full h-full bg-[#f8d6b6]  rounded-full animate-pulse"></div>
        </div>
        <div className="w-52 h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="w-full h-full bg-[#f8d6b6]  rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
