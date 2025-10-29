import { Routes, Route, Navigate } from 'react-router-dom';
import PhotosPage from './pages/PhotosPage';
import PhotoPage from './pages/PhotoPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/photos" replace />} />
      <Route path="/photos" element={<PhotosPage />} />
      <Route path="/photos/:id" element={<PhotoPage />} />
    </Routes>
  );
}

export default App;
