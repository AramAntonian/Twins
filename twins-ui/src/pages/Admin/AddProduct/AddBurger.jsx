import { useEffect, useRef, useState } from "react"
import add from '../../../components/svg/add_gray.svg'
import AddIngredients from "./AddIngredients"
import { useNavigate } from "react-router"

function AddBurger({ product }) {
    const [photo, setPhoto] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [page, setPage] = useState('burger')
    const inpRef = useRef(null)
    const [ingredients, setIngredients] = useState({})
    const [ingList, setIngList] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        setIngList([])
        for (let key in ingredients) {
            if (!isNaN(+key) && ingredients[key]) {
                console.log(+key);
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
                        setIngList((prev) => {
                            prev.push(data.data)
                            return [...prev]
                        })
                    }
                })()
            }
        }

    }, [ingredients])

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

    function handleSave() {
        if (name && price && photo) {
            (async function () {
                const ings = []
                for (let el of ingList) {
                    ings.push(el.id)
                }
                const body = { name, price, photo, ingredients: ings, type: product }
                const res = await fetch('http://localhost:3002/product', {
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
                    navigate('/menu')
                }
            })()
        } else {
            alert('add photo or name or price')
        }

    }

    return (
        <>
            {
                page === 'burger' ?
                    <div style={{
                        padding: '200px 50px'
                    }}>
                        <div style={{
                            display: 'flex',
                            gap: '100px',
                            padding: '20px 0',
                            width: '100%',
                            borderBottom: '1px solid #E0A24E',
                            position: 'relative'
                        }}>
                            <div
                                onClick={() => { inpRef.current.click() }}
                                style={{
                                    width: '250px',
                                    height: "250px",
                                    borderRadius: '30px',
                                    background: photo ? 'white' : '#D9D9D9',
                                    cursor: 'pointer',
                                    color: '#A3A3A3',
                                    display: 'flex',
                                    fontSize: '38px',
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>{!photo ? 'Click to add image' : <img src={photo} alt='burger' style={{
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                }} />}</div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '30px',
                                marginTop: " 10px"
                            }}>
                                <input value={name} onChange={(e) => setName(e.target.value)} style={{ fontWeight: "600", fontSize: '28px', background: 'none' }} placeholder="Add product name" />
                                <input value={price} onChange={(e) => setPrice(e.target.value)} style={{ fontSize: '22px', background: 'none' }} placeholder="add product price" />
                            </div>
                            <div>
                                <div
                                    onClick={handleSave}
                                    style={{
                                        width: '150px',
                                        padding: '10px',
                                        textAlign: 'center',
                                        color: 'white',
                                        background: '#AD1C23',
                                        borderRadius: '30px',
                                        position: 'absolute',
                                        bottom: '20px',
                                        cursor: 'pointer',
                                        fontSize: '24px',
                                        right: '100px'
                                    }}>Save</div>
                            </div>
                        </div>
                        <div>
                            <div style={{
                                width: '100%',
                                textAlign: 'center',
                                fontSize: '28px',
                                fontWeight: '600'
                            }}>Ingredients</div>
                            <div style={{
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '30px'
                            }}>
                                {
                                    ingList.map((el, idx) => (
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '10px',
                                            marginTop: '20px'
                                        }}>
                                            <img src={el.src} alt={el.name} width={80} height={80} />
                                            <div>{el.name}</div>
                                        </div>
                                    ))
                                }
                                <img src={add} alt='add'
                                    onClick={() => { setPage('ingredients') }}
                                    style={{
                                        cursor: 'pointer'
                                    }} />
                            </div>
                        </div>
                        <input
                            type="file"
                            style={{
                                display: 'none'
                            }}
                            ref={inpRef}
                            onChange={(e) => { handlePhotoAdd(e) }}
                        />
                    </div >
                    : <AddIngredients setPage={setPage} setIngredients={setIngredients} ingredients={ingredients} />
            }
        </>
    )
}

export default AddBurger