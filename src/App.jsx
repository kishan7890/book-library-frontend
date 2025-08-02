import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MyBooks from './pages/MyBooks';
import ShowBook from './pages/ShowBook';
import AddBook from "./pages/AddBook";
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mybooks" element={<MyBooks />} />
          <Route path="/show-book/:id" element={<ShowBook />} />
          <Route path="/add-book" element={<AddBook />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
