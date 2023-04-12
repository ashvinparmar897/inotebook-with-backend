import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' })
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch('http://localhost:5000/api/auth/createuser', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })
    const json = await response.json()
    console.log(json)

    if (json.success) {
      // save auth token and redirect
      localStorage.setItem('token', json.authToken);
      props.showAlert('Account Created Successfully', 'success')
      navigate('/');
    } else {
      props.showAlert('Invalid Detail', 'danger')
    }

  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })

  }
  return (
    <div className="container d-flex justify-content-center signup">
      <form onSubmit={handleSubmit} className="bg-light p-5">
      <h4 mt-0>Signup to continue to use iNotebook</h4>
        <div className="form-group mt-2">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control " id="name" name="name" aria-describedby="nameHelp" placeholder="Enter Name" value={credentials.name} onChange={onChange} />

        </div>
        <div className="form-group mt-2">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" value={credentials.email} onChange={onChange} />

        </div>

        <div className="form-group mt-2">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={credentials.password} onChange={onChange} minLength={5} required />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="cpassword"> Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" placeholder="Confirm Password" value={credentials.cpassword} onChange={onChange} minLength={5} required />
        </div>

        <button type="submit" className="btn btn-primary mt-2">Signup</button>
        <span>    Already user? Click Here to <Link to='/login'>Login</Link></span>
      </form>

    </div>
  )
}

export default Signup
