import { useEffect, useState } from 'react';
import api from '../api';
import MyBookCard from '../components/MyBookCard';

function MyBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const res = await api.get('/mybooks');
      setBooks(res.data.books);
    } catch (err) {
      console.error("Failed to fetch books", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/mybooks/${id}/status`, { status });
      alert("Status updated");
      fetchBooks(); // re-fetch to update UI
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const updateRating = async (id, rating) => {
    try {
      await api.patch(`/mybooks/${id}/rating`, { rating });
      alert("Rating updated");
      fetchBooks(); // re-fetch to update UI
    } catch (err) {
      console.error("Failed to update rating", err);
    }
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">My Books</h1>
      {books.length === 0 ? (
        <p>No books found in your list.</p>
      ) : (
        books.map(book => (
          <MyBookCard
            key={book.bookId}
            mybook={book}
            onUpdateStatus={updateStatus}
            onUpdateRating={updateRating}
          />
        ))
      )}
    </div>
  );
}

export default MyBooks;
