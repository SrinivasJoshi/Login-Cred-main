import React, { useRef, useEffect, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Colleges from "../config/mapData.json";
import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken =
    "pk.eyJ1IjoiYW5raXRoZWRhdSIsImEiOiJja25laW55OWkwNG4xMnFtZWNlaDByenlkIn0.FS66b1cyMaXgEuFp2n-pXQ";
let map = 0;
const SearchMap = () => {
    const mapContainer = useRef();
    const [lng, setLng] = useState(73.84019046231893);
    const [lat, setLat] = useState(18.543700012150676);
    const [zoom, setZoom] = useState(15);
    const [info, setInfo] = useState("");
    const colleges = Colleges.colleges;

    useEffect(() => {
        map = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/ankithedau/ckneufcuh1heg17nysmy32try",
            center: [lng, lat],
            zoom: zoom,
        });
        const marker1 = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
        // reverse geocoding
        async function getAddress(ll, lt) {
            const res = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${ll},${lt}.json?access_token=pk.eyJ1Ijoic3Jpbml2YXMtam9zaGkiLCJhIjoiY2tuZWs2amRqMDd0dDJva2JuYXpuampwZSJ9.--kqGxv8dVeg3u9TVohX9Q`
            );
            const data = await res.json();
            setInfo(data.features[0].place_name);
        }
        getAddress(lng, lat);
        return () => map.remove();
    }, [lat, lng]);

    useEffect(() => {
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
            async function getAddress(ll, lt) {
                const res = await fetch(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${ll},${lt}.json?access_token=pk.eyJ1Ijoic3Jpbml2YXMtam9zaGkiLCJhIjoiY2tuZWs2amRqMDd0dDJva2JuYXpuampwZSJ9.--kqGxv8dVeg3u9TVohX9Q`
                );
                const data = await res.json();
                setInfo(data.features[0].place_name);
            }

            const tempLng = e.lngLat.lng;
            const tempLat = e.lngLat.lat;
            getAddress(tempLng, tempLat);

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
    }, []);

    const handleOnSelect = (item) => {
        // the item selected
        setLat(item.lat);
        setLng(item.lon);
    };

    return (
        <div className="map-container">
            <div className="customSearch">
                <div className="map-search" ref={mapContainer} />
            </div>
            <div className="SearchInput">
                <ReactSearchAutocomplete
                    items={colleges}
                    onSelect={handleOnSelect}
                    // necessary, otherwise the results will be blank
                    resultStringKeyName="name"
                />
            </div>
            <div className="college-info">
                <p>{info}</p>
            </div>
        </div>
    );
};

export default SearchMap;
