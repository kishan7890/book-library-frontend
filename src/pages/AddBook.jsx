import { useState } from "react";
import axios from "axios";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setdescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [chapterImages, setChapterImages] = useState([null]);

  const addChapterField = () => {
    setChapterImages([...chapterImages, null]);
  };

  const handleChapterImageChange = (e, idx) => {
    const files = [...chapterImages];
    files[idx] = e.target.files[0];
    setChapterImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("description", description);
    formData.append("coverImage", coverImage);
    chapterImages.forEach((img) => img && formData.append("chapterImages", img));

    try {
      const res = await axios.post(
        "https://book-library-backend-0vas.onrender.com/api/books/add",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Book added successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 mt-8 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="w-full p-2 border"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          className="w-full p-2 border"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        <input
          type="text"
          className="w-full p-2 border"
          placeholder="description"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
          required
        />

        <label className="block">Cover Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCoverImage(e.target.files[0])}
          required
        />

        <label className="block">Chapter Images:</label>
        {chapterImages.map((_, idx) => (
          <input
            key={idx}
            type="file"
            accept="image/*"
            onChange={(e) => handleChapterImageChange(e, idx)}
            className="block mt-2"
          />
        ))}

        <button
          type="button"
          className="text-blue-600 mt-2"
          onClick={addChapterField}
        >
          + Add More Chapters
        </button>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBook;
