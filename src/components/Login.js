import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Login = (props) => {

    let navigate = useNavigate()

    const [credentials, setCredentials] = useState({ email: '', password: '' })

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })

        });
        const json = await response.json();
        console.log(json);

        if (json.success) {
            // save the auth token and redirect

            localStorage.setItem("token", json.authToken);
            props.showAlert('Logged in Successfully', 'success')
            navigate('/');
        } else {
            props.showAlert('Invalid Credentials', 'danger')
        }


    }
    return (
        <>        <div className='d-flex  justify-content-center login '  >
            <form onSubmit={handleSubmit} className="bg-light p-5 rounded mt-5">
                <h4 mt-0>Login to continue to use iNotebook</h4>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp"  value={credentials.email} onChange={onChange} />

                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password'  value={credentials.password} onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-primary">Login </button>
                <span>    Don't have an account? Click Here to <Link to='/signup'>Signup</Link></span>
            </form>   

        </div>
        </>

    )
}

export default Login
