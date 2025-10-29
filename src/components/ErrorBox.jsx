export default function ErrorBox({ message, onRetry }) {
  return (
    <div className="bg-red-50 text-red-700 p-4 rounded-md text-center my-4">
      <p>{message || 'Đã xảy ra lỗi khi tải dữ liệu.'}</p>
      {onRetry && (
        <button onClick={onRetry} className="mt-2 bg-red-500 text-white px-3 py-1 rounded">
          Thử lại
        </button>
      )}
    </div>
  );
}
