import './App.css';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingCar from './pages/BookingCar';
import UserBookings from './pages/UserBookings';
import AddCar from './pages/AddCar';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';
import ProtectedRoute from "./components/ProtectedRoute";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <ProtectedRoute path="/" exact component={Home} />
        <ProtectedRoute path="/booking/:carid" exact component={BookingCar} />
        <ProtectedRoute path="/userbookings" exact component={UserBookings} />
        <ProtectedRoute path="/addcar" exact component={AddCar} role="admin" />
        <ProtectedRoute path="/admin" exact component={AdminHome} role="admin" />
        <ProtectedRoute path="/editcar/:carid" exact component={EditCar} role="admin" />
      </BrowserRouter>
    </div>
  );
}

export default App;