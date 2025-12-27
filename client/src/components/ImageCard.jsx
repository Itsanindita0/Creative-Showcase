export default function ImageCard({ image, onDelete }) {
  return (
    <div className="border rounded-lg shadow p-2 relative hover:shadow-lg transition">
      <img
        src={image.imageUrl}
        alt="uploaded"
        className="w-full h-64 object-cover rounded"
        loading="lazy"
      />

  
      {onDelete && (
        <button
          onClick={onDelete}
          className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-sm rounded shadow hover:bg-red-700"
        >
          Delete
        </button>
      )}
    </div>
  );
}
