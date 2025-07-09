import React, { useState } from 'react'
import Login from '../components/Login'
import Register from '../components/Register'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import "../styles/auth.css"

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true)

    return (
        <div className="auth-page">
            <div className="form-container">
                <div className="lottie-container">
                    <DotLottieReact
                        src="https://lottie.host/58578c48-cc58-4080-a463-af9e698c0dff/NSGsPOTbEB.lottie"
                        loop
                        autoplay
                        className='lottie-animation'
                    />
                </div>

                <div className="auth-form-container">
                    <h1 className="form-heading">
                        {isLogin ? "Login" : "Register"}
                    </h1>

                    {isLogin ? <Login /> : <Register />}

                    <p className="mt-4 text-sm">
                        {isLogin
                            ? "Don't have an account?"
                            : "Already have an account?"}{" "}
                        <button
                            className="form-link-btn"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? "Register here" : "Login here"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Auth