import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      password2: '',
    });

    const { name, email, password, password2 } = formData;

    const navigate = useNavigate();



    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };

      const onSubmit = async (e) => {
        e.preventDefault();

        if (password !== password2) {
          // Тут можна додати логіку для відображення помилки користувачеві, наприклад, через toast повідомлення
          console.log('Passwords do not match');
        } else {
          const userData = {
            name,
            email,
            password,
          };

          try {
            const response = await axios.post('/api/users', userData);

            if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data))
                navigate('/')

            }



          } catch (error) {
            console.log(error);
            // Тут можна обробити помилки та відобразити їх користувачеві
          }
        }
      };





    return (

        <>
        <section className='heading'>
          <h1>
            <span>Task</span>Manager
          </h1>
          <p>Please create an account</p>
        </section>

        <section className='form'>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                id='name'
                name='name'
                value={name}
                placeholder='Enter your name'
                onChange={onChange}
              />
            </div>
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
              <input
                type='password'
                className='form-control'
                id='password2'
                name='password2'
                value={password2}
                placeholder='Confirm password'
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


    )



}


export default Register