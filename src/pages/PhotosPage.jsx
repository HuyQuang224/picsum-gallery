import { useState, useEffect, useRef } from 'react';
import { fetchPhotos } from '../api/picsum';
import PhotoGrid from '../components/PhotoGrid';
import Loader from '../components/Loader';
import ErrorBox from '../components/ErrorBox';
import useInfiniteScroll from '../hooks/useInfiniteScroll';


function PhotosPage() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef();
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let mounted = true; // Biến cờ để tránh cập nhật state sau khi component unmount

    const load = async () => {
      try {
        setLoading(true);    // Bắt đầu tải
        setError(null);      // Xóa lỗi cũ nếu có

        // Gọi API lấy ảnh theo trang
        const data = await fetchPhotos(page, 20);

        if (!mounted) return; // Nếu component đã bị unmount thì dừng lại

        // Nếu API trả về mảng rỗng thì coi như hết dữ liệu
        if (data.length === 0) setHasMore(false);

        // Cập nhật danh sách ảnh bằng cách nối thêm dữ liệu mới vào mảng cũ
        setPhotos(prev => [...prev, ...data]);
      } catch (err) {
        if (!mounted) return;
        // Nếu lỗi, hiển thị thông báo
        setError('Không thể tải ảnh. Vui lòng thử lại.');
      } finally {
        if (!mounted) return;
        // Kết thúc tải
        setLoading(false);
      }
    };

    load(); // Gọi hàm tải dữ liệu

    // Cleanup function: ngăn cập nhật state sau khi unmount
    return () => { mounted = false; };
  }, [page, retry]); // Mỗi khi `page` hoặc `retry` thay đổi, effect sẽ chạy lại

  // useInfiniteScroll sẽ tự động tăng `page` khi người dùng cuộn gần cuối trang
  // Tắt hành vi infinite-scroll khi đang có lỗi để tránh reload/tải lặp lại
  useInfiniteScroll(loaderRef, hasMore && !error, loading, () => setPage(p => p + 1));

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Picsum Photo Gallery</h1>

      {/* Nếu có lỗi thì hiển thị ErrorBox và cung cấp nút thử lại */}
      {error && (
        <ErrorBox
          message={error}
          onRetry={() => {
            // Retry cục bộ: xoá lỗi và reset về trang 1 để fetch lại từ đầu.
            // Tránh dùng window.location.reload() để không gây flashing khi observer đang kích hoạt.
            setError(null);
            setPhotos([]);
            setPage(1);
            setHasMore(true);
            setRetry(r => r + 1);
          }}
        />
      )}

      {/* Hiển thị danh sách ảnh */}
      <PhotoGrid photos={photos} />

      {/* Hiển thị loader khi đang tải */}
      {loading && <Loader />}

      {/* Nếu không còn ảnh để hiển thị */}
      {!loading && !hasMore && (
        <p className="text-center text-gray-500 mt-6">Không còn ảnh để hiển thị.</p>
      )}

      {/* Phần tử tham chiếu dùng để phát hiện cuộn đến cuối trang */}
      <div ref={loaderRef}></div>
    </div>
  );
}

export default PhotosPage;
