import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CreateBlogPage from './pages/CreateBlogPage';
import NotFoundPage from './pages/NotFoundPage';
import BlogDetailPage from './pages/BlogDetailPage';
import RegisterPage from './pages/RegisterPage';
import UserPage from './pages/UserPage';
import PersonInfoPage from './pages/PersonInfoPage';
import AdminPage from './pages/AdminPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Navbar from './components/Navbar';
import { AuthProvider } from './customHooks/AuthHook';
import AboutPage from './pages/AboutPage';
import EditBlog from './pages/EditBlog';

function App() {
  return (
    <Router>
      <AuthProvider>

        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/blogDetail/:id" element={<BlogDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/createblog"
            element={
              <ProtectedRoute>
                <CreateBlogPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userPage"
            element={
              <ProtectedRoute>
                <UserPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/personInfo/:id"
            element={
              <ProtectedRoute>
                <PersonInfoPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />
          <Route
            path="/editBlog/:id"
            element={
              <ProtectedRoute>
                <EditBlog />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App;
