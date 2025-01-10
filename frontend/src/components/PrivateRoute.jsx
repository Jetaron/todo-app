import { Outlet, Navigate } from 'react-router-dom'

//  В функції getuser ми парсимо об'єкт користувача з localStorage, якщо він там є, інакше null
const useAuth = () => {

    const user = JSON.parse(localStorage.getItem('user'))

    if(user) {
        return true
    } else {
        return false
    }

}






const PrivateRoute = () => {

    const auth = useAuth()



    return auth ? <Outlet /> : <Navigate to='/login' />




}


export default PrivateRoute