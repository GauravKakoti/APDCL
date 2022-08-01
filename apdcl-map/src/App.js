import { useEffect, useRef, useState } from 'react';
import './App.css';
import * as tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import data from './data/data';

function App() {
  const mapElement = useRef();
  const [map, setMap] = useState({});
  const [latitude, setLatitude] = useState(24.9403737);
  const [longitude, setLongitude] = useState(92.6029585);

  useEffect(() => {
    // const data = [
    //   {
    //     '': '0',
    //     Sub_Div_Code: '133',
    //     Dtr_No: '18',
    //     DTR_Name: '018-paikan',
    //     Feeder_No: '5',
    //     Latitude: '24.9823071',
    //     Longitude: '92.5210001',
    //     Total_Capacity_kVA: '100',
    //     Load: '56.39',
    //     Value: '1',
    //   },
    //   {
    //     '': '1',
    //     Sub_Div_Code: '133',
    //     Dtr_No: '44',
    //     DTR_Name: '044-KHELMA',
    //     Feeder_No: '2',
    //     Latitude: '24.9536851',
    //     Longitude: '92.4990678',
    //     Total_Capacity_kVA: '63',
    //     Load: '58.06',
    //     Value: '-1',
    //   },
    // ];

    let map = tt.map({
      key: 'Om2txKYPaBXiTFo3kU8c8SAKYvro4fl3',
      container: mapElement.current,
      center: [longitude, latitude],
      zoom: 10,
    });
    setMap(map);

    const addMarker = (dtrs) => {
      dtrs.map((dtr) => {
        const popupOffset = {
          bottom: [0, -25],
        };
        const popup = new tt.Popup({ offset: popupOffset }).setHTML(
          dtr.DTR_Name
        );
        const element = document.createElement('div');
        if (dtr.Value == 1) {
          element.className = 'marker-a';
        } else {
          element.className = 'marker-b';
        }

        const marker = new tt.Marker({
          draggable: false,
          element: element,
        })
          .setLngLat([dtr.Longitude, dtr.Latitude])
          .addTo(map);

        marker.setPopup(popup).togglePopup();
      });
    };

    addMarker(data);

    return () => map.remove();
  }, []);

  return (
    <>
      {map && (
        <div className="app">
          <div ref={mapElement} className="map"></div>
        </div>
      )}
    </>
  );
}

export default App;
