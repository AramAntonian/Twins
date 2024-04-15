import React from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";



function Map() {
    const ref = React.useRef(null);
    const [map, setMap] = React.useState();

    React.useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {}));
        }
        console.log(ref.current,map);
    }, [ref, map]);
    
    const render = (status) => {
        return <h1>{status}</h1>;
    };
    return (

        <Wrapper apiKey={"AIzaSyCVwzPEByWYqy4pEbp0kffELM3yoJe9u2k"} render={() =>  render(Status)} >
            <div ref = {ref}>a</div>
        </Wrapper>

    )
}

export default Map;