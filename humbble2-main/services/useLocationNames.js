// // app/hooks/useLocationNames.js
// import { useEffect, useState } from "react";
// import { getLocationByAccountId, getLocationName } from "../services/api"; 

// export default function useLocationNames(profiles) {
//   const [locationNames, setLocationNames] = useState({});

//   useEffect(() => {
//     const fetchAllLocations = async () => {
//       const newLocationNames = {};
//       for (const user of profiles) {
//         try {
//           const location = await getLocationByAccountId(user.account_id);
//           if (location?.latitude && location?.longitude) {
//             const name = await getLocationName(location.latitude, location.longitude);
//             newLocationNames[user.account_id] = name;
//           } else {
//             newLocationNames[user.account_id] = "Không rõ vị trí";
//           }
//         } catch (err) {
//           newLocationNames[user.account_id] = "Không rõ vị trí";
//         }
//       }
//       setLocationNames(newLocationNames);
//     };

//     if (profiles.length > 0) {
//       fetchAllLocations();
//     }
//   }, [profiles]);

//   return locationNames;
// }
import { useEffect, useState } from "react";
import { getLocationByAccountId, getLocationName } from "../services/api";

export default function useLocationNames(profiles) {
  const [locationNames, setLocationNames] = useState({});

  useEffect(() => {
    const fetchAllLocations = async () => {
      try {
        // gọi song song
        const results = await Promise.all(
          profiles.map(async (user) => {
            try {
              const location = await getLocationByAccountId(user.account_id);
              if (location?.latitude && location?.longitude) {
                const name = await getLocationName(location.latitude, location.longitude);
                return [user.account_id, name];
              } else {
                return [user.account_id, "Không rõ vị trí"];
              }
            } catch {
              return [user.account_id, "Không rõ vị trí"];
            }
          })
        );

        // convert mảng [id, name] → object
        const newLocationNames = Object.fromEntries(results);
        setLocationNames(newLocationNames);
      } catch (err) {
        console.error("Lỗi lấy vị trí:", err);
      }
    };

    if (profiles.length > 0) {
      fetchAllLocations();
    }
  }, [profiles]);

  return locationNames;
}
