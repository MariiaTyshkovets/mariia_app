import React from 'react';
import Content from './containers/Content';
import Header from './components/Header/Header';
import { Routes, Route } from 'react-router-dom';
import PrevOrders from './containers/PrevOrders';
import Contact from './components/Contact/Contact';
import FAQ from './components/FAQ/FAQ';
import NotFound from './components/NotFound/NotFound';
import Lesson from './components/Lesson';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/mariia_app" element={<Content />}/>
        <Route path='/mariia_app/orders' element={<PrevOrders />}/>
        <Route path='/mariia_app/contact' element={<Contact/>}/>
        <Route path='/mariia_app/FAQ' element={<FAQ/>}/>
        <Route path='/mariia_app/lesson' element={<Lesson/>}/>
        <Route path='/mariia_app/*' element={<NotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
