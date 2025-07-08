import React from 'react'
import '../styles/auth.css'

const Register = () => {
  return (
    <>
      <div className="form">
        <form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" className="btn">Register</button>
        </form>
      </div>
    </>
  )
}

export default Register