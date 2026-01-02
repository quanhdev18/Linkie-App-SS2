// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";

// const stripePromise = loadStripe("pk_test_51SOfBSQwmqNZFaXmGU20oQuvrGZjhgFrvPAPFxImRYjRCXnakANn1URvJvYkXhehT4mspeH8AMt2WqGtw1HMIABp00rOS0nbVv");

// export default function SpotlightPayment() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const query = new URLSearchParams(location.search);
//   const planName = query.get("plan") || "Boost";


//   const [packages, setPackages] = useState<any[]>([]);
//   const [selected, setSelected] = useState<number | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get("http://127.0.0.1:8000/packages");
//         const allPackages = res.data;

//         const filtered = allPackages.filter(
//           (pkg: any) =>
//             pkg.name.toLowerCase().trim() === planName.toLowerCase().trim()
//         );
//         const sorted = filtered.sort((a: any, b: any) => b.price - a.price);

//         setPackages(sorted);
//       } catch (err) {
//         console.error("❌ Lỗi khi tải gói:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPackages();
//   }, [planName]);

//   const selectedPkg = packages.find((p) => p.id === selected);

//   return (
//     <Elements stripe={stripePromise}>
//       <PaymentForm
//         selectedPkg={selectedPkg}
//         packages={packages}
//         setSelected={setSelected}
//         loading={loading}
//         planName={planName}
//         navigate={navigate}
//       />
//     </Elements>
//   );
// }

// // ===============================
// // 🔸 Form thanh toán thật với Stripe
// // ===============================
// function PaymentForm({
//   selectedPkg,
//   packages,
//   setSelected,
//   loading,
//   planName,
//   navigate,
// }: any) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [paying, setPaying] = useState(false);
//   const [message, setMessage] = useState("");
//   const [email, setEmail] = useState("");

//   const handlePay = async () => {
//     if (!selectedPkg) {
//       setMessage("⚠️ Vui lòng chọn gói trước khi thanh toán!");
//       return;
//     }
//     if (!stripe || !elements) return;

//     try {
//       setPaying(true);
//       setMessage("⏳ Đang xử lý thanh toán...");

//       // 🟡 Gọi backend tạo PaymentIntent
//       const res = await axios.post("http://127.0.0.1:8000/payment/visa", {
//         package_id: selectedPkg.id,
//         email,
//       });

//       const { client_secret, purchase_id } = res.data;
//       console.log("✅ Nhận client_secret:", client_secret);

//       // 🟣 Xác thực thanh toán qua Stripe
//       const result = await stripe.confirmCardPayment(client_secret, {
//         payment_method: {
//           card: elements.getElement(CardElement)!,
//         },
//       });

//       if (result.error) {
//         console.error(result.error);
//         setMessage("❌ Thanh toán thất bại: " + result.error.message);
//       } else if (result.paymentIntent?.status === "succeeded") {
//         setMessage("🎉 Thanh toán thành công! Đang xác nhận giao dịch...");

//         // 🟢 Gọi callback API để cập nhật trạng thái server (nếu có)
//         try {
//           await axios.get("http://127.0.0.1:8000/payment/visa-callback", {
//             // purchase_id,
//             // status: "succeeded",
//             params: { payment_intent_id: result.paymentIntent.id },
//           });
//           setMessage("✅ Giao dịch hoàn tất!");
//         } catch (cbErr) {
//           console.error("❌ Callback lỗi:", cbErr);
//           setMessage("⚠️ Thanh toán thành công, nhưng callback lỗi!");
//         }

//         // 👉 Điều hướng sang trang thành công
//         setTimeout(() => {
//           navigate("/payment-success", { state: { purchaseId: purchase_id } });
//         }, 1500);
//       }
//     } catch (err: any) {
//       console.error("❌ Lỗi khi thanh toán:", err);
//       setMessage("❌ Lỗi trong quá trình thanh toán.");
//     } finally {
//       setPaying(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-start bg-white py-8 px-4">
//       {/* Header */}
//       <div className="w-full max-w-6xl relative mb-7">
//         <h2 className="text-center text-lg font-semibold ">
//           Cùng {planName} hoàn hảo với Linkie
//         </h2>
//         <button
//           // onClick={() => navigate(-1)}
//           onClick={() => navigate("/profile")}
//           className="absolute right-0 top-0 p-3 rounded-full hover:bg-gray-100"
//         >
//           ✕
//         </button>
//       </div>

//       {/* Loading */}
//       {loading ? (
//         <p className="text-gray-500 mt-10">Đang tải dữ liệu...</p>
//       ) : packages.length === 0 ? (
//         <p className="text-gray-500 mt-10">
//           Không tìm thấy gói nào cho {planName}.
//         </p>
//       ) : (
//         <div className="bg-yellow-50 rounded-2xl shadow-sm w-full max-w-6xl p-6 grid md:grid-cols-2 gap-6">
//           {/* Left side */}
//           <div className="flex flex-col justify-between bg-yellow-50 rounded-xl p-6">
//             <div>
//               <div className="flex items-start gap-3 mb-6">
//                 <div className="w-12 h-12 rounded-full bg-yellow-300 flex items-center justify-center text-yellow-700 text-xl font-bold">
//                   ⭐
//                 </div>
//                 <p className="text-gray-800 text-[15px] leading-relaxed">
//                   Nâng cấp gói <strong>{planName}</strong> để nhận nhiều quyền
//                   lợi hơn!
//                 </p>
//               </div>
//               {/* 🟢 Mô tả gói hiển thị ở đây */}
//               {selectedPkg ? (
//                 selectedPkg.description ? (
//                   <p className="text-gray-600 text-sm mb-6 pl-1">
//                     {selectedPkg.description}
//                   </p>
//                 ) : (
//                   <p className="text-gray-400 text-sm mb-6 italic pl-1">
//                     (Gói này chưa có mô tả.)
//                   </p>
//                 )
//               ) : (
//                 <p className="text-gray-400 text-sm mb-6 italic pl-1">
//                   Hãy chọn gói hẹn hò phù hợp với bạn nhất ngay để trải nghiệm.
//                 </p>
//               )}


//               <div className="flex flex-col space-y-3">
//                 {packages.map((pkg: any) => (
//                   <div
//                     key={pkg.id}
//                     onClick={() => setSelected(pkg.id)}
//                     className={`flex items-center justify-between border rounded-xl px-4 py-3 cursor-pointer transition-all ${pkg.id === selectedPkg?.id
//                       ? "border-yellow-400 bg-yellow-100"
//                       : "border-gray-200 bg-white hover:bg-gray-50"
//                       }`}
//                   >
//                     <div>
//                       {/* <p className="font-medium text-gray-800">
//                         {pkg.description}
//                       </p> */}
//                       <p className="text-xs text-gray-500">
//                         Thời hạn: {pkg.duration_days} ngày
//                       </p>
//                     </div>
//                     <p className="font-semibold text-gray-900">
//                       {pkg.price.toLocaleString("vi-VN")}₫
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {selectedPkg && (
//               <p className="mt-3 text-xs text-gray-600">
//                 Bạn sẽ thanh toán{" "}
//                 <strong>
//                   {selectedPkg.price.toLocaleString("vi-VN")}₫
//                 </strong>{" "}
//                 cho gói {selectedPkg.name}.
//               </p>
//             )}
//           </div>

//           {/* Right side */}
//           <div className="bg-yellow-50 rounded-xl p-6 flex flex-col justify-between">
//             <div>
//               <h3 className="text-center font-semibold text-gray-800 mb-4">
//                 Nhập thông tin thẻ Visa
//               </h3>
//               <div className="bg-white border rounded-2xl p-5 w-full max-w-md shadow-sm mx-auto">
//                 {/* Stripe CardElement hiển thị khung nhập thẻ */}
//                 <CardElement
//                   options={{
//                     style: {
//                       base: {
//                         fontSize: "16px",
//                         color: "#32325d",
//                         "::placeholder": { color: "#a0aec0" },
//                       },
//                       invalid: { color: "#e53e3e" },
//                     },
//                   }}
//                 />
//               </div>
//             </div>
//             {/* Email input */}
//             <label className="block text-sm text-gray-600 mb-1 mt-5">
//               Email nhận hóa đơn
//             </label>
//             {/* <input
//               type="email"
//               placeholder="your@email.com"
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-yellow-300"
//             /> */}
//             <input
//               type="email"
//               placeholder="your@email.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-yellow-300"
//             />

//             {/* Recurring billing info */}
//             <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-600 mb-6 ">
//               <strong className="text-gray-800">Thanh toán định kỳ.</strong> Gói đăng ký của bạn sẽ tự động gia hạn và phương thức thanh
//               toán của bạn sẽ được tính phí cho cùng kỳ hạn và mức giá, trừ khi bạn hủy ít nhất 24 giờ trước khi kỳ hạn kết thúc. Bằng cách nhấn vào{" "}
//               <strong>Thanh toán</strong>, bạn đồng ý lưu thông tin thanh toán cho các lần mua hàng sau.
//             </div>

//             <button
//               onClick={handlePay}
//               disabled={paying}
//               className={`w-48 mx-auto mt-6 py-3 rounded-lg font-semibold transition ${paying
//                 ? "bg-gray-400 text-white cursor-not-allowed"
//                 : "bg-green-600 text-white hover:bg-green-700"
//                 }`}
//             >
//               {paying ? "Đang thanh toán..." : "Thanh toán"}
//             </button>
//             {message && (
//               <p className="text-center text-sm text-gray-700 mt-3">
//                 {message}
//               </p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51SOfBSQwmqNZFaXmGU20oQuvrGZjhgFrvPAPFxImRYjRCXnakANn1URvJvYkXhehT4mspeH8AMt2WqGtw1HMIABp00rOS0nbVv");

export default function SpotlightPayment() {
  const location = useLocation();
  const navigate = useNavigate();
  // const query = new URLSearchParams(location.search);
  // const planName = query.get("plan") || "Boost";

  const planName = location.state?.planName || "Boost";



  const [packages, setPackages] = useState<any[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://127.0.0.1:8000/packages", {
          withCredentials: true, // ✅ nếu backend dùng JWT cookie
        });
        const allPackages = res.data;

        const filtered = allPackages.filter(
          (pkg: any) =>
            pkg.name.toLowerCase().trim() === planName.toLowerCase().trim()
        );
        const sorted = filtered.sort((a: any, b: any) => b.price - a.price);

        setPackages(sorted);
      } catch (err) {
        console.error("❌ Lỗi khi tải gói:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, [planName]);

  const selectedPkg = packages.find((p) => p.id === selected);

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm
        selectedPkg={selectedPkg}
        packages={packages}
        setSelected={setSelected}
        loading={loading}
        planName={planName}
        navigate={navigate}
      />
    </Elements>
  );
}

function PaymentForm({
  selectedPkg,
  packages,
  setSelected,
  loading,
  planName,
  navigate,
}: any) {
  const stripe = useStripe();
  const elements = useElements();
  const [paying, setPaying] = useState(false);
  const [message, setMessage] = useState("");
  const [finalPrice, setFinalPrice] = useState<number | null>(null);
  const [originalPrice, setOriginalPrice] = useState<number | null>(null);
  const [discountApplied, setDiscountApplied] = useState(false);

  const handlePay = async () => {
    if (!selectedPkg) {
      setMessage("⚠️ Vui lòng chọn gói trước khi thanh toán!");
      return;
    }
    if (!stripe || !elements) return;

    try {
      setPaying(true);
      setMessage("⏳ Đang xử lý thanh toán...");

      // 🔑 Lấy token từ localStorage (hoặc từ context / redux)
      const token = localStorage.getItem("access_token");
      if (!token) {
        setMessage("❌ Bạn cần đăng nhập trước khi thanh toán!");
        setPaying(false);
        return;
      }

      // 🟡 Gọi backend tạo PaymentIntent
      const res = await axios.post(
        "http://127.0.0.1:8000/payment/visa",
        { package_id: selectedPkg.id },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ gửi token
          },
          withCredentials: true, // nếu backend dùng cookie
        }
      );

      // const { client_secret, purchase_id } = res.data;
      const {
        client_secret,
        purchase_id,
        final_price,
        original_price,
        discount_applied,
      } = res.data;

      setFinalPrice(final_price);
      setOriginalPrice(original_price);
      setDiscountApplied(discount_applied);

      console.log("🔥 Giá backend tính:", final_price);

      console.log("✅ Nhận client_secret:", client_secret);

      // 🟣 Xác thực thanh toán qua Stripe
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      if (result.error) {
        console.error(result.error);
        setMessage("❌ Thanh toán thất bại: " + result.error.message);
      } else if (result.paymentIntent?.status === "succeeded") {
        setMessage("🎉 Thanh toán thành công! Đang xác nhận giao dịch...");

        // 🟢 Gọi callback API để cập nhật trạng thái server
        try {
          await axios.get("http://127.0.0.1:8000/payment/visa-callback", {
            params: { payment_intent_id: result.paymentIntent.id },
            headers: {
              Authorization: `Bearer ${token}`, // gửi token callback luôn
            },
            withCredentials: true,
          });
          setMessage("✅ Giao dịch hoàn tất!");
        } catch (cbErr) {
          console.error("❌ Callback lỗi:", cbErr);
          setMessage("⚠️ Thanh toán thành công, nhưng callback lỗi!");
        }

        // 👉 Điều hướng sang trang thành công
        setTimeout(() => {
          navigate("/payment-success", { state: { purchaseId: purchase_id } });
        }, 1500);
      }
    } catch (err: any) {
      console.error("❌ Lỗi khi thanh toán:", err);
      setMessage(
        err.response?.status === 401
          ? "❌ Bạn chưa đăng nhập hoặc phiên đăng nhập hết hạn!"
          : "❌ Lỗi trong quá trình thanh toán."
      );
    } finally {
      setPaying(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-white py-8 px-4">
      {/* Header */}
      <div className="w-full max-w-6xl relative mb-7">
        <h2 className="text-center text-lg font-semibold ">
          Cùng {planName} hoàn hảo với Linkie
        </h2>
        <button
          onClick={() => navigate("/profile")}
          className="absolute right-0 top-0 p-3 rounded-full hover:bg-gray-100"
        >
          ✕
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 mt-10">Đang tải dữ liệu...</p>
      ) : packages.length === 0 ? (
        <p className="text-gray-500 mt-10">
          Không tìm thấy gói nào cho {planName}.
        </p>
      ) : (
        <div className="bg-yellow-50 rounded-2xl shadow-sm w-full max-w-6xl p-6 grid md:grid-cols-2 gap-6">
          {/* Left side: chọn gói */}
          <div className="flex flex-col justify-between bg-yellow-50 rounded-xl p-6">
            <div>
              <div className="flex items-start gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-yellow-300 flex items-center justify-center text-yellow-700 text-xl font-bold">
                  ⭐
                </div>
                <p className="text-gray-800 text-[15px] leading-relaxed">
                  Nâng cấp gói <strong>{planName}</strong> để nhận nhiều quyền lợi hơn!
                </p>
              </div>
              {selectedPkg ? (
                selectedPkg.description ? (
                  <p className="text-gray-600 text-sm mb-6 pl-1">
                    {selectedPkg.description}
                  </p>
                ) : (
                  <p className="text-gray-400 text-sm mb-6 italic pl-1">
                    (Gói này chưa có mô tả.)
                  </p>
                )
              ) : (
                <p className="text-gray-400 text-sm mb-6 italic pl-1">
                  Hãy chọn gói hẹn hò phù hợp với bạn nhất ngay để trải nghiệm.
                </p>
              )}

              <div className="flex flex-col space-y-3">
                {packages.map((pkg: any) => (
                  <div
                    key={pkg.id}
                    // onClick={() => setSelected(pkg.id)}
                    onClick={() => {
                      setSelected(pkg.id);
                      setFinalPrice(null);
                      setOriginalPrice(null);
                      setDiscountApplied(false);
                    }}

                    className={`flex items-center justify-between border rounded-xl px-4 py-3 cursor-pointer transition-all ${pkg.id === selectedPkg?.id
                      ? "border-yellow-400 bg-yellow-100"
                      : "border-gray-200 bg-white hover:bg-gray-50"
                      }`}
                  >
                    <div>
                      <p className="text-xs text-gray-500">
                        Thời hạn: {pkg.duration_days} ngày
                      </p>
                    </div>
                    {/* <p className="font-semibold text-gray-900">
                      {pkg.price.toLocaleString("vi-VN")}₫
                    </p> */}
                    <p className="font-semibold text-gray-900">
                      {pkg.id === selectedPkg?.id && finalPrice
                        ? finalPrice.toLocaleString("vi-VN")
                        : pkg.price.toLocaleString("vi-VN")}₫
                    </p>

                  </div>
                ))}
              </div>
            </div>

            {selectedPkg && (
              <p className="mt-3 text-xs text-gray-600">
                {finalPrice ? (
                  <>
                    Giá thanh toán sau ưu đãi:{" "}
                    <strong className="text-green-600">
                      {finalPrice.toLocaleString("vi-VN")}₫
                    </strong>
                    {discountApplied && originalPrice && (
                      <span className="ml-2 line-through text-gray-400">
                        {originalPrice.toLocaleString("vi-VN")}₫
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    Giá niêm yết:{" "}
                    <strong>
                      {selectedPkg.price.toLocaleString("vi-VN")}₫
                    </strong>
                    <span className="ml-1 text-gray-400">
                      (Ưu đãi giảm ngay 30% khi thanh toán cho phái đẹp - giá chưa áp dụng)
                    </span>
                  </>
                )}{" "}
                cho gói {selectedPkg.name}.
              </p>
            )}


          </div>

          {/* Right side: nhập thẻ */}
          <div className="bg-yellow-50 rounded-xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-center font-semibold text-gray-800 mb-4">
                Nhập thông tin thẻ Visa
              </h3>
              <div className="bg-white border rounded-2xl p-5 w-full max-w-md shadow-sm mx-auto">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#32325d",
                        "::placeholder": { color: "#a0aec0" },
                      },
                      invalid: { color: "#e53e3e" },
                    },
                  }}
                />
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-600 mb-6 ">
              <strong className="text-gray-800">Thanh toán định kỳ.</strong> Gói đăng ký của bạn sẽ tự động gia hạn.
            </div>

            <button
              onClick={handlePay}
              disabled={paying}
              className={`w-48 mx-auto mt-6 py-3 rounded-lg font-semibold transition ${paying
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
                }`}
            >
              {paying ? "Đang thanh toán..." : "Thanh toán"}
            </button>
            {message && (
              <p className="text-center text-sm text-gray-700 mt-3">{message}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
