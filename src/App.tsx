import { BrowserRouter as Router, Routes, Route } from 'react-router';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { useScrollToTop } from './hooks/useScrollToTop';

import Home from './pages/Home';
import Menu from './pages/Menu';
import Hours from './pages/Hours';
import Catering from './pages/Catering';
import About from './pages/About';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <OrderProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </OrderProvider>
  );
}

function AppContent() {
  useScrollToTop();
  
  return (
    <div className="App">
      <Analytics />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/hours" element={<Hours />} />
          <Route path="/catering" element={<Catering />} />
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
        </Routes>
      </main>
      <Footer />
      <CartSidebar />
    </div>
  );
}

export default App;
