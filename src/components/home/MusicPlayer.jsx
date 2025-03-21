/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

import { useEffect, useState } from "react";
import { fetchToken } from "../others/fetchToken";

const MusicPlayer = function ({ track }) {
  // const [token, setToken] = useState("");
  console.log(track)

  // useEffect(() => {
  //   const fetchApiHandler = async () => {
  //     const token = await fetchToken();
  //     console.log(token);
  //     setToken(token);
  //   };
  //   // fetchApiHandler();
  // }, []);
  //   // Create Base64 encoded credentials
  //   async function getTopTracks(token) {
  //   //   const data = await fetchWebApi(token); // Fetch data using the hardcoded fetchWebApi
  //   //   return data.items; // Return the top tracks
  //       // console.log(data.items);
  //   }
    // getTopTracks(token);

  // Call the function to request token
  //   requestToken();
  return (
    <div className="flex flex-row p-4 bg-[#DFFEE2] gap-4 w-max rounded-md">
      <div className="">
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
        >
          <path d="M19.098 10.638c-3.868-2.297-10.248-2.508-13.941-1.387-.593.18-1.22-.155-1.399-.748-.18-.593.154-1.22.748-1.4 4.239-1.287 11.285-1.038 15.738 1.605.533.317.708 1.005.392 1.538-.316.533-1.005.709-1.538.392zm-.126 3.403c-.272.44-.847.578-1.287.308-3.225-1.982-8.142-2.557-11.958-1.399-.494.15-1.017-.129-1.167-.623-.149-.495.13-1.016.624-1.167 4.358-1.322 9.776-.682 13.48 1.595.44.27.578.847.308 1.286zm-1.469 3.267c-.215.354-.676.465-1.028.249-2.818-1.722-6.365-2.111-10.542-1.157-.402.092-.803-.16-.895-.562-.092-.403.159-.804.562-.896 4.571-1.045 8.492-.595 11.655 1.338.353.215.464.676.248 1.028zm-5.503-17.308c-6.627 0-12 5.373-12 12 0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12z" />
        </svg>
      </div>
      <div className="flex flex-col pr-[20px]">
        <p>{track?.name}</p>
        <p className="text-[8px]">
          {track?.artists?.[0]?.name || "Unknown Artist"}
        </p>
      </div>
      <div className="">
        <img
          src={track?.album.images[0].url}
          alt={track?.name}
          width="40"
        />
      </div>
    </div>
  );
};

export default MusicPlayer;

// const token =
//   "BQDaTcqMyeRXPw9d68pebQkQ3yqpsC5dGiz9MBQPe8cxOYCCnF0KKoNATlCoasuXjYco6RWoGOxTvcS_CNvNS6n0Ms5gUy57ACdDDjXPPPQJkPcukqQmvQLwQi_zecnt8Ad5qM4lTI4NrI67dO8czl-ZSSH5xFJg83uRA1vWvcd5idR7Hl48dz3uDtBtTSgpEbvsvDUpDSinrFYryOKPdBPItHd9Ln2j3Yv4ik_H4pTMvIc1giqckj_GslYA7aOcEvDmnCk9Maa0pcbucw5xa2ffy1eBv9xV";

