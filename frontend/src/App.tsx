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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/blogDetail/:id" element={<BlogDetailPage />} />
        <Route
          path="/createblog"
          element={
            <ProtectedRoute>
              <CreateBlogPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userInfo"
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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}

export default App;
