import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/signin.css'

const SignIn = () => {

  const  {search} = useLocation()
  const redirectInUrl = new URLSearchParams(search).get('redirect')
  const redirect = redirectInUrl ? redirectInUrl : '/'

  return (
    <div className='signin-container'>
      <div className="signin-row">
        <div className="signin-col">
          <form>
            <h2>Sign In</h2>
            <div className="form-group">
              <label htmlFor='email'>E-mail</label>
              <input type='email' required />
            </div>
            <div className="form-group">
              <label htmlFor='password'>Password</label>
              <input type='password' required />
            </div>
            <div className="form-group">
              <button type='submit'>Sign In</button>
            </div>
            <div className='form-group'>
              <Link to={`/signup?redirect=${redirect}/`}>Create your account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn