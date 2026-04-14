import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../pages/Home';
import { NotFound } from '../pages/NotFound';
import { ProjectBlog } from '../pages/ProjectBlog';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Navigate to="/blogs/preview" replace />} />
        <Route path="/blogs/preview" element={<ProjectBlog />} />
        <Route path="/blogs/:projectId/*" element={<ProjectBlog />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
