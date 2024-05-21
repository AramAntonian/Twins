import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AboutUs from "./pages/AboutUs/AboutUs";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import ForgetPassword from "./pages/SignIn/ForgetPassword/ForgetPassword";
import ProfilePage from "./pages/Profile/ProfilePage";
import AddCard from "./components/Profile/AddCard";
import Busket from "./components/Busket/Bukset";
import Menu from "./components/Menu/Menu";
import Burger from "./components/Menu/Burger";
import AddProdcutPage from "./pages/Admin/AddProduct/AddProductPage";
import AddIngredients from "./pages/Admin/AddProduct/AddIngredients";
import UsersPage from "./pages/Admin/Users/UsersPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path='/about' element={<AboutUs />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/forgetpassword' element={<ForgetPassword />} />
      <Route path='user/:user' element={<ProfilePage />} />
      <Route path='user/:user/addCard' element={<AddCard />} />
      <Route path='busket' element={<Busket />} />
      <Route path='menu' element={<Menu />} />
      <Route path='menu/burger/:name' element={<Burger />} />
      <Route path='/menu/:product/AddProduct' element={<AddProdcutPage />} />
      <Route path='menu/ingredients/add' element={<AddIngredients />} />
      <Route path='users' element={<UsersPage />} />
    </Routes>
  );
}

export default App;
