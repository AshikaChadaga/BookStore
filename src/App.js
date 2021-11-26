import './App.css';
import Homepage from './pages/homepage/Homepage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import CartPage from './pages/cartpage/CartPage';
// import { Switch } from 'react-router';

function App() {
  return (
    <div className="App">
      <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Homepage/>}></Route>
          <Route path='/login' element={<Homepage/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route path='/cart' element={<CartPage/>}></Route>
          <Route exact path='*' component={() => "404 Not Found"}></Route>
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
