import { useState, useEffect, useRef } from 'react';
import { fetchPhotos } from '../api/picsum';
import PhotoGrid from '../components/PhotoGrid';
import Loader from '../components/Loader';
import ErrorBox from '../components/ErrorBox';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

/*
  PhotosPage.jsx
  - Displays a paginated, infinite-scrolling grid of photos.
  - Uses `fetchPhotos` to load pages and `useInfiniteScroll` to detect when to load more.
  - Error handling shows ErrorBox and a Retry button that reloads the page.
*/
function PhotosPage() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef();

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPhotos(page, 20);
        if (!mounted) return;
        if (data.length === 0) setHasMore(false);
        setPhotos(prev => [...prev, ...data]);
      } catch (err) {
        if (!mounted) return;
        setError('Không thể tải ảnh. Vui lòng thử lại.');
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [page]);

  useInfiniteScroll(loaderRef, hasMore, loading, () => setPage(p => p + 1));

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Picsum Photo Gallery</h1>

      {error && <ErrorBox message={error} onRetry={() => window.location.reload()} />}

      <PhotoGrid photos={photos} />

      {loading && <Loader />}

      {!loading && !hasMore && (
        <p className="text-center text-gray-500 mt-6">Không còn ảnh để hiển thị.</p>
      )}
      <div ref={loaderRef}></div>
    </div>
  );
}

export default PhotosPage;
