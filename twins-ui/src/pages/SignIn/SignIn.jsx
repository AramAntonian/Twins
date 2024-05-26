import { useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import bg from '../../components/svg/bg_signin.svg'
import { useNavigate } from "react-router-dom"
import or from '../../components/svg/or.svg'
import ceye from '../../components/svg/ceye.svg'
import eye from '../../components/svg/eye.svg'


function SignIn() {
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    function signIn() {
        (async function () {
            const phoneRegex = /^\d{9}(\d{3})?$/
            const passwordRegex = /^.{8,}$/
            if (!phoneRegex.test(phone) && phone !== 'ADMIN') {
                alert("Invalid phone format.");
                return;
            }
            if (!passwordRegex.test(password) && password !== 'TWINS_ADMIN') {
                alert("Invalid password format.");
                return;
            }
            const body = {
                phone,
                password
            };
            try {
                const res = await fetch('http://localhost:3002', {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: 'POST',
                    body: JSON.stringify(body)
                });
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                if (!data.error && data.length) {
                    console.log(data);
                    localStorage.removeItem('USER')
                    localStorage.setItem('USER', JSON.stringify(data[0]))
                    alert('Registration successful!');
                    navigate('/user/' + data[0].fullName)
                } else {
                    alert('error: ' + data.error);
                }
            } catch (error) {
                console.error('Error during signup:', error);
                alert('An error occurred during registration.');
            }
        })();
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Header />
            <span style={{
                width: '100%',
                background: 'black',
                position: 'relative'
            }}>
                <img src={bg} alt='bg' style={{
                    width: '100%'
                }} />
                <div
                    style={{
                        position: 'absolute',
                        width: '450px',
                        border: '2px solid #E0A24E',
                        borderRadius: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        top: '150px',
                        left: '100px',
                        padding: '50px 30px',
                        gap: '25px'
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        zIndex: 1,
                        top: 0,
                        left: 0,
                        background: 'grey',
                        borderRadius: '20px',
                        opacity: 0.4
                    }}></div>
                    <div style={{ textAlign: 'center', zIndex: 2, color: "white", fontSize: '50px' }}>Sign in</div>
                    <div style={{ zIndex: 2, color: "white", fontSize: '50px', display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                        <span style={{ fontSize: '28px' }}>Phone number</span>
                        <input style={{
                            width: '100%',
                            padding: '15px 2px',
                            borderRadius: '10px',
                            border: '1px solid white',
                            color: 'white',
                            fontSize: '18px',
                            background: 'none'
                        }}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Phone Number Here"
                        />
                    </div>
                    <div style={{ zIndex: 2, color: "white", fontSize: '50px', display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px', position: 'relative' }}>
                        <span style={{ fontSize: '28px' }}>Password</span>
                        <input style={{
                            width: '100%',
                            padding: '15px 2px',
                            borderRadius: '10px',
                            border: '1px solid white',
                            color: 'white',
                            fontSize: '18px',
                            background: 'none'
                        }}
                            value={password}
                            type={open ? 'text' : 'password'}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password Here"
                        />
                        <img src={open ? eye : ceye} alt='eye' onClick={() => { setOpen(prev => !prev) }} style={{
                            position: 'absolute',
                            top: '60px',
                            cursor: "pointer",
                            right: '10px'
                        }} />
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }}>
                            <span
                                onClick={() => navigate('/forgetpassword')}
                                style={{
                                    color: '#E0A24E',
                                    cursor: 'pointer'
                                }}>Forget password?</span>
                        </div>
                    </div>
                    <div style={{
                        width: '100%',
                        zIndex: 2
                    }}>
                        <button
                            onClick={signIn}
                            style={{
                                width: '100%',
                                borderRadius: '15px',
                                padding: '10px 0',
                                fontSize: '28px',
                                textAlign: 'center',
                                color: 'white',
                                background: '#E0A24E'
                            }}>Sign in</button>
                    </div>
                    <img src={or} alt='or' style={{ zIndex: 2 }} />
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        zIndex: 2
                    }}>
                        <span style={{
                            fontSize: '24px',
                            color: 'white'
                        }}>Don't have an account?</span>
                        <span
                            onClick={() => navigate('/signup')}
                            style={{
                                cursor: 'pointer',
                                color: '#E0A24E',
                                fontSize: '24px'
                            }}>Sign up</span>
                    </div>
                </div>
            </span>
            <Footer />
        </div>
    )
}

export default SignIn