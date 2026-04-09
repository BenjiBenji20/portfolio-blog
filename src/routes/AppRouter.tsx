import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Further routes like /project/:id or /blogs will map here later */}
        <Route path="*" element={<div className="p-24 text-center">404 - Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
