import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Fortunewheel from './Fortunewheel';
import Scard from './Scard';
import Loader from './Loader';

const Celebration = () => {
  const location = useLocation();
  const { cgname, wprize, imei, sprize } = location.state || {};

  const [wheel, setWheel] = useState(false);
  const [scratch, setScratch] = useState(false);
  const [prizelist, setPrizelist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await fetch("https://backend.jkvivo.in/campaign");
        const res = await response.json();
        const required = res.data;

        if (response.ok) {
          const filtered = required.filter((item) => item.Name === cgname);
          const pnames = filtered[0].WheelPrizes || filtered[0].Scratchprize;

          if (filtered[0].WheelPrizes) {
            const total = pnames.map((item) => item.prize);
            if (total.length !== 0) {
              setPrizelist(total);
              setWheel(true);
            }
          } else {
            setScratch(true);
          }
        } else {
          console.log("Failed to fetch:", res.message);
        }
      } catch (error) {
        console.log("Error message:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaign();
  }, [cgname]);

  if (loading) {
    return <Loader />; // Show loading state while fetching data
  }

  return (
    <>
      {wheel ? <Fortunewheel prizelist={prizelist} wprize={wprize} /> : <Scard scprize={sprize} />}
    </>
  );
}

export default Celebration;
