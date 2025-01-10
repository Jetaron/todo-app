import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Register from './components/Register'
import Login from './components/Login'
import Projects from './pages/Projects'
import Tasks from './pages/Tasks'
import PrivateRoute from './components/PrivateRoute'




function App() {
  return (
    <>
      <Router>


        <div className='container'>
          <Header />
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<PrivateRoute />}>
                <Route path='/' element={<Projects />} />
                <Route path='/project/:id' element={<Tasks />} />

            </Route>



          </Routes>
        </div>
      </Router>
      <ToastContainer />


    </>
  )
}

export default App