import { useEffect, useRef, useState } from 'react';
import './App.css';
import * as tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import data from './data/data';

import axios, { Axios } from 'axios';

function App() {
  const mapElement = useRef();

  const [map, setMap] = useState({});
  const [latitude, setLatitude] = useState(24.9403737);
  const [longitude, setLongitude] = useState(92.6029585);

  const [cons, setCons] = useState([]);

  let filtered = [];

  var result = {};

  const clickCall = (Dtr_No) => {
    const consumers = result.data.data;

    filtered = consumers.filter((consumer) => {
      return consumer.dtrno == Dtr_No;
    });

    console.log(filtered);

    filtered.map((fconsumer) => {
      console.log(
        `Load: ${fconsumer.Load}, Lon: ${fconsumer.Longitude} , Lat: ${fconsumer.Latitude}, Cons_No.:${fconsumer['Cons No']}`
      );
    });

    console.log(`dtr number ${Dtr_No} is clicked `);
  };

  useEffect(() => {
    const fetchData = async () => {
      result = await axios.get(
        'https://script.googleusercontent.com/macros/echo?user_content_key=FbESSpRnFSVI2O2c5eih2msNbsvTTvShwbSXYqxTqb4RQd3B9JffBhRmYCNEm77O-ygvBpZRG8kDZ5JIGg5m48A66FIdrRZnm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnPkbKJ6p87Z6a6XjngdpwXmhSXeoPwRFH750V-LkIhHCmAgTyx7_CNO3fqxUtbkDfGfPsMUp7uInJJ8rLakbPKZtT-N27jKbnw&lib=M7EeGPs2FL0kSAxd6fciygLCijSy8ole7'
      );
      setCons(result.data.data);
    };
    fetchData();
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

        element.addEventListener('click', () => {
          clickCall(dtr.Dtr_No);
        });
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
