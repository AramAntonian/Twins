const { useState, useEffect } = require("react")

function CardInput({ side, userId, setSide, cardList, setDeleted }) {
    const [numbers, setNumbers] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [code, setCode] = useState('')
    const [owner, setOwner] = useState('')


    function deleteCard(card) {
        (async function () {
            const body = { card, userId }
            const res = await fetch('http://localhost:3002/card', {
                headers: {
                    "Content-Type": "application/json",
                },
                method: 'DELETE',
                body: JSON.stringify(body)
            });
            const data = await res.json()
            if (data.error) {
                alert(data.error)
            } else {
                setDeleted(prev => !prev)
            }
        })()
    }

    function handleSave() {
        const reqBody = { userId }
        if (numbers && numbers.length === 16) {
            reqBody.card = numbers
            let expire = ''
            if (month && month <= 12) {
                if (month.length === 1) {
                    expire += '0' + month
                } else {
                    expire += month
                }
                if (year && year >= 24) {
                    expire += '/' + year
                    reqBody.expiration = expire
                    if (code && code.length === 4) {
                        reqBody.code = code
                        const fullNameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
                        if (owner && fullNameRegex.test(owner)) {
                            reqBody.owner = owner
                            if (true)
                                (async function () {
                                    const res = await fetch('http://localhost:3002/card', {
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        method: 'POST',
                                        body: JSON.stringify(reqBody)
                                    });
                                    const data = await res.json()
                                    if (data.error) {
                                        alert(data.error)
                                    } else {
                                        alert('i')
                                        setSide(false)
                                    }
                                })()
                        } else {
                            alert('invalid owner name')
                        }
                    } else {
                        alert('invalid security code')
                    }
                } else {
                    alert('invalid year')
                }
            } else {
                alert('invalid month')
            }
        } else {
            alert('invalid card numbers')
        }
    }


    const handleChange = (e, setValue) => {
        const newValue = e.target.value;
        if (/^\d*$/.test(newValue)) {
            setValue(newValue);
        }
    };

    return (
        <>
            {
                !side ?
                    <div>
                        {
                            cardList.map((el, idx) => (
                                <div style={{
                                    display: 'flex',
                                    borderBottom: '1px solid #E0A24E',
                                    alignItems: 'center',
                                }}>
                                    <input style={{
                                        fontSize: '18px',
                                        color: 'white',
                                        width: '100%',
                                        padding: '10px 5px',
                                        background: 'none'
                                    }}
                                        maxLength={16}
                                        placeholder='0000 0000 0000 0000'
                                        value={el.card}
                                    />
                                    <span
                                        onClick={() => deleteCard(el.card)}
                                        style={{
                                            fontFamily: 'Kanit, sans-serif',
                                            color: 'white',
                                            cursor: 'pointer'
                                        }}>x</span>
                                </div>
                            ))
                        }
                    </div>
                    :
                    <div>
                        <div style={{
                            borderBottom: '1px solid #E0A24E'
                        }}>
                            <input style={{
                                fontSize: '16px',
                                color: 'white',
                                width: '100%',
                                padding: '10px 5px',
                                background: 'none'
                            }}
                                maxLength={16}
                                placeholder='0000 0000 0000 0000'
                                value={numbers}
                                onChange={(e) => { handleChange(e, setNumbers) }}
                            />
                        </div>
                        <div style={{
                            color: 'white',
                            fontSize: "24px",
                            zIndex: 2,
                            marginTop: '10px'
                        }}>Expiration date</div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            borderBottom: '1px solid #E0A24E',
                            width: '100%',
                            padding: '10px 0',
                        }}>
                            <input style={{
                                width: '50px',
                                fontSize: '16px',
                                padding: '5px 0',
                                borderRadius: '20px',
                                textAlign: 'center',
                                background: 'white'
                            }}
                                value={month}
                                onChange={(e) => { handleChange(e, setMonth) }}
                                maxLength={2}
                                placeholder="MM"
                            />
                            <div style={{
                                color: 'white',
                                fontSize: '32px'
                            }}>/</div>
                            <input style={{
                                width: '50px',
                                fontSize: '16px',
                                padding: '5px 0',
                                borderRadius: '20px',
                                textAlign: 'center',
                                background: 'white'
                            }}
                                value={year}
                                onChange={(e) => { handleChange(e, setYear) }}
                                maxLength={2}
                                placeholder="YY"
                            />
                        </div>
                        <div style={{
                            color: 'white',
                            fontSize: "24px",
                            zIndex: 2,
                            marginTop: '10px'
                        }}>Security code</div>
                        <div style={{
                            display: 'flex',
                            borderBottom: '1px solid #E0A24E',
                        }}>
                            <input style={{
                                fontSize: '18px',
                                color: 'white',
                                width: '100%',
                                padding: '10px 5px',
                                background: 'none'
                            }}
                                value={code}
                                onChange={(e) => { handleChange(e, setCode) }}
                                maxLength={4}
                                placeholder="0000"
                            />
                        </div>
                        <div style={{
                            color: 'white',
                            fontSize: "24px",
                            zIndex: 2,
                            marginTop: '10px'
                        }}>Card Holder Name</div>
                        <div style={{
                            display: 'flex',
                            borderBottom: '1px solid #E0A24E',
                        }}>
                            <input style={{
                                fontSize: '18px',
                                color: 'white',
                                width: '100%',
                                padding: '10px 5px',
                                background: 'none'
                            }}
                                value={owner}
                                onChange={(e) => { setOwner(e.target.value) }}
                                placeholder="Full name"
                            />
                        </div>
                        <div
                            onClick={handleSave}
                            style={{
                                padding: '10px 0',
                                background: "#E0A24E",
                                zIndex: 2,
                                marginTop: '15px',
                                color: 'white',
                                borderRadius: '15px',
                                width: '100%',
                                textAlign: 'center'
                            }}>Save Card</div>
                    </div>

            }
        </>
    )
}

export default CardInput