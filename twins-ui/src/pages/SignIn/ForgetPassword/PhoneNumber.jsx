import { useState } from "react"

function PhoneNumber({ setPage }) {
    const [phone, setPhone] = useState('')

    return (
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
            <div style={{ textAlign: 'center', zIndex: 2, color: "white", fontSize: '50px' }}>Forget Password</div>
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
            <div style={{
                width: '100%',
                zIndex: 2
            }}>
                <button
                    onClick={() => { setPage('code') }}
                    style={{
                        width: '100%',
                        borderRadius: '15px',
                        cursor: 'pointer',
                        padding: '10px 0',
                        fontSize: '28px',
                        textAlign: 'center',
                        color: 'white',
                        background: '#E0A24E'
                    }}>Send</button>
            </div>
        </div>
    )
}

export default PhoneNumber