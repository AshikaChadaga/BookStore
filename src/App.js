import './App.css';
import Homepage from './pages/homepage/Homepage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import CartPage from './pages/cartpage/CartPage';
import { ProtectedRoute } from './components/protectedroute/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Router>
          <div className="App">
            <Routes>
              <Route path='/' element={<Homepage />}></Route>
              <Route path='/login' element={<Homepage />}></Route>
              <Route exact path='/dashboard' element={<ProtectedRoute />}>
                <Route exact path='/dashboard' element={<Dashboard />} />
              </Route>
              <Route exact path='/cart' element={<ProtectedRoute />}>
                <Route exact path='/cart' element={<CartPage />} />
              </Route>
              <Route exact path='*' component={() => "404 Not Found"}></Route>
            </Routes>
          </div>
      </Router>
    </div>
  );
}

export default App;
