import { useEffect, useRef, useState } from 'react'
import busket from '../svg/red_busket.svg'
import { Modal } from '@mui/material'
import addBu from '../svg/add.svg'
import AddIngredients from '../../pages/Admin/AddProduct/AddIngredients'


function Product({ name, price, src, id, setFlag, ingredients, type }) {
    const [quantity, setQuantity] = useState(1)
    const [hover, setHover] = useState(false)
    const [user, setUser] = useState({})
    const [open, setOpen] = useState(false)
    const [nameInp, setNameInp] = useState(name)
    const [priceInp, setPriceInp] = useState(parseInt(price))
    const [photo, setPhoto] = useState(src)
    const inpRef = useRef(null)
    const [page, setPage] = useState('burger')
    const [ingredientsList, setIngredientsList] = useState([])
    const [newList, setNewList] = useState({})
    const [deleteModal, setDelete] = useState(false)
    const [deleteVal, setDeleteVal] = useState('')


    useEffect(() => {
        setIngredientsList([])
        if(ingredients)
        for (let el of ingredients) {
            if (el) {
                (async function () {
                    const body = { id: +el }
                    const res = await fetch('http://localhost:3002/ingredient', {
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
                        setIngredientsList((prev) => {
                            prev.push(data.data)
                            return [...prev]
                        })
                    }
                })()
            }
        }
        setIngredientsList(prev => prev.filter(el => el))
    }, [ingredients])

    useEffect(() => {
        for (let key in newList) {
            if (newList[key] === true) {
                (async function () {
                    const body = { id: +key }
                    const res = await fetch('http://localhost:3002/ingredient', {
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
                        setIngredientsList((prev) => {
                            prev.push(data.data)
                            return [...prev]
                        })
                    }
                })()
            }
        }
        setIngredientsList(prev => prev.filter(el => el))
    }, [newList])

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
                const ings = []
                for (let el of ingredientsList) {
                    if (el?.id) {
                        ings.push(el.id)
                    }
                }
                const body = { name: nameInp, price: parseInt(priceInp), photo, id, ingredients: ings }
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


    function handleDeleteProd() {
        if (deleteVal === name) {
            (async function () {
                const body = { id }
                const res = await fetch('http://localhost:3002/product', {
                    headers: {
                        "Content-Type": 'application/json',
                    },
                    method: 'DELETE',
                    body: JSON.stringify(body)
                })
                const data = await res.json()
                if (data.error) {
                    alert(data.error)
                } else {
                    setFlag(prev => !prev)
                }
            })()
        } else {
            alert('type name correctly')
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
            setIngredientsList([])
            for (let el of ingredients) {
                (async function () {
                    const body = { id: el }

                    const res = await fetch('http://localhost:3002/ingredient', {
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
                        setIngredientsList(prev => {
                            prev.push(data.data)
                            return [...prev]
                        })
                    }
                })()
            }
        }
    }

    function handleDelete(id) {
        setIngredientsList(prev => prev.filter(el => el.id !== id))
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
                    position: 'relative',
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
                <div
                    onClick={() => { setDelete(true) }}
                    style={{
                        fontSize: '28px',
                        color: "#AD1C23",
                        fontWeight: '200',
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        transitionDuration: '0.5s',
                        cursor: 'pointer',
                        display: !user.fullName?.includes('ADMIN') ? 'none' : 'block',
                        fontFamily: 'Roboto, sans-serif'
                    }}>x</div>
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
                {
                    page === 'burger' ?
                        <div style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            width: "50%",
                            background: 'white',
                            border: '1px solid #E0A24E',
                            borderRadius: '50px',
                            transform: 'translate(-50%,-50%)'
                        }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
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
                            </div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginTop: '30px',
                                padding: '50px',
                                gap: "20px",
                                borderTop: '1px solid #E0A24E'
                            }}>
                                <div style={{
                                    textAlingn: 'center',
                                    fontSize: '28px',
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}>Ingredients</div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    gap: "15px"
                                }}>
                                    {
                                        ingredientsList.map((el, idx) => (
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                position: 'relative',
                                                width: '120px',
                                                height: "130px",
                                                justifyContent: 'center'
                                            }}>
                                                <img src={el?.src} alt={el?.name} width={100} />
                                                <div>{el?.name}</div>
                                                <div
                                                    onClick={() => { handleDelete(el.id) }}
                                                    style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        right: 0,
                                                        color: "#AD1C23",
                                                        fontWeight: '200',
                                                        cursor: 'pointer',
                                                        fontFamily: 'Roboto, sans-serif'
                                                    }}>x</div>
                                            </div>
                                        ))
                                    }
                                    <img src={addBu} alt='add'
                                        onClick={() => { setPage('ingredients') }}
                                        style={{
                                            cursor: 'pointer'
                                        }} />
                                </div>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginBottom: '30px',
                                marginRight: '30px'
                            }}>
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
                        :
                        <div style={{
                            width: '70%',
                            position: 'relative',
                            top: '50%',
                            left: "50%",
                            background: 'white',
                            transform: 'translate(-50%, -50%)',
                            display: 'flex',
                            padding: '0 50px',
                            minHeight: '500px',

                        }}>
                            <AddIngredients setIngredients={setNewList} setPage={setPage} addBoo={true} />
                        </div>
                }
            </Modal >
            <Modal
                open={deleteModal}
                onClose={() => { setDelete(false) }}
            >
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'white',
                    width: '40%',
                    padding: "30px",
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '15px'
                }}>
                    <div>Type name of product to delete "{name}"</div>
                    <div style={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center'
                    }}>
                        <input value={deleteVal} onChange={(e) => { setDeleteVal(e.target.value) }} style={{
                            border: `1px solid ${deleteVal === name ? 'green' : '#AD1C23'}`,
                            padding: '5px'
                        }} />
                        <div
                            onClick={handleDeleteProd}
                            style={{
                                cursor: 'pointer',
                                color: 'white',
                                padding: ' 5px',
                                background: deleteVal === name ? 'green' : '#AD1C23'
                            }}>confirm</div>
                    </div>
                </div>
            </Modal>
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