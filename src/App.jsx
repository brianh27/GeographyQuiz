import { useState,useEffect } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import changeLoc from "./City";
import './input.css'
import ask from "./aiget";
const containerStyle = {
  width: "100%",
  height: "400px",
};



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
async function check({event,pot,setPot,setData,setPoints,setCenter,points,setDisable,setzoomlev,data,city,setMessage,showHint}){
  event.preventDefault()
  setMessage('')
  setDisable(true)
  const ans= await  ask({query:data+','+city,description:'This is a game where you have to guess what the city is based on a map. The user guesses the city on the left of the comma. The correct answer is the one on the right side. If it is correct iwht minor spelling errors or a different way or nickname of calling the city, return the single letter Y, else return a hint telling the user why they are wrong and helping them a little bit to the right answer.'})
  console.log(ans)
  showHint(false)
  if(ans!='Y'){
    setMessage(ans)
    setPot(pot/2)
    setDisable(false)
    return
  }
  setzoomlev(11)
  
  setData('')
  setPoints(points+pot)
  await setCenter(changeLoc())
  setMessage('')
  setPot(4)
  setDisable(false)
}
function App() {
  const [center,setCenter] =useState(changeLoc())    
  const [data,setData]=useState('')
  const [points,setPoints]=useState(0)
  const [pot,setPot]=useState(4)
  const [zoomlev,setzoomlev]=useState(10)
  const [disable,setDisable]=useState(false)
  const [message,setMessage]=useState('')
  const [hint,showHint]=useState(false)
  if (center===undefined){
    return(
      <div>
        loading...
      </div>
    )
  }
  const city=center.city
  console.log(city)
  useEffect(()=>{},[center])

  return (
    <>
      <div >
        <div >
          <LoadScript googleMapsApiKey="AIzaSyBp4QAffaLvFnZMELsWzYtpF6PaasvQFFU">
            <GoogleMap mapContainerStyle={containerStyle} center={{lat:center.lat,lng:center.long}} zoom={zoomlev} options={mapOptions}/>
          </LoadScript>
        </div>
        <div >
          <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={data} onChange={(e)=>setData(e.target.value)}></input>
          
          <p></p>Points:{points}
        </div>
        <button disabled={disable} 
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition" 
         onClick={(event)=>check({event,pot,setPot,setData,setPoints,setCenter,points,setDisable,setzoomlev,data,city,setMessage,showHint})}>{disable?"Loading...":`Submit For ${pot} ${pot===1?"point":"points"}`}</button>
        <p>------------</p>
        {message!=''&& 
          <div>
            <p>{hint?message:"Wrong Answer Please Try Again"}</p><button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            onClick={()=>showHint(!hint)}>{hint?"Hide Hint":"Show Hint"}</button>
          </div>  
        }
          
      </div>
    </>
  );
}

export default App;
