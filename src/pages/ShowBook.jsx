import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

function ShowBook() {
  const { id } = useParams();
//   const { isLoggedIn } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/books/${id}/chapters`)
      .then(res => setBook(res.data))
      .catch(err => console.error("Error:", err))
      .finally(() => setLoading(false));
  }, [id]);

//   if (!isLoggedIn) return <Navigate to="/login" />;

  if (loading) {
    return (
      <div className="p-8 animate-pulse">
        <div className="h-8 w-1/2 bg-gray-300 mb-4"></div>
        <div className="h-64 bg-gray-200 rounded-md"></div>
      </div>
    );
  }

  const images = book.chapters.map((img) => ({
    original: img,
    thumbnail: img,
    originalClass: "object-contain max-h-[80vh]",
  }));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
      <ImageGallery items={images} showPlayButton={false} showFullscreenButton />
    </div>
  );
}

export default ShowBook;
