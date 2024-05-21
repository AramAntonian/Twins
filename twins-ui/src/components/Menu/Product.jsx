import { useEffect, useRef, useState } from 'react'
import busket from '../svg/red_busket.svg'
import { Modal } from '@mui/material'

function Product({ name, price, src, id, setFlag }) {
    const [quantity, setQuantity] = useState(1)
    const [hover, setHover] = useState(false)
    const [user, setUser] = useState({})
    const [open, setOpen] = useState(false)
    const [nameInp, setNameInp] = useState(name)
    const [priceInp, setPriceInp] = useState(parseInt(price))
    const [photo, setPhoto] = useState(src)
    const inpRef = useRef(null)

    function handlePhotoAdd(e) {
        if (e.target?.files && e.target.files.length > 0) {
            const reader = new FileReader()
            reader.onload = (event) => {
                if (inpRef.current) {
                    inpRef.current.value = ''
                }
                setPhoto(event.target?.result)
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }


    useEffect(() => {
        (async function () {
            const res = localStorage.getItem('USER')
            if (res) {
                const data = await JSON.parse(res)
                setUser(data)
            }
        })()
    }, [])

    function handleBusketAdd() {
        (async function () {
            const body = { productId: id, userId: user.id, count: quantity }
            const res = await fetch('http://localhost:3002/busket', {
                headers: {
                    "Content-Type": 'application/json',
                },
                method: 'PUT',
                body: JSON.stringify(body)
            })
            const data = await res.json()
            if (data.error) {
                alert(data.error)
            } else {
                alert('added')
            }
        })()
    }

    function handleEdit() {
        if (nameInp && priceInp) {
            (async function () {
                const body = { name: nameInp, price: priceInp, photo, id }
                const res = await fetch('http://localhost:3002/product/edit', {
                    headers: {
                        "Content-Type": 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify(body)
                })
                const data = await res.json()
                if (data.error) {
                    alert(data.error)
                } else {
                    setFlag(prev => !prev)
                    setOpen(false)
                }
            })()
        }
    }


    function add() {
        setQuantity(prev => prev + 1)
    }

    function remove() {
        setQuantity(prev => prev === 1 ? prev : prev - 1)
    }

    function handleClick() {
        if (!user.fullName?.includes('ADMIN')) {
            window.location.href = '/menu/burger/' + name
        } else {
            setOpen(true)
        }
    }

    return (
        <>
            <div
                onMouseEnter={() => { setHover(true) }}
                onMouseLeave={() => { setHover(false) }}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid #E0A24E',
                    borderRadius: '50px',
                    width: 'fit-content',
                    padding: '15px',
                    gap: '10px',
                    boxShadow: hover ? '1px 5px 72px -17px rgba(255,0,0,1)' : '',
                    transitionDuration: '0.5s',
                    alignItems: 'center'
                }}>
                <img src={src} alt='burger' width={200} height={200}
                    onClick={handleClick}
                />
                <div
                    onClick={handleClick}
                    style={{
                        fontSize: '22px'
                    }}>{name}</div>
                <div
                    onClick={handleClick}
                    style={{
                        fontSize: '18px'
                    }}>{price}</div>
                <div style={{
                    width: '100%',
                    display: user.fullName?.includes('ADMIN') ? 'none' : 'flex',
                    justifyContent: 'space-between'
                }}>
                    <div style={{
                        display: 'flex',
                        gap: '5px',
                        alignItems: 'center'
                    }}>
                        <div
                            onClick={remove}
                            style={{
                                padding: "5px 0px",
                                width: '25px',
                                border: '1px solid #E0A24E',
                                display: 'flex',
                                borderRadius: '10px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer'
                            }}>-</div>
                        <div>{quantity}</div>
                        <div
                            onClick={add}
                            style={{
                                padding: "5px 0px",
                                width: '25px',
                                border: '1px solid #E0A24E',
                                display: 'flex',
                                borderRadius: '10px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer'
                            }}>+</div>
                    </div>
                    <img src={busket} alt='busket'
                        onClick={handleBusketAdd}
                        style={{
                            cursor: 'pointer'
                        }} />
                </div>
            </div>
            <Modal
                open={open}
                onClose={() => { setOpen(false) }}
                disableAutoFocus
                disableEnforceFocus
            >
                <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%,-50%)'
                }}>
                    <div
                        onClick={handleClick}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            border: '1px solid #E0A24E',
                            borderRadius: '50px',
                            width: 'fit-content',
                            padding: '15px',
                            background: 'white',
                            gap: '10px',
                            boxShadow: hover ? '1px 5px 72px -17px rgba(255,0,0,1)' : '',
                            transitionDuration: '0.5s',
                            alignItems: 'center'
                        }}>
                        <img src={photo} alt='burger' width={200} height={200} style={{
                            cursor: 'pointer'
                        }} onClick={() => { inpRef.current.click() }} />
                        <input style={{
                            fontSize: '22px',
                            textAlign: 'center'
                        }} value={nameInp} onChange={(e) => { setNameInp(e.target.value) }} />
                        <input style={{
                            fontSize: '22px',
                            textAlign: 'center'
                        }} value={priceInp} onChange={(e) => { setPriceInp(e.target.value) }} />
                        <div
                            onClick={handleEdit}
                            style={{
                                width: '150px',
                                padding: '10px',
                                textAlign: 'center',
                                color: 'white',
                                background: '#AD1C23',
                                borderRadius: '30px',
                                top: '120px',
                                cursor: 'pointer',
                                fontSize: '24px',
                                right: '10px'
                            }}>Save</div>

                    </div>
                </div>
            </Modal >
            <input
                type="file"
                style={{
                    display: 'none'
                }}
                ref={inpRef}
                onChange={(e) => { handlePhotoAdd(e) }}
            />
        </>
    )
}

export default Product