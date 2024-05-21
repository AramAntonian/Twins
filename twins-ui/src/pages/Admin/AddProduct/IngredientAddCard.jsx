import { useRef, useState } from 'react'
import def_picture from '../../../components/svg/picture.svg'

function IngredientAddCard({ setFlag }) {
    const [name, setName] = useState('')
    const [photo, setPhoto] = useState('')
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

    function handleSave() {
        if (name && photo) {
            (async function () {
                const body = { name, photo }
                const res = await fetch('http://localhost:3002/ingredient', {
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
                    setPhoto('')
                    setName('')
                    setFlag(prev => !prev)
                }
            })()
        } else {
            alert('invalid image or ingredient name')
        }
    }

    return (
        <div
            style={{
                width: '250px',
                height: '300px',
                border: "2px solid #E0A24E",
                borderRadius: '50px',
                background: 'white',
                padding: '30px 10px',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                transitionDuration: "0.5s",
                gap: '10px',
                justifyContent: 'space-between'
            }}>
            <div
                onClick={() => { inpRef.current.click() }}
                style={{
                    border: '1px solid #AD1C23',
                    width: '100px',
                    height: '100px',
                    display: 'flex',
                    transitionDuration: '0.5s',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                <img src={photo ? photo : def_picture} alt='pictur' width={!photo ? 50 : 100} style={{ backgroundSize: 'cover', transitionDuration: '0.5s' }} />
                {
                    photo ? null :
                        <div style={{
                            color: '#A3A3A3',
                            textAlign: 'center'
                        }}>Click to add<br />image</div>
                }
            </div>
            <input value={name} onChange={(e) => setName(e.target.value)} style={{
                fontWeight: "600",
                fontSize: '18px',
                background: 'none',
                textAlign: 'center',
                transitionDuration: '0.5s'
            }} placeholder="Add ingredient name" />
            <div
                onClick={handleSave}
                style={{
                    width: '50px',
                    padding: '10px',
                    textAlign: 'center',
                    color: 'white',
                    background: '#AD1C23',
                    borderRadius: '30px',
                    cursor: 'pointer',
                    transitionDuration: '0.5s',
                    fontSize: '18px',
                }}>Save</div>
            <input
                type="file"
                style={{
                    display: 'none'
                }}
                ref={inpRef}
                onChange={(e) => { handlePhotoAdd(e) }}
            />
        </div>
    )
}

export default IngredientAddCard