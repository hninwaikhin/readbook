import { React } from "react"
import './App.css';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Login from "./feature/Login";
import UserRegister from "./feature/UserRegister";
import BookFormRegister from "./feature/BookFormRegister";
import Dashboard from "./feature/Dashboard";
import ReceiveFormRegister from "./feature/ReceiveFormRegister";
import CartList from "./feature/CartList";
import FavoriteList from "./feature/FavoriteList";
import { navigateToReceiveRegister, navigateToBookRegister, navigateToBookRegisteredList, navigateToCart, navigateToDashboard, navigateToLogin, navigateToUserRegister, navigateToFavorite } from "./common/Variable";
import { Loading } from "./components/Loading";
import BookRegisteredList from "./feature/BookRegisteredList";

function App() {
  return (
    <>
      <div className="relative font-['helvetica'] text-lg w-[2040px] h-[1500px]">
        <Routes>
          <Route path='/readbook/' element={<Dashboard />} />
          <Route path={navigateToLogin} element={<Login />} />
          <Route path={navigateToUserRegister} element={<UserRegister />} />
          <Route path={navigateToBookRegister} element={<BookFormRegister />} />
          <Route path={navigateToBookRegisteredList} element={<BookRegisteredList />} />
          <Route path={navigateToReceiveRegister} element={<ReceiveFormRegister />} />
          <Route path={navigateToDashboard} element={<Dashboard />} />
          <Route path={navigateToCart} element={<CartList />} />
          <Route path={navigateToFavorite} element={<FavoriteList></FavoriteList>} />
        </Routes>
      </div>
      {<Loading></Loading>}
    </>
  );
}

export default App;