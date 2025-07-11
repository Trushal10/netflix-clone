import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Player from './pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify';
function App() {
  const navigate = useNavigate()
  useEffect(() => {
    onAuthStateChanged(auth, async (user)=> {
      if(user) {
        navigate('/')
      } else {
        navigate('/login')
      }
    })
  },[]) 
  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/player/:id' element={<Player />} />
    </Routes>
    </>
  )
}

export default App
