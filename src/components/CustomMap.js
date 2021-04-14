import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken =
    "pk.eyJ1IjoiYW5raXRoZWRhdSIsImEiOiJja25laW55OWkwNG4xMnFtZWNlaDByenlkIn0.FS66b1cyMaXgEuFp2n-pXQ";

const CustomMap = () => {
    const mapContainer = useRef();
    const [lng, setLng] = useState(73.856255);
    const [lat, setLat] = useState(18.516726);
    const [zoom, setZoom] = useState(6);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/ankithedau/ckneufcuh1heg17nysmy32try",
            center: [lng, lat],
            zoom: zoom,
        });

        map.on("move", () => {
            setLng(map.getCenter().lng.toFixed(6));
            setLat(map.getCenter().lat.toFixed(6));
            setZoom(map.getZoom().toFixed(2));
        });

        return () => map.remove();
    }, []);

    return (
        <div>
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div className="map-container" ref={mapContainer} />
        </div>
    );
};

export default CustomMap;
