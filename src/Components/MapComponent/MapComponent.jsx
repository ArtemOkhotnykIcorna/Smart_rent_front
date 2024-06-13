import React, {useEffect, useState} from 'react';

import Map,{Marker} from 'react-map-gl';
import Pin from '../Pin/Pin'
import './mapcomponent.scss'

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYXJ0ZW1va2hvdG55ayIsImEiOiJjbHhhbmJ0bjAzNXpvMmtxc21lc3ZrcDl1In0.wVDbNf3FcPy754j0z9wixQ'
const MapComponent = () => {
    const [latitude,setLatitude] = useState('')
    const [longitude,setLongitude] = useState('')
    const [theme,setTheme] = useState(true)
    const [error,setError] = useState(false)


    const initialViewState = {
        longitude: longitude,
        latitude: latitude,
        zoom: 15,
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
        touchZoomRotate: true,
        touchPitch: true,
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

        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleThemeChange = (event) => {
            setTheme(event.matches);
        };

        darkModeMediaQuery.addEventListener('change', handleThemeChange);


        setTheme(darkModeMediaQuery.matches);

        return () => {
            darkModeMediaQuery.removeEventListener('change', handleThemeChange);
        };
    }, []);


    return (
                <>
                    {latitude && longitude && !error  ? <Map
                            mapboxAccessToken={MAPBOX_TOKEN}
                            initialViewState={initialViewState}
                            mapStyle={"mapbox://styles/mapbox/satellite-streets-v11"}
                            {...settings}
                        >
                            <Marker longitude={longitude} latitude={latitude}/>
                        </Map> :
                        <h1 className='error'>allow see your location or turn of vpn</h1>}
                </>
    );
};

export default MapComponent;