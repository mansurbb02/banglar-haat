import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import ProductDetail from './pages/ProductDetail';
import FridayHaat from './pages/FridayHaat';
import HaatRules from './pages/HaatRules';
import Creators from './pages/Creators';
import CreatorProfile from './pages/CreatorProfile';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import BecomeCreator from './pages/BecomeCreator';
import Search from './pages/Search';
import About from './pages/About';
import OriginDetail from './pages/OriginDetail';

function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <BrowserRouter>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <div style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/search" element={<Search />} />
                <Route path="/product/:slug" element={<ProductDetail />} />
                <Route path="/friday-haat" element={<FridayHaat />} />
                <Route path="/friday-haat/rules" element={<HaatRules />} />
                <Route path="/creators" element={<Creators />} />
                <Route path="/creator/:slug" element={<CreatorProfile />} />
                <Route path="/origins/:slug" element={<OriginDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/become-a-creator" element={<BecomeCreator />} />
                <Route path="/about" element={<About />} />
                <Route path="/help" element={<About />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </LanguageProvider>
  );
}

export default App;
