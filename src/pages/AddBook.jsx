import { useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

const AddBook = () => {
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [chapterImages, setChapterImages] = useState([null]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const addChapterField = () => {
    setChapterImages([...chapterImages, null]);
  };

  const handleChapterImageChange = (e, idx) => {
    const updatedImages = [...chapterImages];
    updatedImages[idx] = e.target.files[0];
    setChapterImages(updatedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coverImage || chapterImages.some((img) => !img)) {
      return setMessage("Please upload all images");
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("description", description);
    formData.append("coverImage", coverImage);
    chapterImages.forEach((img) => formData.append("chapterImages", img));

    try {
      const res = await api.post("/books/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Book uploaded successfully!");
      // Reset form
      setTitle("");
      setAuthor("");
      setDescription("");
      setCoverImage(null);
      setChapterImages([null]);
    } catch (err) {
      setMessage(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center mt-10 text-red-500">
        Please login as admin to add books.
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4 mt-8 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add New Book</h2>

      {message && (
        <div
          className={`p-2 rounded text-white mb-4 ${
            message.includes("success") ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        <textarea
          className="w-full p-2 border rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <div>
          <label className="block font-medium mb-1">Cover Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files[0])}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Chapter Images:</label>
          {chapterImages.map((_, idx) => (
            <input
              key={idx}
              type="file"
              accept="image/*"
              onChange={(e) => handleChapterImageChange(e, idx)}
              className="block mt-2"
              required
            />
          ))}
        </div>

        <button
          type="button"
          className="text-blue-600 mt-2"
          onClick={addChapterField}
        >
          + Add More Chapters
        </button>

        <button
          type="submit"
          disabled={loading}
          className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
