import React, { useEffect, useState, useCallback  } from 'react';
import {createRoot} from "react-dom/client";
import {APIProvider, Map, MapCameraChangedEvent, useMap, Marker } from '@vis.gl/react-google-maps';
import Navigation from '../../pages/Navigation';
import Footer from '../../pages/Footer';

const issuesList = [
  { label: "🕳️ Pothole", value: "pothole" },
  { label: "🗑️ Garbage", value: "garbage" },
  { label: "🛣️ Broken Road", value: "broken_road" },
  { label: "🌳 Overgrown Tree", value: "overgrown_tree" },
  { label: "💡 Faulty Street Light", value: "street_light" },
  { label: "💧 Drainage Issue", value: "drainage" },
  { label: "🚽 Sewage Issue", value: "sewage" },
];

const issueEmojis = {
  pothole: "🕳️",
  garbage: "🗑️",
  broken_road: "🛣️",
  overgrown_tree: "🌳",
  street_light: "💡",
  drainage: "💧",
  sewage: "🚽",
};

function MapWithControls() {
  const map = useMap();
  const [location, setLocation] = useState(null);      // {lat, lng}
  const [accuracy, setAccuracy] = useState(0);         // optional

  const [reportMode, setReportMode] = useState(false);
  const [tempMarker, setTempMarker] = useState(null); // {lat, lng} when user clicks
  const [showForm, setShowForm] = useState(false);

  const [selectedIssue, setSelectedIssue] = useState(""); // form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [reports, setReports] = useState([]);

  // Fetch reports from backend on load
  useEffect(() => {
    fetch("http://localhost:8000/reports")  // your FastAPI backend
      .then((res) => res.json())
      .then((data) => setReports(data))
      .catch((err) => console.error("Error fetching reports:", err));
  }, []);

  const handleMapClick = (event) => {
    if (!reportMode) return;
    const { lat, lng } = event.detail.latLng;
    setTempMarker({ lat, lng });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tempMarker || !selectedIssue || !title || !imageFile) {
      alert("Please fill all required fields: Location, Issue, Title, and Image.");
      return;
    }
  
    const reportData = new FormData();
    reportData.append("latitude", tempMarker.lat);
    reportData.append("longitude", tempMarker.lng);
    reportData.append("issue", selectedIssue);
    reportData.append("title", title);
    reportData.append("description", description);
    reportData.append("image", imageFile); // file

    try {
    const response = await fetch("http://localhost:8000/reports", {
      method: "POST",
      body: reportData,
    });

    if (!response.ok) throw new Error("Failed to submit report");

    const data = await response.json();
    console.log("Server response:", data);

    alert("Report submitted successfully!");

    // Reset form
    setShowForm(false);
    setReportMode(false);
    setTempMarker(null);
    setSelectedIssue("");
    setTitle("");
    setDescription("");
    setImageFile(null);

  } catch (error) {
    console.error("Error submitting report:", error);
    alert("Error submitting report. Please try again.");
  }
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
      <Navigation/>
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
        }}>
        {reports.map((report) => (
        <Marker
          key={report.id}
          position={{
            lat: parseFloat(report.latitude),
            lng: parseFloat(report.longitude),
          }}
          icon={{
            path: window.google.maps.SymbolPath.CIRCLE, // circle
            fillColor: "#797575ff",      // white fill
            fillOpacity: 1,
            strokeColor: "#e53935",    // red border
            strokeWeight: 3,            // thickness of the border
            scale: 20,                  // radius of the circle in pixels
            }}
          label={{
            text: issueEmojis[report.issue] || "❗",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            }}
        />
      ))}
      </Map>

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
            top: "95px",
            right: "40px",
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
            top: "95px",
            right: "40px",
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
          <form
            onSubmit={handleSubmit}
            style={{
              width: "400px",
              background: "white",
              borderRadius: "8px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <h3 className='peer-focus:border-blue-500'>Report Issue</h3>
            <div className='border-2'>
              <label>Selected Location:</label>
              <div  style={{ marginTop: "4px" }}>
                {tempMarker.lat.toFixed(5)}, {tempMarker.lng.toFixed(5)}
              </div>
            </div>

            <div>
              <label>Issue:</label>
              <select
                value={selectedIssue}
                onChange={(e) => setSelectedIssue(e.target.value)}
                style={{ width: "100%", padding: "8px", marginTop: "4px" }}
              >
                <option value="" className='border-2'>-- Select Issue --</option>
                {issuesList.map((issue) => (
                  <option key={issue.value} value={issue.value}>
                    {issue.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Title:</label>
              <input
                className='border-2  focus:outline-none focus:border-blue-500'
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a short title"
                style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                required
              />
            </div>

            <div>
              <label >Description:</label>
              <textarea
              className='border-2'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description (optional)"
                style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                rows={3}
              />
            </div>

            <div>
              <label>Upload Image:</label>
              <div style={{ marginTop: "4px", position: "relative" }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  required
                  style={{
                    opacity: 0,
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                  }}
                />
                <div
                  style={{
                    border: "2px dashed #888",
                    borderRadius: "6px",
                    padding: "12px",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  {imageFile ? imageFile.name : "Click or drag image here"}
                </div>
              </div>
            </div>

            <button
              type="submit"
              style={{
                padding: "10px",
                background: "#4285F4",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Submit
            </button>
          </form>
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
    <div>
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
   <Footer/>
   </div>
   
  </APIProvider>
  </div>
)
};

// const root = createRoot(document.getElementById('map'));
// root.render(<UserDashBoard />);

export default UserDashBoard