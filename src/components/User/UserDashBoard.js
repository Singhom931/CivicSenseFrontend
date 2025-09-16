import React, { useEffect, useState, useCallback  } from 'react';
import {createRoot} from "react-dom/client";
import {APIProvider, Map, MapCameraChangedEvent, useMap, Marker } from '@vis.gl/react-google-maps';

function MapWithControls() {
  const map = useMap();
  const [location, setLocation] = useState(null);      // {lat, lng}
  const [accuracy, setAccuracy] = useState(0);         // optional

  const [reportMode, setReportMode] = useState(false);
  const [tempMarker, setTempMarker] = useState(null); // {lat, lng} when user clicks
  const [showForm, setShowForm] = useState(false);

  const handleMapClick = (event) => {
    if (!reportMode) return;
    const { lat, lng } = event.detail.latLng;
    setTempMarker({ lat, lng });
  };

  const mapStyle = [
    {
        featureType: "poi",   // all points of interest
        elementType: "labels", 
        stylers: [{ visibility: "off" }],
    },
    {
        featureType: "transit",  // bus stops, train stations etc
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }],
    }
  ];

  const handleLocateMe = useCallback(() => {
    if (!map) return; // still null until map loads

    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude, accuracy } = pos.coords;
      const loc = { lat: latitude, lng: longitude };
      setLocation(loc);
      setAccuracy(accuracy);
      map.panTo(loc);
      map.setZoom(14);
    },
      (err) => console.error(err),
      { enableHighAccuracy: true });
  }, [map]);

  return (
    <div>
        {reportMode && (
        <div
            style={{
            position: "absolute",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(255,255,255,0.9)",
            padding: "8px 16px",
            borderRadius: "6px",
            zIndex: 10,
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }}
        >
            Select area with issue
        </div>
    )}
      <Map
        style={{ width: '100vw', height: '100vh' }}
        defaultCenter={{ lat: 23.6913, lng: 85.2722 }}
        defaultZoom={6}
        onClick={handleMapClick}
        options={{
            styles: mapStyle,    // 👈 hides POI icons
            disableDefaultUI: false, // keep zoom controls etc
        }}
      />
      {tempMarker && (
          <Marker
            position={tempMarker}
            draggable
            onDragEnd={(e) => {
              const { lat, lng } = e.detail.latLng;
              setTempMarker({ lat, lng });
            }}
          />
        )}
      {location && ( 
        <Marker
        position={location}
        icon={{
            path: 0,
            scale: 8,
            fillColor: "#4285F4",
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: "white",
        }}
        />
      )}
      {!reportMode && (
        <button
          style={{
            position: "absolute",
            top: "10px",
            right: "60px",
            padding: "10px 16px",
            backgroundColor: "#d22519ff",
            color: "white",
            border: "none",
            borderRadius: "16px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            boxShadow: "0px 2px 6px rgba(0,0,0,0.2)"
          }}
          onClick={() => setReportMode(true)}
        >Report an Issue</button>
      )}
      {reportMode && tempMarker && !showForm && (
        <button
          onClick={() => setShowForm(true)}
          style={{
            position: "absolute",
            top: "60px",
            right: "20px",
            padding: "10px 16px",
            background: "#388e3c",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          Select Location
        </button>
      )}
      {showForm && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 20,
          }}
        >
          <div
            style={{
              width: "400px",
              height: "300px",
              background: "white",
              borderRadius: "8px",
              padding: "20px",
            }}
          >
            {/* Form content will go here */}
          </div>
        </div>
      )}
      <button
            style={{
            position: "absolute",
            bottom: "20px",
            right: "60px",
            padding: "10px 16px",
            backgroundColor: "#388e3c",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0px 2px 6px rgba(0,0,0,0.2)"
            }}
            onClick={handleLocateMe}
        >
        📍 Locate Me
    </button>
    </div>
  );
}
const UserDashBoard = () => {
  const [center, setCenter] = useState({ lat: 23.6913, lng: 85.2722 });
  const [zoom, setZoom] = useState(7);

  return (
  <APIProvider apiKey={'AIzaSyAp1DBQN_zl5xbHWxECa50MGR4IputFHgY'} onLoad={() => console.log('Maps API has loaded.')}>
   <div style={{width: "100vw", height: "100vh"}}>
   {/* <Map
      mapId="main-map"
      defaultZoom={zoom}
      defaultCenter={center}
      onCameraChanged={ (ev: MapCameraChangedEvent) =>
        console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
      }>
   </Map> */}
   <MapWithControls />
   </div>
   
  </APIProvider>
)
};

// const root = createRoot(document.getElementById('map'));
// root.render(<UserDashBoard />);

export default UserDashBoard