import React, { useState, useCallback } from 'react';
import { YMaps, Map, RouteButton, FullscreenControl, SearchControl, Placemark, Polyline, Button } from '@pbe/react-yandex-maps';
import { MdLocalHotel } from "react-icons/md";
import { FaHospital } from "react-icons/fa6";
import { FaStore } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { CiBank } from "react-icons/ci";
import { MdForest } from "react-icons/md";
import { FaGasPump } from "react-icons/fa";
import './App.css';

function App() {
  const [markers, setMarkers] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

 
  const handleMapClick = useCallback((e) => {
    const { lat, lng } = e.get('coords');
    setMarkers([...markers, { lat, lng }]);
  }, [markers]);

 
  const handleSearchResults = useCallback((results) => {
    setSearchResults(results);
  }, []);


  const handleAddRoute = useCallback((route) => {
    setRoutes([...routes, route]);
  }, [routes]);


  const handleClearAll = useCallback(() => {
    setMarkers([]);
    setRoutes([]);
  }, []);

  const mapContainerStyle = {
    width: '100%',
    height: '100vh', 
  };

  return (
    <div className='container'>
      <div className='maps-info'>
        <h1>React Yandex Maps</h1>
        <div className="info">
          <h2>Search Results:</h2>
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>{result.name}</li>
            ))}
          </ul>
        </div>

          <div className="info-box">
            <div className="box-item" style={{backgroundColor:"orange", color:"white"}}>
            <MdLocalHotel className='icon' />
            <span>Hotel</span>
            </div>
            <div className="box-item" style={{backgroundColor:"red", color:"white"}}>
            <FaGasPump className='icon' />
            <span>Gas</span>
            </div>
            <div className="box-item" style={{backgroundColor:"orange", color:"white"}}>
            <FaHospital className='icon' />
            <span>Hospital</span>
            </div>
            <div className="box-item" style={{backgroundColor:"blue", color:"white"}}>
            < FaPhone className='icon' />
            <span>Phone</span>
            </div>
            <div className="box-item" style={{backgroundColor:"gold", color:"white"}}>
            <FaStore className='icon' />
            <span>Store</span>
            </div>
            <div className="box-item" style={{backgroundColor:"lime", color:"white"}}>
            < MdForest className='icon' />
            <span>Forest</span>
            </div>
            <div className="box-item" style={{backgroundColor:"gray", color:"white"}}>
            <MdLocalHotel className='icon' />
            <span>Hotel</span>
            </div>
            <div className="box-item" style={{backgroundColor:"black", color:"white"}}>
            <CiBank className='icon' />
            <span>Bank</span>
            </div>
            <div className="box-item" style={{backgroundColor:"purple", color:"white"}}>
            <MdLocalHotel className='icon' />
            <span>Hotel</span>
            </div>
          </div>
      </div>

      <div className='maps'>
        
        <YMaps>
          <Map
            defaultState={{
              center: [55.751574, 37.573856],
              zoom: 9,
              controls: [],
            }}
            width={'100%'} 
            height={'100%'} 
            style={mapContainerStyle} 
            onClick={handleMapClick}
          >
          
            {markers.map((marker, index) => (
              <Placemark key={index} geometry={[marker.lat, marker.lng]} />
            ))}
          
            {routes.map((route, index) => (
              <Polyline key={index} geometry={route} />
            ))}
           
            <RouteButton options={{ float: "right" }} onRouteChange={handleAddRoute} />
          
            <FullscreenControl />
           
            <SearchControl options={{ float: "left" }} onSearchResultsChange={handleSearchResults} />
          </Map>
        </YMaps>
       
        <Button onClick={handleClearAll} className="clear-button">Clear All</Button>
      </div>
    </div>
  );
}

export default App;
