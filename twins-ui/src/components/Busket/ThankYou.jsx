function ThankYou() {

    return (
        <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '20px',
            textAlign: 'center',
            justifyContent: 'center'
        }}>
            <div style={{
                position: 'absolute',
                opacity: 0.8,
                filter: 'blur(20px)',
                width: '100%',
                height: '100%',
                top: '-40px',
                borderRadius: '20px',
                left: '-100px',
                background: 'white',
                zIndex: 1
            }} />
            <span style={{
                zIndex: 2,
                textAlign: 'center',
                marginRight: '150px',
                fontSize: '128px',
                color: '#AD1C23',
            }}>
                Thank you
            </span>
        </div>
    )
}

export default ThankYou