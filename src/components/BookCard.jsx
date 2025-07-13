import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api';

function BookCard({ book }) {
  const { user } = useContext(AuthContext);

  const addToMyBooks = () => {
    if (!user) return alert("Login to add books");
    api.post(`/mybooks/${book._id}`)
      .then(() => alert("Book added to My Books"));
  };

  return (
    <div className="border p-4 rounded shadow">
      <img src={book.coverImage} alt={book.title} className="w-full h-40 object-cover" />
      <h2 className="text-lg font-bold mt-2">{book.title}</h2>
      <p className="text-sm text-gray-600">{book.author}</p>
      <button onClick={addToMyBooks} className="mt-2 bg-blue-500 text-white px-2 py-1 rounded">Want to Read</button>
    </div>
  );
}

export default BookCard;