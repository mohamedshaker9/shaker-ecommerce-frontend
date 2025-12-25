import './App.css'
import { Toaster } from 'react-hot-toast';
import Products from './components/Products.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import Cart from './components/cart/Cart.jsx';
import { useSelector} from 'react-redux';
import LogIn from './components/user/LogIn.jsx';
import Register from './components/user/Register.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Checkout from './components/checkout/Checkout.jsx';
import PaymentConfirm from './components/payment/PaymentConfirm.jsx'; 
import AdminDashboard from './components/admin/dashboard/AdminDashboard.jsx';
import AdminLayout from './components/admin/AdminLayout.jsx';
import Orders from './components/admin/orders/Orders.jsx';
import AdminProducts from './components/admin/products/AdminProducts.jsx';
import CategoriesTable from './components/admin/categories/CategoriesTable.jsx';

function App() {

  const totalCartQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <>
    <div>
      <Toaster
                    position="top-center"
                    reverseOrder={false}
                    />
                </div>
       
    <Router>
      <Navbar cartQuantity={totalCartQuantity} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute adminOnly/>} >
              <Route path="/admin" element={<AdminLayout />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/orders" element={<Orders />} />
                  <Route path="/admin/products" element={<AdminProducts />} />
                  <Route path="/admin/categories" element={<CategoriesTable />} />
              </Route>
          </Route>
          <Route path="/" element={<PrivateRoute />}>
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment-confirm" element={<PaymentConfirm />} />
          </Route>
        </Routes>
    </Router>
       </>
    
  )
}


export default App;
