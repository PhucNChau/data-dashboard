import { Link, Outlet } from 'react-router-dom';
import './App.css';

function App() {

  return (
    <div className="app">
      <Link to="/"><h1>Breweries Dashboard</h1></Link>
      
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default App;
