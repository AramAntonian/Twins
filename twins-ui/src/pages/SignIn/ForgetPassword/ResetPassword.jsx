import { useState } from "react"

function ResetPassword({ setPage }) {
    const [password, setPassword] = useState('')
    const [resetPass, setResetPass] = useState('')

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
            <div style={{ textAlign: 'center', zIndex: 2, color: "white", fontSize: '50px' }}>Reset Password</div>
            <div style={{ zIndex: 2, color: "white", fontSize: '50px', display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                <span style={{ fontSize: '28px' }}>New password</span>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '15px 2px',
                        borderRadius: '10px',
                        border: '1px solid white',
                        color: 'white',
                        fontSize: '18px',
                        background: 'none'
                    }}
                    placeholder="New Password Here"
                />
            </div>
            <div style={{ zIndex: 2, color: "white", fontSize: '50px', display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                <span style={{ fontSize: '28px' }}>Confirm Password</span>
                <input
                    value={resetPass}
                    onChange={(e) => setResetPass(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '15px 2px',
                        borderRadius: '10px',
                        border: '1px solid white',
                        color: 'white',
                        fontSize: '18px',
                        background: 'none'
                    }}
                    placeholder="Confirm Password Here"
                />
            </div>
            <div style={{
                width: '100%',
                zIndex: 2
            }}>
                <button
                    style={{
                        width: '100%',
                        borderRadius: '15px',
                        padding: '10px 0',
                        fontSize: '28px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        color: 'white',
                        background: '#E0A24E'
                    }}>Confirm</button>
            </div>
        </div>
    )
}

export default ResetPassword