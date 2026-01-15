import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import LandingScreen from './screens/LandingScreen';
import HomeScreen from './screens/HomeScreen';
import RitualScreen from './screens/RitualScreen';
import OracleScreen from './screens/OracleScreen';
import ReadingScreen from './screens/ReadingScreen';
import MenuScreen from './screens/MenuScreen';
import SearchScreen from './screens/SearchScreen';
import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';
import ReadingHistoryScreen from './screens/ReadingHistoryScreen';
import WishlistScreen from './screens/WishlistScreen';
import SettingsScreen from './screens/SettingsScreen';
import { AnimatePresence } from 'framer-motion';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/ritual" element={<RitualScreen />} />
        <Route path="/oracle" element={<OracleScreen />} />
        <Route path="/reading" element={<ReadingScreen />} />
        <Route path="/menu" element={<MenuScreen />} />
        <Route path="/search" element={<SearchScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/history" element={<ReadingHistoryScreen />} />
        <Route path="/wishlist" element={<WishlistScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="bg-void min-h-screen w-full text-white font-body">
        <AnimatedRoutes />
      </div>
    </HashRouter>
  );
};

export default App;