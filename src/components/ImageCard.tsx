import React from "react";
import { AiTwotoneDislike, AiTwotoneLike } from "react-icons/ai";

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

interface ImageCardProps {
  image: Image;
  price: number;
  onLike: (id: number) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onLike }) => {
  return (
    <div className="border rounded-lg p-4">
      <img
        src={image.main_attachment.big}
        alt={image.title}
        className="w-full"
      />
      <div className="mt-2">
        <h5>{image.title}</h5>
        <p>Price: ${image.price ? image.price.toFixed(2) : ""}</p>
        <p>{image.author}</p>
        <button onClick={() => onLike(image.id)} className="flex items-center">
          {image.liked ? (
            <AiTwotoneLike className="text-blue-500 mr-2" />
          ) : (
            <AiTwotoneDislike className="text-red-500 mr-2" />
          )}
          ({image.likes_count})
        </button>
      </div>
    </div>
  );
};

export default ImageCard;
