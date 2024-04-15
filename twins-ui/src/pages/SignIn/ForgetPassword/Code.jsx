/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react"

function Code({ setPage }) {
    const firstDigit = useRef(null)
    const secondDigit = useRef(null)
    const thirdDigit = useRef(null)
    const forthDigit = useRef(null)
    const [focused, setFocused] = useState(1)

    useEffect(() => {
        firstDigit.current.focus()
    }, [])

    const keydown = (e) => {
        if (e.key === 'Backspace') {
            if (focused === 2) {
                firstDigit.current.focus()
                setFocused(1)
            } else if (focused === 3) {
                secondDigit.current.focus()
                setFocused(2)
            } else if (focused === 4) {
                forthDigit.current.value = ''
                setFocused(3)
                thirdDigit.current.focus()
            }

        }
    }


    function onChange(e) {
        if (focused === 1 && e.target.value) {
            secondDigit.current.focus()
            setFocused(2)
        } else if (focused === 2 && e.target.value) {
            thirdDigit.current.focus()
            setFocused(3)
        } else if (focused === 3 && e.target.value) {
            forthDigit.current.focus()
            setFocused(4)
        }
    }

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
            <div style={{ zIndex: 2, color: "white", fontSize: '50px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span style={{ fontSize: '22px' }}>Please Check your phone and enter the code we have sent</span>
                <div style={{
                    display: 'flex',
                    gap: '20px'
                }}>
                    <input
                        onFocus={() => setFocused(1)}
                        onKeyDown={keydown}
                        ref={firstDigit}
                        onChange={onChange}
                        maxLength={1}
                        style={{
                            width: '60px',
                            padding: "20px 0px",
                            textAlign: 'center',
                            borderRadius: '10px',
                            border: '1px solid white',
                            color: 'white',
                            fontSize: '18px',
                            background: 'none'
                        }} />
                    <input
                        onFocus={() => setFocused(2)}
                        onKeyDown={keydown}
                        ref={secondDigit}
                        maxLength={1}
                        onChange={onChange}
                        style={{
                            width: '60px',
                            padding: "20px 0px",
                            textAlign: 'center',
                            borderRadius: '10px',
                            border: '1px solid white',
                            color: 'white',
                            fontSize: '18px',
                            background: 'none'
                        }} />
                    <input
                        onFocus={() => setFocused(3)}
                        onKeyDown={keydown}
                        ref={thirdDigit}
                        maxLength={1}
                        onChange={onChange}
                        style={{
                            width: '60px',
                            padding: "20px 0px",
                            textAlign: 'center',
                            borderRadius: '10px',
                            border: '1px solid white',
                            color: 'white',
                            fontSize: '18px',
                            background: 'none'
                        }} />
                    <input
                        onFocus={() => setFocused(4)}
                        onKeyDown={keydown}
                        ref={forthDigit}
                        maxLength={1}
                        onChange={onChange}
                        style={{
                            width: '60px',
                            padding: "20px 0px",
                            textAlign: 'center',
                            borderRadius: '10px',
                            border: '1px solid white',
                            color: 'white',
                            fontSize: '18px',
                            background: 'none'
                        }} />
                </div>
                <div style={{
                    fontSize: '22px',
                    display: 'flex',
                    gap: '15px',
                    fontFamily: 'Poppins'
                }}>
                    <span>Didn't receive message?</span>
                    <span style={{
                        color: '#E0A24E'
                    }}>Send again</span>
                </div>
            </div>
            <div style={{
                width: '100%',
                zIndex: 2
            }}>
                <button
                    onClick={() => setPage('reset')}
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

export default Code  