import { useNavigate } from 'react-router-dom';

function PhotoCard({ photo }) {
  const navigate = useNavigate();
  return (
    <div
      className="cursor-pointer bg-white shadow rounded-lg overflow-hidden hover:scale-105 transition-transform"
      onClick={() => navigate(`/photos/${photo.id}`, { state: photo })}
      role="button"
      tabIndex={0}
    >
      <img
        src={`https://picsum.photos/id/${photo.id}/400/300`}
        alt={photo.author}
        className="w-full h-56 object-cover"
        loading="lazy"
      />
      <div className="p-3 text-sm text-gray-700 font-medium">
        {photo.author}
      </div>
    </div>
  );
}

export default PhotoCard;
