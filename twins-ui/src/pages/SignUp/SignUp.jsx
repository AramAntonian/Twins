import { useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import bg from '../../components/svg/bg_signin.svg'
import or from '../../components/svg/or.svg'
import { useNavigate } from "react-router-dom"

function SignUp() {
    const [fullName, setFullName] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    function signUp() {
        (async function () {
            const nameRegex = /^[A-Za-z]+([ '-][A-Za-z]+)*$/
            const phoneRegex = /^\d{9}(\d{3})?$/
            const passwordRegex = /^.{8,}$/
            if (!nameRegex.test(fullName)) {
                alert("Invalid name format.");
                return;
            }
            if (!phoneRegex.test(phone)) {
                alert("Invalid phone format.");
                return;
            }
            if (!passwordRegex.test(password)) {
                alert("Invalid password format.");
                return;
            }
            const body = {
                fullName,
                phone,
                password
            };
            const res = await fetch('http://localhost:3002', {
                headers: {
                    "Content-Type": "application/json",
                },
                method: 'PUT',
                body: JSON.stringify(body)
            });
            const data = await res.json();
            if (!data.error) {
                alert('Registration successful!');
                const json = JSON.stringify(data.user)
                localStorage.removeItem('USER')
                localStorage.setItem('USER', json)
                navigate('/user/' + fullName.trim())
            } else {
                alert(data.error);
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
                    <div style={{ textAlign: 'center', zIndex: 2, color: "white", fontSize: '50px' }}>Sign up</div>
                    <div style={{ zIndex: 2, color: "white", fontSize: '50px', display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                        <span style={{ fontSize: '28px' }}>Full name</span>
                        <input style={{
                            width: '100%',
                            padding: '15px 2px',
                            borderRadius: '10px',
                            border: '1px solid white',
                            color: 'white',
                            fontSize: '18px',
                            background: 'none'
                        }}
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Full name Here"
                        />
                    </div>
                    <div style={{ zIndex: 2, color: "white", fontSize: '50px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
                    <div style={{ zIndex: 2, color: "white", fontSize: '50px', display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
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
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password Here"
                        />
                    </div>
                    <div style={{
                        width: '100%',
                        zIndex: 2
                    }}>
                        <button
                            onClick={signUp}
                            style={{
                                width: '100%',
                                borderRadius: '15px',
                                padding: '10px 0',
                                fontSize: '28px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                color: 'white',
                                background: '#E0A24E'
                            }}>Sign up</button>
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
                        }}>Already have an account?</span>
                        <span
                            onClick={() => navigate('/signin')}
                            style={{
                                cursor: 'pointer',
                                color: '#E0A24E',
                                fontSize: '24px'
                            }}>Sign in</span>
                    </div>
                </div>
            </span>
            <Footer />
        </div>
    )
}

export default SignUp