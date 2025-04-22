import './App.css';
import{BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Student from './components/Student';
import Login from './components/Login';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Students" element ={<Student/>}/>
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
