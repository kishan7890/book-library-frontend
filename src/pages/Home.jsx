// import { useEffect, useState } from 'react';
// import api from '../api';
// import BookCard from '../components/BookCard';

// function Home() {
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     api.get('/books')
//       .then(res => setBooks(res.data.books));
//   }, []);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
//       {books.map(book => <BookCard key={book._id} book={book} />)}
//     </div>
//   );
// }

// export default Home;


import { useEffect, useState } from 'react';
import api from '../api';
import BookCard from '../components/BookCard';

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state

  useEffect(() => {
    api.get('/books')
      .then(res => setBooks(res.data.books))
      .catch(err => console.error(err))
      .finally(() => setLoading(false)); // Hide loader after fetch
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <p className="ml-4 text-lg">Loading books...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {books.map(book => <BookCard key={book._id} book={book} />)}
    </div>
  );
}

export default Home;
