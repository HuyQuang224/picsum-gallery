import PhotoCard from './PhotoCard';

function PhotoGrid({ photos }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {/* Map each photo to a PhotoCard; key uses photo.id which Picsum guarantees */}
      {photos.map(p => <PhotoCard key={p.id} photo={p} />)}
    </div>
  );
}

export default PhotoGrid;
