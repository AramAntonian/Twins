import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import Modal from '@mui/material/Modal'
import dots from '../svg/dots.svg'

function ProfileCard({ fullName, phone, email, cards, edit, setEdit }) {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const [phoneInp, setPhoneInp] = useState(phone)
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [emailInp, setEmailInp] = useState('')
    const [password, setPassword] = useState('')


    function handleSave() {
        const nameRegex = /^[A-Za-z]*$/
        const phoneRegex = /^\d{9}(\d{3})?$/
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!nameRegex.test(name)) {
            setName(fullName.split(' ')[0])
        }
        if (!nameRegex.test(surname)) {
            setSurname(fullName.split(' ')[1])
        }
        if (!phoneRegex.test(phoneInp)) {
            setPhoneInp(phone)
        }
        if (!emailRegex.test(emailInp)) {
            setEmailInp(email)
        }
        (async function () {
            const body = { fullName: name + ' ' + surname, phone: phoneInp, email: emailInp, oldPhone: phone }
            const res = await fetch('http://localhost:3002/edit', {
                headers: {
                    "Content-Type": "application/json",
                },
                method: 'POST',
                body: JSON.stringify(body)
            });
            const data = await res.json()
            if(data.error) {
                alert(data.error)
            } else {
                localStorage.setItem('USER', JSON.stringify(data.user))
                setEdit(false)
            }
        })()
    }

    function handleDelete() {
        (async function () {
            const passwordRegex = /^.{8,}$/
            if (!passwordRegex.test(password)) {
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
                    method: 'DELETE',
                    body: JSON.stringify(body)
                });
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                if (data.result) {
                    localStorage.removeItem('USER')
                    alert('deleted successful!');
                    navigate('/')
                } else {
                    alert('invalid password');
                }
            } catch (error) {
                console.error('Error during signup:', error);
                alert('An error occurred during registration.');
            }
        })();
    }

    function logout() {
        localStorage.removeItem('USER')
        window.location.href = '/'
    }

    useEffect(() => {
        setPhoneInp(phone)
        if (fullName) {
            setName(fullName.split(' ')[0])
            setSurname(fullName.split(' ')[1])
        }
        setEmailInp(email)
    }, [phone, fullName, email])

    return (
        <>
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
                    padding: '20px 30px',
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
                {
                    !edit ?
                        <div style={{ textAlign: 'center', zIndex: 2, color: "white", fontSize: '50px' }}>{fullName}</div>
                        : null
                }
                {
                    edit ?
                        <input style={{
                            fontSize: '28px',
                            color: 'white',
                            borderBottom: '1px solid #E0A24E',
                            padding: '10px 5px',
                            zIndex: 2,
                            background: 'none'
                        }}
                            placeholder='Your name'
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                        :
                        null
                }

                {
                    edit ?
                        <input style={{
                            fontSize: '28px',
                            color: 'white',
                            borderBottom: '1px solid #E0A24E',
                            padding: '10px 5px',
                            zIndex: 2,
                            background: 'none'
                        }}
                            placeholder='Your surname'
                            value={surname}
                            onChange={(e) => { setSurname(e.target.value) }}
                        />
                        :
                        null
                }

                {
                    edit ?
                        <input style={{
                            fontSize: '28px',
                            color: 'white',
                            borderBottom: '1px solid #E0A24E',
                            padding: '10px 5px',
                            zIndex: 2,
                            background: 'none'
                        }}
                            placeholder='Your phone'
                            value={phoneInp}
                            onChange={(e) => { setPhoneInp(e.target.value) }}
                        />
                        :
                        <div style={{
                            fontSize: '28px',
                            color: 'white',
                            borderBottom: '1px solid #E0A24E',
                            padding: '10px 5px',
                            zIndex: 2,
                            background: 'none'
                        }}
                        >{phoneInp}</div>

                }
                {
                    edit ?
                        <input style={{
                            fontSize: '28px',
                            color: 'white',
                            borderBottom: '1px solid #E0A24E',
                            padding: '10px 5px',
                            zIndex: 2,
                            background: 'none'
                        }}
                            placeholder='Your email'
                            value={emailInp}
                            onChange={(e) => { setEmailInp(e.target.value) }}
                        />
                        :
                        <div style={{
                            fontSize: '28px',
                            color: 'white',
                            borderBottom: '1px solid #E0A24E',
                            padding: '10px 5px',
                            zIndex: 2,
                            background: 'none'
                        }}
                        >{emailInp || 'E-mail'}</div>

                }

                {
                    cards && cards.length ? cards?.map(el => (
                        <span>{el.numbers}</span>
                    ))
                        : <div style={{
                            display: 'flex',
                            fontSize: '28px',
                            borderBottom: edit ? '' : '1px solid #E0A24E',
                            padding: '10px 5px',
                            color: 'white',
                            zIndex: 2,
                            justifyContent: 'space-between'
                        }}>Payment methods {edit && <img src={dots}
                            onClick={() => { navigate('addCard') }}
                            alt='dots' style={{
                                cursor: 'pointer'
                            }} />}</div>
                }
                <div style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'flex-end',
                    fontSize: '20px',
                    color: 'white',
                    zIndex: 2
                }}>
                    <span
                        onClick={() => { setEdit(true) }}
                        style={{
                            cursor: 'pointer',
                            visibility: edit ? 'hidden' : 'visible'
                        }}>
                        Edit Profile
                    </span>
                </div>
                {
                    !edit ?

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>

                            <div
                                onClick={logout}
                                style={{
                                    width: '45%',
                                    background: '#E0A24E',
                                    borderRadius: '15px',
                                    padding: '10px 0',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    color: 'white',
                                    fontSize: "28px",
                                    zIndex: 2
                                }}>
                                Log out
                            </div>
                            <div
                                onClick={() => { setOpen(true) }}
                                style={{
                                    width: '45%',
                                    background: '#AD1C23',
                                    borderRadius: '15px',
                                    padding: '10px 0',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    color: 'white',
                                    fontSize: "28px",
                                    zIndex: 2
                                }}>
                                Delete account
                            </div>
                        </div>
                        :
                        <div
                            onClick={handleSave}
                            style={{
                                width: '100%',
                                background: '#E0A24E',
                                borderRadius: '15px',
                                padding: '10px 0',
                                cursor: 'pointer',
                                textAlign: 'center',
                                color: 'white',
                                fontSize: "28px",
                                zIndex: 2
                            }}>
                            Save
                        </div>
                }
            </div>
            <Modal
                open={open}
                onClose={() => { }}
            >
                <div style={{
                    display: 'flex',
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    border: '1px solid black',
                    flexDirection: 'column',
                    width: '40%',
                    transform: 'translate(-50%, -50%)',
                    gap: '20px',
                    color: 'black',
                    background: 'white',
                    padding: '30px 20px',
                    justifyContent: 'space-between',
                    alignItems: 'center',

                }}>
                    <span>Enter your password</span>
                    <div>
                        <input
                            style={{
                                border: '1px solid black',
                                padding: '3px 4px'
                            }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div style={{
                        display: 'flex',
                        gap: '30px',
                        alignItems: 'center'
                    }}>
                        <span
                            onClick={() => setOpen(false)}
                            style={{
                                textAlign: 'center',
                                cursor: 'pointer'
                            }}>Cancel</span>
                        <span
                            onClick={handleDelete}
                            style={{
                                textAlign: 'center',
                                color: 'green',
                                cursor: 'pointer'
                            }}>Confirm</span>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ProfileCard