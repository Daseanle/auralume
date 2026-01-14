import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import ProtectedRoute from './components/ProtectedRoute';
import RitualProcessor from './components/RitualProcessor'; // Reusing as Loading Spinner

// Lazy Load Pages for Performance
const Dashboard = lazy(() => import('./pages/Dashboard'));
const SoulmateFlow = lazy(() => import('./pages/SoulmateFlow'));
const Tarot = lazy(() => import('./pages/Tarot'));
const Chat = lazy(() => import('./pages/Chat'));
const Profile = lazy(() => import('./pages/Profile'));
const Auth = lazy(() => import('./pages/Auth'));
const PublicHoroscope = lazy(() => import('./pages/public/PublicHoroscope'));
const Compatibility = lazy(() => import('./pages/public/Compatibility'));
const Pricing = lazy(() => import('./pages/legal/Pricing'));
const Terms = lazy(() => import('./pages/legal/Terms'));
const Privacy = lazy(() => import('./pages/legal/Privacy'));
const Refund = lazy(() => import('./pages/legal/Refund'));

const LoadingFallback = () => (
  <div className="min-h-screen bg-black flex items-center justify-center text-gold">
    <div className="animate-spin text-4xl">✦</div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/horoscope" element={<PublicHoroscope />} />
          <Route path="/match/:signs" element={<Compatibility />} />

          {/* Legal / Compliance Pages (Public) */}
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/refund" element={<Refund />} />


          <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/soulmate" element={<SoulmateFlow />} />
            <Route path="/tarot" element={<Tarot />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
