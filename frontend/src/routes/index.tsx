import { Routes, Route } from 'react-router-dom'
import Healthy from '../pages/Healthy'
import NotFound from '../pages/NotFound'

export default function IndexRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Healthy />} />
      <Route path="/healthy" element={<Healthy />} />
      {/* Catch-all route for unknown URLs */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
