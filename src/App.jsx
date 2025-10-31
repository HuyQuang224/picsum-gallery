import { Routes, Route, Navigate } from 'react-router-dom';
import PhotosPage from './pages/PhotosPage';
import PhotoPage from './pages/PhotoPage';

function App() {
  return (
    // Define application routes
    <Routes>
      {/* Redirect base path to /photos */}
      <Route path="/" element={<Navigate to="/photos" replace />} />

      {/* List view */}
      <Route path="/photos" element={<PhotosPage />} />

      {/* Detail view (/:id) - PhotoPage reads id from params or location state */}
      <Route path="/photos/:id" element={<PhotoPage />} />
    </Routes>
  );
}

export default App;
