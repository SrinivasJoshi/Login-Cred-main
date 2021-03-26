import React from 'react';
import img1 from './images/student-login-img.svg';
import img2 from './images/professional-login-img.svg';

const Login = (props) => {
    const {
        email1,
        email2,
        password1,
        password2,
        setEmail1,
        setEmail2,
        setPassword1,
        setPassword2,
        handleLogin,
        handleLoginClg,
        email1Error,
        email2Error,
        password1Error,
        password2Error,
    } = props;

    const handleSubmit=(e)=>{
        e.preventDefault();
    }
    return (
        <div className="Login">
            <div className="two">
                <h2>Login for College Students</h2>
                <img src={img1} alt=""/>
                <p>Find people and peer groups with same niche as yours </p>
                <form action="">
                    <input type="text" placeholder="Email" required={true}
                    value={email2}
					onChange={(e) => setEmail2(e.target.value)}
                    />
                    <p className="errorMsg">{email2Error}</p>
                    <input type="password" placeholder="Password" required={true}
                    value={password2}
					onChange={(e) => setPassword2(e.target.value)}
                    />
                    <p className="errorMsg">{password2Error}</p>
                    <button type="button" onClick={handleLoginClg}>Login</button>
                </form>
            </div>
            <div className="one">
                <h2>Login for Professionals</h2>
                <img src={img2} alt=""/>
                <p>Meet the professionals all around the world!</p>
                <form onSubmit={handleSubmit}>
                    <input type="text"  placeholder="Email"  required={true}
                    value={email1}
					onChange={(e) => setEmail1(e.target.value)}
                    />
                    <p className="errorMsg">{email1Error}</p>
                    <input type="password"  placeholder="Password" required={true}
                    value={password1}
					onChange={(e) => setPassword1(e.target.value)}
                    />
                    <p className="errorMsg">{password1Error}</p>
                    <button type="submit" onClick={handleLogin}>Login</button>
                </form>
            </div> 
        </div>
    );
}

export default Login;
