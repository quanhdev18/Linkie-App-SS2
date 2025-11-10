// // import { Star, X, Check } from "lucide-react";

// // const ProfileCard = ({ name, age, image }: { name: string; age: number; image: string }) => {
// //   return (
// //     <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-lg max-w-lg mx-auto">
// //       <img
// //         src={image}
// //         alt={name}
// //         className="rounded-2xl w-full h-[500px] object-cover"
// //       />
// //       <div className="mt-4 text-center">
// //         <h3 className="text-xl font-semibold">{name}, {age}</h3>
// //       </div>

// //       <div className="flex justify-center gap-6 mt-4">
// //         <button className="bg-gray-100 p-4 rounded-full hover:bg-gray-200">
// //           <X size={28} />
// //         </button>
// //         <button className="bg-yellow-400 p-4 rounded-full hover:bg-yellow-500">
// //           <Star size={28} />
// //         </button>
// //         <button className="bg-green-400 p-4 rounded-full hover:bg-green-500">
// //           <Check size={28} />
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProfileCard;
// import React from "react";
// import { Star, X, Check } from "lucide-react";

// type Props = {
//   name: string;
//   age: number;
//   location?: string;
//   image: string;
// };

// const ProfileCard: React.FC<Props> = ({ name, age, location, image }) => {
//   return (
//     <div className="bg-white rounded-2xl shadow-md overflow-hidden max-w-3xl mx-auto">
//       <div className="grid grid-cols-2 gap-0">
//         <div className="col-span-1">
//           {/* left: photos (stacked) */}
//           <div className="space-y-2 p-4">
//             <img src={image} alt={name} className="w-full h-64 object-cover rounded-xl" />
//             <img src={image} alt={name} className="w-full h-64 object-cover rounded-xl" />
//             <img src={image} alt={name} className="w-full h-64 object-cover rounded-xl" />
//           </div>
//         </div>

//         <div className="col-span-1 bg-[#fff5d9] p-10 flex flex-col items-center justify-center rounded-r-2xl">
//           <div className="text-2xl font-bold mb-2">{name}, {age}</div>
//           {location && <div className="text-sm text-gray-600">📍 {location}</div>}
//         </div>
//       </div>

//       {/* actions */}
//       <div className="flex items-center justify-center gap-8 py-6">
//         <button className="bg-white rounded-full p-4 shadow hover:scale-105 transition">
//           <X size={22} />
//         </button>

//         <button className="bg-yellow-400 rounded-full p-5 shadow transform scale-110">
//           <Star size={26} />
//         </button>

//         <button className="bg-white rounded-full p-4 shadow hover:scale-105 transition">
//           <Check size={22} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfileCard;
