import { useEffect, useState } from 'react';
import api from '../api';
import BookCard from '../components/BookCard'; // Adjust path if needed

function MyBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/mybooks', { withCredentials: true })
      .then(res => {
        setBooks(res.data.books);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching my books:", err);
        setLoading(false);
      });
  }, []);

  const updateStatus = (id, status) => {
    api.patch(`/mybooks/${id}/status`, { status }, { withCredentials: true })
      .then(() => alert("Status updated"));
  };

  const updateRating = (id, rating) => {
    api.patch(`/mybooks/${id}/rating`, { rating }, { withCredentials: true })
      .then(() => alert("Rating updated"));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <p className="ml-4 text-lg">Loading books...</p>
      </div>
    );
  }

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map(b => (
        <BookCard key={b._id} book={b.book}>
          <div>
            <label>Status: </label>
            <select
              value={b.status}
              onChange={(e) => updateStatus(b.bookId, e.target.value)}
              className="border rounded px-2 py-1 ml-2"
            >
              <option>Want to Read</option>
              <option>Currently Reading</option>
              <option>Read</option>
            </select>
          </div>

          <div className="mt-2">
            <label>Rating: </label>
            <input
              type="number"
              min="1"
              max="5"
              defaultValue={b.rating}
              onBlur={(e) => updateRating(b.bookId, e.target.value)}
              className="border rounded px-2 py-1 ml-2 w-16"
            />
          </div>
        </BookCard>
      ))}
    </div>
  );
}

export default MyBooks;
