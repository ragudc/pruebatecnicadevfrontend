import  {useEffect, useState}  from 'react';
import axios from 'axios';

interface Image {
    price: number;
    id: number;
    title: string;
    author: string;
    created_at: string;
    main_attachment: {
      big: string;
      small: string;
    };
    likes_count: number;
    liked: boolean;
    links: Array<{
      rel: string;
      uri: string;
      methods: string;
    }>;
  }

const useImageLoader = () => {

  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const loadImages = async (query: string = searchQuery, newSearch = false) => {
    if (newSearch) {
      setPage(1);
      setImages([]);
    }
  
    setLoading(true);
    try {
      const response = await axios.get(`https://backendservertest2.vercel.app/api/images`, {
        params: { page, search: query },
      });
      //console.log('API Response:', response.data); 
      setImages(prev => newSearch ? response.data : [...prev, ...response.data]);
      setHasMore(response.data.length > 0);
      if (newSearch) setSearchQuery(query);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async (id: number) => {
    // Intenta hacer el POST para cambiar el estado de "like"
    try {
      await axios.post(`https://backendservertest2.vercel.app/api/images/${id}/likes`);
      // Actualiza el estado local de las imágenes para reflejar el cambio
      setImages(images => images.map(img => img.id === id ? {
        ...img,
        liked: !img.liked,
        likes_count: img.liked ? img.likes_count - 1 : img.likes_count + 1
      } : img));
    } catch (error) {
      console.error('Error updating like status', error);
    }
  };

  return {
    images,
    loading,
    hasMore,
    loadMore: () => loadImages(),
    resetAndLoadImages: loadImages,
    toggleLike,
  };
};

export default useImageLoader;
