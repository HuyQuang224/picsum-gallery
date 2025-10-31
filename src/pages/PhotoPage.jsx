import { useLocation, useParams, Link } from 'react-router-dom';

function PhotoPage() {
  const { id } = useParams();
  const { state: photo } = useLocation();

  // Use the location state if present, otherwise fall back to basic data using the id
  const data = photo || { id, author: 'Unknown', title: 'Untitled' };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/photos" className="text-blue-500 underline">← Quay lại</Link>

      <div className="mt-6">
        {/* Large display image; width/height chosen for good detail */}
        <img
          src={`https://picsum.photos/id/${data.id}/1200/800`}
          alt={data.author}
          className="w-full rounded-lg shadow-md object-cover"
        />
        <div className="mt-4 text-gray-700">
          <h2 className="text-xl font-semibold">{data.title || 'Untitled'}</h2>
          <p className="mt-2">Tác giả: {data.author}</p>
          <p className="mt-1 text-sm text-gray-500">Mô tả: {data.description || 'Không có mô tả.'}</p>
        </div>
      </div>
    </div>
  );
}

export default PhotoPage;
