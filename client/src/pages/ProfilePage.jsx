import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import ImageCard from "../components/ImageCard";

export default function ProfilePage() {
  const { username } = useParams();
  const [images, setImages] = useState([]);

  useEffect(() => {
    API.get(`/images/user/${username}`)
      .then(res => setImages(res.data))
      .catch(err => console.error(err));
  }, [username]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{username}'s Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map(img => (
          <ImageCard key={img._id} image={img} />
        ))}
      </div>
    </div>
  );
}
