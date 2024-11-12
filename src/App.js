import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QRCode from './Component/AddRestaurant/QRCodePage.jsx'
// import AddRestaurant from './Component/AddRestaurant/AddRestaurant.jsx';
import PersonalInfoPage from './Component/AddRestaurant/PersonalInfoPage.jsx'
import HomePage from './Component/HomePage.jsx';
import RestaurantInfoPage from './Component/AddRestaurant/RestaurantInfoPage.jsx'
import MenuDetails from './Component/AddRestaurant/MenuDetails.jsx'
import SignUp from './Component/SignUp.jsx'
import SignUpForm from './Component/SignUpForm.jsx'
import Chatbot from './Component/Chatbot.jsx';
const theme = createTheme(); // Customize your theme if needed

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/qrcode" element={<QRCode/>} />
          <Route path="/add-restaurant" element={<PersonalInfoPage/>} />
          <Route path='/restaurant-info' element={<RestaurantInfoPage/>}/>
          <Route path='/menu-details' element={<MenuDetails/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/signupform' element={<SignUpForm/>}/>
          <Route path='/chat-bot' element={<Chatbot/>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
