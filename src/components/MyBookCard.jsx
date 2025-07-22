import React from 'react';

function MyBookCard({ mybook, onUpdateStatus, onUpdateRating }) {
  const { book, status, rating } = mybook;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4 flex">
      <img src={book.coverImage} alt={book.title} className="w-32 h-48 object-cover" />
      <div className="p-4 flex-1">
        <h2 className="text-xl font-semibold">{book.title}</h2>
        <p className="text-gray-600">{book.author}</p>
        <p className="mt-2 text-sm">{book.description}</p>

        <div className="mt-4">
          <label className="block font-medium mb-1">Status:</label>
          <select
            className="border rounded px-2 py-1"
            value={status}
            onChange={(e) => onUpdateStatus(mybook.bookId, e.target.value)}
          >
            <option>Want to Read</option>
            <option>Currently Reading</option>
            <option>Read</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="block font-medium mb-1">Rating:</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (value >= 1 && value <= 5) {
                onUpdateRating(mybook.bookId, value);
              }
            }}
            className="border rounded px-2 py-1 w-16"
          />
        </div>
      </div>
    </div>
  );
}

export default MyBookCard;