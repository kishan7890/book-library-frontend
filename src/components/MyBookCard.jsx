import React from 'react';
import { FaStar } from 'react-icons/fa';
import classNames from 'classnames';

const statusColor = {
  "Want to Read": "bg-yellow-100 text-yellow-800",
  "Currently Reading": "bg-blue-100 text-blue-800",
  "Read": "bg-green-100 text-green-800",
};

function MyBookCard({ mybook, onUpdateStatus, onUpdateRating, onDelete }) {
  const { book, status, rating, bookId } = mybook;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4 flex">
      <img
        src={book.coverImage}
        alt={book.title}
        className="w-32 h-48 object-cover"
      />

      <div className="p-4 flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold">{book.title}</h2>
            <p className="text-gray-600">{book.author}</p>
          </div>
          <button
            onClick={() => onDelete(bookId)}
            className="text-red-500 hover:text-red-700 font-bold text-xl"
            title="Remove from My Books"
          >
            &times;
          </button>
        </div>

        <p className="mt-2 text-sm">{book.description}</p>

        <div className="mt-4 flex items-center space-x-2">
          <span
            className={classNames(
              "px-2 py-1 rounded-full text-sm font-semibold",
              statusColor[status] || "bg-gray-200 text-gray-800"
            )}
          >
            {status}
          </span>

          <select
            value={status}
            onChange={(e) => onUpdateStatus(bookId, e.target.value)}
            className="ml-2 border rounded px-2 py-1"
          >
            <option>Want to Read</option>
            <option>Currently Reading</option>
            <option>Read</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="block font-medium mb-1">Rating:</label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`cursor-pointer text-xl ${
                  star <= rating ? 'text-yellow-500' : 'text-gray-300'
                }`}
                onClick={() => onUpdateRating(bookId, star)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyBookCard;
