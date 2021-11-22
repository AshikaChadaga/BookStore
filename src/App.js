import './App.css';
import Homepage from './pages/homepage/Homepage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { Switch } from 'react-router';

function App() {
  return (
    <div className="App">
      <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Homepage/>}></Route>
          <Route exact path='*' component={() => "404 Not Found"}></Route>
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
