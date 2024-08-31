import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import ImageCard from "./components/ImageCard";
import useImageLoader from "./hooks/useImageLoader";
import axios from "axios";

interface Image {
  id: number;
  title: string;
  author: string;
  main_attachment: {
    big: string;
    small: string;
  };
  likes_count: number;
  liked: boolean;
  price: number;
}

const App: React.FC = () => {
  const [imagess, setImagess] = useState<Image[]>([]);
  const { images, toggleLike, resetAndLoadImages } = useImageLoader();

  const handleSearch = (query: string) => {
    resetAndLoadImages(query);
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "https://backendservertest2.vercel.app/api/images"
        );
        setImagess(
          response.data.map((img: any) => ({
            ...img,
            price: img.price || 0,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch images", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <Header onSearch={handleSearch} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {images.map((image) => (
          <ImageCard
            key={image.id}
            image={{ ...image, price: image.price || 0 }}
            onLike={toggleLike}
            price={0}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
