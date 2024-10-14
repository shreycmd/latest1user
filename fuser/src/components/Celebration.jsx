import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Fortunewheel from './Fortunewheel';
import Scard from './Scard';

const Celebration = () => {
  const location = useLocation();
  const { cgname, wprize, imei ,sprize} = location.state || {};
  
    const[wheel,setwheel]=useState(false);
    const[scratch,setscratch]=useState(false)
    const [prizelist,setPrizelist]=useState([])
    useEffect(() => {
        const fetchCampaign = async () => {
          try {
            const response = await fetch("https://backend.jkvivo.in/campaign");
            const res = await response.json();
            const required = res.data;
         
            if (response.ok) {
              const filtered = required.filter((item) => item.Name === cgname);
             // console.log(filtered[0].WheelPrizes)
              const pnames=filtered[0].WheelPrizes||filtered[0].Scratchprize;
              console.log(pnames)
              console.log("list is",pnames)
              if(filtered[0].WheelPrizes){
              const total=pnames.map((item) => item.prize);
              if(total.length!=0){
                setPrizelist(total)
                setwheel(true)
              }
              
              }
              //setPrizelist(filtered[0].WheelPrizes);
              // Check for scratchCard availability
              // Assuming this is the correct field name
            } else {
              console.log("Failed to fetch:", res.message);
            }
          } catch (error) {
            console.log("Error message:", error);
          }
        };
        fetchCampaign();
      }, [cgname]);
  return (
    <>
    
    {wheel ? <Fortunewheel prizelist={prizelist} wprize={wprize} /> :<Scard scprize={sprize}/>}
    </>
  )
}

export default Celebration