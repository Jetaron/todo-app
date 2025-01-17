
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'



function Header() {

    const navigate = useNavigate()


    const onLogout = () => {
        localStorage.removeItem('user')
        navigate('/login')

    }


  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>TaskManager</Link>
      </div>
      <ul>
        <li>
          <Link to='/login'>
            <FaSignInAlt /> Login
          </Link>
        </li>
        <li>
          <Link to='/register'>
            <FaUser /> Register
          </Link>
        </li>
        <li>
            <button className='btn' onClick={onLogout}>
                <FaSignOutAlt /> Logout

            </button>

        </li>
      </ul>
    </header>
  )
}

export default Header