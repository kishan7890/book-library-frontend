import { useEffect, useState } from 'react';
import api from '../api';

function MyBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/mybooks')
      .then(res => {
        setBooks(res.data.books);
        setLoading(false); // ✅ Done loading
      })
      .catch(err => {
        console.error(err);
        setLoading(false); // ✅ Still stop loading even if error
      });
  }, []);

  const updateStatus = (id, status) => {
    api.patch(`/mybooks/${id}/status`, { status })
      .then(() => alert("Status updated"));
  };

  const updateRating = (id, rating) => {
    api.patch(`/mybooks/${id}/rating`, { rating })
      .then(() => alert("Rating updated"));
  };

  if(loading){
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <p className="ml-4 text-lg">Loading books...</p>
      </div>
    );
  }


  return (
    <div className="p-4">
      {books.map(b => (
        <div key={b._id} className="border p-4 rounded mb-4">
          <p>Status: {b.status}</p>
          <select onChange={(e) => updateStatus(b.bookId, e.target.value)} defaultValue={b.status}>
            <option>Want to Read</option>
            <option>Currently Reading</option>
            <option>Read</option>
          </select>
          <p>Rating: {b.rating}</p>
          <input type="number" min="1" max="5" onChange={(e) => updateRating(b.bookId, e.target.value)} />
        </div>
      ))}
    </div>
  );
}

export default MyBooks;