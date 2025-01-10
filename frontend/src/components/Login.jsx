import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',

  });

  const { email, password } = formData;

  const navigate = useNavigate();



  const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };

    const onSubmit = async (e) => {
      e.preventDefault();


        const userData = {
          email,
          password,
        };

        try {
          const response = await axios.post('/api/users/login', userData);

          if (response.data) {
              localStorage.setItem('user', JSON.stringify(response.data))
              navigate('/')

          }



        } catch (error) {
          console.log(error);
          // Тут можна обробити помилки та відобразити їх користувачеві
        }

    };





  return (
    <>
      <section className='heading'>
        <h1>
          <span>Task</span>Manager
        </h1>
        <p>Login</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>

          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter your password'
              onChange={onChange}
            />
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login