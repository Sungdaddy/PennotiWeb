import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LoyaltyProvider } from './context/LoyaltyContext';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { ProductDetail } from './pages/ProductDetail';
import { Rewards } from './pages/Rewards';
import { Cart } from './pages/Cart';
import { AdminPanel } from './pages/AdminPanel';
import { VoteFlavors } from './pages/VoteFlavors';
import './i18n';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <LoyaltyProvider>
        <Router>
          <div className="min-h-screen bg-vanilla text-chocolate selection:bg-brandRed selection:text-white overflow-hidden relative">
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/vote" element={<VoteFlavors />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>

            {/* Footer removed to allow page-specific footers */}
          </div>
        </Router>
      </LoyaltyProvider>
    </AuthProvider>
  );
};

export default App;