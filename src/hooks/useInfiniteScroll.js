import { useEffect } from 'react';

export default function useInfiniteScroll(ref, hasMore, loading, onLoadMore) {
  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        onLoadMore();
      }
    });
    const el = ref.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [ref, hasMore, loading, onLoadMore]);
}
