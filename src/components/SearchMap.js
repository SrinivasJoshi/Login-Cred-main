import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken ="pk.eyJ1IjoiYW5raXRoZWRhdSIsImEiOiJja25laW55OWkwNG4xMnFtZWNlaDByenlkIn0.FS66b1cyMaXgEuFp2n-pXQ";

const SearchMap = () => {
    const mapContainer = useRef();
    const [lng, setLng] = useState(73.856255);
    const [lat, setLat] = useState(18.516726);
    const [zoom, setZoom] = useState(6);
    const [mapSeen, setMapSeen] = useState(false);
    const [search, setSearch] = useState('');
    let [info, setInfo] = useState('')

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
        map.on("click", function (e) {
            var features = map.queryRenderedFeatures(e.point, {
                layers: ["citoto"],
            });

            if (!features.length) {
                return;
            }
            // reverse geocoding
            async function getAddress(ll,lt){
                const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${ll},${lt}.json?access_token=pk.eyJ1Ijoic3Jpbml2YXMtam9zaGkiLCJhIjoiY2tuZWs2amRqMDd0dDJva2JuYXpuampwZSJ9.--kqGxv8dVeg3u9TVohX9Q`)   
                const data = await res.json();
                setInfo(data.features[0].place_name)
                }
            
            const tempLng = e.lngLat.lng;
            const tempLat = e.lngLat.lat;
            getAddress(tempLng,tempLat);

            var feature = features[0];
            var popup = new mapboxgl.Popup({ offset: [0, -15] })
                .setLngLat(feature.geometry.coordinates)
                .setHTML(
                    "<h3>" +
                        feature.properties.title +
                        "</h3><p>" +
                        feature.properties.description +
                        "</p>"
                )
                .addTo(map);
        });

        return () => map.remove();
    }, []);


    return (
        <div className="SearchMap">
            <div className="SearchInput">
                <input type="text" placeholder="College Address"/>
                <button type="submit">Submit</button>
            </div>
            
            (<div className="customSearch">
                <div className="map-search" ref={mapContainer} />
            </div>)
            <div className="side-info">
                <p>{info}</p>
            </div>
        </div>
    );
};

export default SearchMap;
