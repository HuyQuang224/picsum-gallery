import { useNavigate } from 'react-router-dom';

function PhotoCard({ photo }) {
  const navigate = useNavigate();

  // The card is keyboard focusable and acts as a button for accessibility
  return (
    <div
      className="cursor-pointer bg-white shadow rounded-lg overflow-hidden hover:scale-105 transition-transform"
      onClick={() => navigate(`/photos/${photo.id}`, { state: photo })}
      role="button"
      tabIndex={0}
    >
      {/* Use a fixed size image URL for consistent grid layout; loading="lazy" defers offscreen images */}
      <img
        src={`https://picsum.photos/id/${photo.id}/400/300`}
        alt={photo.author}
        className="w-full h-56 object-cover"
        loading="lazy"
      />

      {/* Author label */}
      <div className="p-3 text-sm text-gray-700 font-medium">
        {photo.author}
      </div>
    </div>
  );
}

export default PhotoCard;
