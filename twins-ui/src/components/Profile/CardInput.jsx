const { useState } = require("react")

function CardInput() {
    const [number, setNumbers] = useState('')

    return (
        <input style={{
            fontSize: '28px',
            color: 'white',
            width: '100%',
            borderBottom: '1px solid #E0A24E',
            padding: '10px 5px',
            background: 'none'
        }}
            placeholder='0000 0000 0000 0000'
            value={number}
            onChange={(e) => { setNumbers(e.target.value) }}
        />
    )
}

export default CardInput