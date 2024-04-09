import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useReducer } from "react";
import {
  initialState,
  reducer,
  GlobalState,
} from "./middlewares/global-states";
import AuthProtected from "./middlewares/AuthProtected";
import Home from "./pages/Home";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Signup from "./component/Signup";
import Login from "./component/Login";
import Hero from "./component/Home/Hero";
import UserDashboard from "./pages/UserDashboard";
import Breakfast from "./component/UserDashboard/Breakfast";
import Lunch from "./component/UserDashboard/LunchItems";
import MealTiming from "./component/UserDashboard/MealTiming";
import AdminDashboard from "./pages/AdminDashboard";
import AddItem from "./component/Admin/AddItem";
import OrderMini from "./component/Admin/OrderMini";
import DonateListing from "./component/Admin/DonateListing";
import Item from "./pages/Item";
import Bookings from "./component/Booking/Bookings";
import NgoDashboard from "./pages/NgoDashbaord";

function App() {
  const [data, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <BrowserRouter>
        <GlobalState.Provider value={{ data: data, dispatch: dispatch }}>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <AuthProtected>
                  <Home />
                </AuthProtected>
              }
            >
              <Route path="" element={<Hero />} />
              <Route
                path="user/signup"
                element={<Signup currentRole={"User"} />}
              />
              <Route
                path="user/verify"
                element={<Login currentRole={"User"} />}
              />
            </Route>
            <Route
              path="/user"
              element={
                <AuthProtected>
                  <UserDashboard />
                </AuthProtected>
              }
            >
              <Route path="" element={<MealTiming />} />
              <Route path="breakfast" element={<Breakfast />} />
              <Route path="lunch" element={<Lunch />} />
            </Route>
            <Route
              path="/user/booking"
              element={
                <AuthProtected>
                  <Bookings />
                </AuthProtected>
              }
            />
            <Route
              path="/admin"
              element={
                <AuthProtected>
                  <AdminDashboard />
                </AuthProtected>
              }
            >
              <Route
                path="/admin/verify"
                element={<Login currentRole={"Admin"} />}
              />
              <Route path="" element={<OrderMini />} />
              <Route path="addFood" element={<AddItem />} />
              <Route path="donateFood" element={<DonateListing />} />
            </Route>
            <Route path="/food/:id/:quantity" element={<Item />} />
          </Routes>

          <Footer />
        </GlobalState.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
