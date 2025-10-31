import { useEffect } from 'react';

export default function useInfiniteScroll(ref, hasMore, loading, onLoadMore) {
  useEffect(() => {
    // Don't create observer while a load is in progress
    if (loading) return;

    const observer = new IntersectionObserver(entries => {
      // entries[0] corresponds to the observed element; when visible and hasMore, load more
      if (entries[0].isIntersecting && hasMore) {
        onLoadMore();
      }
    });

    const el = ref.current;
    if (el) observer.observe(el);

    // Cleanup observer on unmount or dependency change
    return () => observer.disconnect();
  }, [ref, hasMore, loading, onLoadMore]);
}
