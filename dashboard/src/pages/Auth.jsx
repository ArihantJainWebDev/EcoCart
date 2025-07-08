import Login from '../components/Login'
import Register from '../components/Register'
import Spline from '@splinetool/react-spline'
import "../styles/auth.css"

const Auth = () => {
    return (
        <div className="auth-page">
            <div className="spline-container">
                <Spline
        scene="https://prod.spline.design/ZNLgYvng7FZxsS0B/scene.splinecode" 
      />
            </div>
            <div className="auth-form-container">
                <h1 className="form-heading">Login</h1>
                <p className="mt-4 text-sm">Already have an account?
                    <button className="form-btn">Login here</button>
                </p>
            </div>
        </div>
    )
}

export default Auth