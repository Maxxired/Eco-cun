const LoadingModal = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[2000]">
    <div className="bg-white shadow-xl rounded-2xl px-6 py-5 w-64 flex flex-col items-center">
      <div className="animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full mb-3"></div>
      <p className="text-sm text-gray-700 font-medium text-center">
        Obteniendo ubicación...
      </p>
    </div>
  </div>
);
export default LoadingModal;