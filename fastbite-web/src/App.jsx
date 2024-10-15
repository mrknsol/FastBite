import './App.css'
import { HomePage, MenuPage, ProfilePage, ReservePage, OrderPage } from './pages'
import {Route, Routes} from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/reserve" element={<ReservePage/>}/>
        <Route path="profile" element={<ProfilePage/>}/>
        <Route path="/menu" element={<MenuPage/>}/>
        <Route path="/order" element={<OrderPage/>}/>
      </Routes>
    </>
  )
}

export default App
