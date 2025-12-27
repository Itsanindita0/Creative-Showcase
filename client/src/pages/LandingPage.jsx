import { useEffect, useState } from "react";
import API from "../api/api";
import ImageCard from "../components/ImageCard";
import Masonry from "react-masonry-css";

export default function LandingPage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    API.get("/images/random")
      .then(res => {
        if (Array.isArray(res.data)) {
          setImages(res.data);
        } else {
          console.error("Unexpected API response:", res.data);
          setImages([]);
        }
      })
      .catch(err => {
        console.error(err);
        setImages([]);
      });
  }, []);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 flex justify-center mt-5">
        Creative Showcase
      </h1>
      <p className="text-xl mt-4 text-center">
        Showcase your creativity effortlessly! Upload your artwork and share it with the world.
      </p>

      {images.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No images yet — be the first to upload!
        </p>
      )}

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex -ml-4 w-auto mt-10"
        columnClassName="pl-4 bg-clip-padding"
      >
        {images.map(img => (
          <ImageCard key={img._id} image={img} />
        ))}
      </Masonry>
    </div>
  );
}
