import React, {useCallback, useEffect, useState} from 'react';
import Map, {GeolocateControl, Marker, ScaleControl} from 'react-map-gl';
import './mapcomponent.scss'
import {getSitiesByName, getSityByCoordination} from "../../Service/service";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN
const MapComponent = () => {
    const [latitude,setLatitude] = useState('')
    const [longitude,setLongitude] = useState('')
    const [error,setError] = useState(false)
    const [userSity,setUserSity] = useState('')
    const [houses,setHouses] = useState([])
    const [limit,setLimit] = useState(200)
    const [offset,setOffset] = useState(0)

    const initialViewState = {
        longitude: longitude,
        latitude: latitude,
        zoom: 12,
        bearing: 0,
        pitch: 50
    };

    const [settings, setSettings] = useState({
        scrollZoom: true,
        boxZoom: true,
        dragRotate: true,
        dragPan: true,
        keyboard: true,
        doubleClickZoom: true,
        touchZoomRotate: false,
        touchPitch: false,
        minZoom: 0,
        maxZoom: 20,
        minPitch: 0,
        maxPitch: 85,
        width: '100vw',
        height: '100%'
    });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                    setError(false);

                    getSityByCoordination(position.coords.latitude, position.coords.longitude)
                        .then(r => setUserSity(r.address.city || r.address.town || r.address.village || r.address.hamlet))
                },
                function(error) {
                    setError(true);
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            console.log("User denied the request for Geolocation.");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            console.log("Location information is unavailable.");
                            break;
                        case error.TIMEOUT:
                            console.log("The request to get user location timed out.");
                            break;
                        case error.UNKNOWN_ERROR:
                            console.log("An unknown error occurred.");
                            break;
                    }
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);



    const onResizeMap = useCallback((e) => {
          // console.log(e)
        getSityByCoordination(e.lngLat.lat, e.lngLat.lng)
            .then(r => setUserSity(r.address.city || r.address.town || r.address.village || r.address.hamlet))
    }, []);
    
    // const HOOOK = useCallback((e) => {
    //       console.log(e)
    // }, []);


    useEffect(() => {
        // console.log(userSity);

        if (userSity) {
            getSitiesByName(userSity, limit, offset)
                .then(r => {
                    console.log(r)
                     setHouses(prevHouses => [...prevHouses, ...r.houses]);
                });
        }
    }, [userSity]);


    // const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    return (
                <>
                    {latitude && longitude && !error  ?
                        <Map
                            mapboxAccessToken={MAPBOX_TOKEN}
                            initialViewState={initialViewState}
                            // mapStyle={"mapbox://styles/mapbox/satellite-streets-v11"}
                            mapStyle={"mapbox://styles/mapbox/dark-v9"}
                            onTouchStart={onResizeMap}
                            onMouseDown={ onResizeMap}
                            // onDrag={HOOOK}
                            {...settings}
                        >
                            {houses.map(house => (
                                <Marker
                                    key={house._id}
                                    longitude={house.latitude}
                                    latitude={house.longitude}
                                />
                            ))}
                            <ScaleControl />
                        </Map> :
                        <h1 className='error'>allow see your location or turn of vpn</h1>}
                </>
    );
};

export default MapComponent;