import { useState, useEffect } from "react";
import API from "../api/api";
import ImageCard from "../components/ImageCard";

export default function Dashboard() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const token = localStorage.getItem("token"); 

  const fetchImages = async () => {
    try {
      const res = await API.get("/images/my", {
        headers: { Authorization: `Bearer ${token}` }
      });

      
      if (Array.isArray(res.data)) {
        setImages(res.data);
      } else {
        console.error("Unexpected response:", res.data);
        setImages([]);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to fetch images");
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Select an image");

    const formData = new FormData();
    formData.append("image", file);

    try {
      await API.post("/images/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      alert("Image uploaded!");
      setFile(null);
      fetchImages();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      await API.delete(`/images/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setImages(prev => prev.filter(img => img._id !== id));
      alert("Image deleted!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete image");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Your Uploads</h1>

      
      <form onSubmit={handleUpload} className="mb-6 border rounded-lg p-3">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-2"
        />
        <button className="bg-pink-600 text-white p-2 rounded-lg hover:bg-pink-400">
          Upload
        </button>
      </form>

      <h1 className="font-semibold text-xl mb-4">Your Uploaded Images</h1>

      
      {images.length === 0 && (
        <p className="text-gray-600 mt-2">You haven't uploaded any images yet.</p>
      )}

    
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <ImageCard
            key={img._id}
            image={img}
            onDelete={() => handleDelete(img._id)}
          />
        ))}
      </div>
    </div>
  );
}
