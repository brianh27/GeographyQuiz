import { useState,useEffect } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};


function changeLoc(){
  const cities=[
    {"city": "New York City", "lat": 40.670, "long": -73.940},
    {"city": "Los Angeles", "lat": 34.110, "long": -118.410},
    {"city": "Chicago", "lat": 41.840, "long": -87.680},
    {"city": "Houston", "lat": 29.7407, "long": -95.4636},
    {"city": "Phoenix", "lat": 33.540, "long": -112.070},
    {"city": "Philadelphia", "lat": 40.010, "long": -75.130},
    {"city": "San Antonio", "lat": 29.460, "long": -98.510},
    {"city": "San Diego", "lat": 32.810, "long": -117.140},
    {"city": "Dallas", "lat": 32.790, "long": -96.770},
    {"city": "San Jose", "lat": 37.300, "long": -121.850},
    {"city": "Austin", "lat": 30.310, "long": -97.750},
    {"city": "Jacksonville", "lat": 30.330, "long": -81.660},
    {"city": "Fort Worth", "lat": 32.750, "long": -97.340},
    {"city": "Columbus", "lat": 39.990, "long": -82.990},
    {"city": "Charlotte", "lat": 35.200, "long": -80.830},
    {"city": "Indianapolis", "lat": 39.780, "long": -86.150},
    {"city": "San Francisco", "lat": 37.770, "long": -122.450},
    {"city": "Seattle", "lat": 47.620, "long": -122.350},
    {"city": "Denver", "lat": 39.770, "long": -104.870},
    {"city": "Washington DC", "lat": 38.910, "long": -77.020},
    {"city": "Nashville", "lat": 36.170, "long": -86.780},
    {"city": "Oklahoma City", "lat": 35.470, "long": -97.510},
    {"city": "Boston", "lat": 42.340, "long": -71.020},
    {"city": "El Paso", "lat": 31.850, "long": -106.440},
    {"city": "Portland", "lat": 45.540, "long": -122.660},
    {"city": "Las Vegas", "lat": 36.210, "long": -115.220},
    {"city": "Memphis", "lat": 35.110, "long": -90.010},
    {"city": "Detroit", "lat": 42.380, "long": -83.100},
    {"city": "Baltimore", "lat": 39.300, "long": -76.610},
    {"city": "Milwaukee", "lat": 43.060, "long": -87.970},
    {"city": "Albuquerque", "lat": 35.120, "long": -106.620},
    {"city": "Fresno", "lat": 36.780, "long": -119.790},
    {"city": "Tucson", "lat": 32.200, "long": -110.890},
    {"city": "Sacramento", "lat": 38.570, "long": -121.470},
    {"city": "Kansas City", "lat": 39.120, "long": -94.550},
    {"city": "Mesa", "lat": 33.420, "long": -111.740},
    {"city": "Atlanta", "lat": 33.760, "long": -84.420},
    {"city": "Omaha", "lat": 41.260, "long": -96.010},
    {"city": "Colorado Springs", "lat": 38.860, "long": -104.760},
    {"city": "Raleigh", "lat": 35.820, "long": -78.660},
    {"city": "Long Beach", "lat": 33.790, "long": -118.160},
    {"city": "Virginia Beach", "lat": 36.740, "long": -76.040},
    {"city": "Miami", "lat": 25.780, "long": -80.210},
    {"city": "Oakland", "lat": 37.770, "long": -122.220},
    {"city": "Minneapolis", "lat": 44.960, "long": -93.270},
    {"city": "Tulsa", "lat": 36.130, "long": -95.920},
    {"city": "Bakersfield", "lat": 35.360, "long": -119.000},
    {"city": "Wichita", "lat": 37.690, "long": -97.340},
    {"city": "Arlington", "lat": 32.690, "long": -97.130},
    {"city": "Aurora", "lat": 39.710, "long": -104.730},
    {"city": "Tampa", "lat": 27.960, "long": -82.480},
    {"city": "New Orleans", "lat": 30.070, "long": -89.930},
    {"city": "Cleveland", "lat": 41.480, "long": -81.680},
    {"city": "Honolulu", "lat": 21.320, "long": -157.800},
    {"city": "Anaheim", "lat": 33.840, "long": -117.870},
    {"city": "Louisville", "lat": 38.220, "long": -85.740},
    {"city": "Henderson", "lat": 36.030, "long": -115.000},
    {"city": "Lexington", "lat": 38.040, "long": -84.460},
    {"city": "Irvine", "lat": 32.860, "long": -96.970},
    {"city": "Stockton", "lat": 37.970, "long": -121.310},
    {"city": "Orlando", "lat": 28.500, "long": -81.370},
    {"city": "Corpus Christi", "lat": 27.710, "long": -97.290},
    {"city": "Newark", "lat": 40.720, "long": -74.170},
    {"city": "Riverside", "lat": 33.940, "long": -117.400},
    {"city": "St. Paul", "lat": 44.9537, "long": -93.0900},
    {"city": "Cincinnati", "lat": 39.140, "long": -84.510},
    {"city": "San Juan", "lat": 18.4655, "long": -66.1057},
    {"city": "Santa Ana", "lat": 33.740, "long": -117.880},
    {"city": "Greensboro", "lat": 36.080, "long": -79.830},
    {"city": "Pittsburgh", "lat": 40.440, "long": -79.980},
    {"city": "Jersey City", "lat": 40.710, "long": -74.060},
    {"city": "St. Louis", "lat": 38.6270, "long": -90.1994},
    {"city": "Lincoln", "lat": 40.820, "long": -96.690},
    {"city": "Durham", "lat": 35.980, "long": -78.910},
    {"city": "Anchorage", "lat": 61.2176, "long": -149.8997},
    {"city": "Plano", "lat": 33.050, "long": -96.750},
    {"city": "Chandler", "lat": 33.300, "long": -111.870},
    {"city": "Chula Vista", "lat": 32.630, "long": -117.040},
    {"city": "Buffalo", "lat": 42.890, "long": -78.860},
    {"city": "Gilbert", "lat": 33.330, "long": -111.760},
    {"city": "Madison", "lat": 43.080, "long": -89.390},
    {"city": "Reno", "lat": 39.540, "long": -119.820}
]

const t=cities[Math.floor(Math.random() * (100))]
return t
}
const mapOptions = {
  mapTypeId: "satellite", // Use 'satellite' for satellite imagery
  styles: [
    {
      featureType: "all",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ],
};
function App() {
  const [center,setCenter] =useState(changeLoc())    
  const [data,setData]=useState('')
  const [points,setPoints]=useState(0)
  console.log(center.city.toLowerCase())
  if (data.toLowerCase()===center.city.toLowerCase()){
    setData('')
    setPoints(points+1)
    setCenter(changeLoc())
  }
  return (
    <>
      
      <LoadScript googleMapsApiKey="AIzaSyBp4QAffaLvFnZMELsWzYtpF6PaasvQFFU">
        <GoogleMap mapContainerStyle={containerStyle} center={{lat:center.lat,lng:center.long}} zoom={11} options={mapOptions}/>
      </LoadScript>
      
      <input value={data} onChange={(e)=>setData(e.target.value)}></input>
      <p></p>Points:{points}

    </>
  );
}

export default App;
