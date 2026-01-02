// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faXmark } from "@fortawesome/free-solid-svg-icons";

// const PaymentSuccess: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const paymentId = new URLSearchParams(location.search).get("payment_intent_id");

//   return (
//     <div className="relative flex flex-col items-center justify-center h-screen bg-green-50">
//       {/* Nút đóng */}
//       <button
//         onClick={() => navigate("/home")}
//         className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
//         aria-label="Đóng"
//       >
//         <FontAwesomeIcon icon={faXmark} size="xl" />
//       </button>

//       <h1 className="text-3xl font-bold text-green-700 mb-4">
//         ✅ Thanh toán thành công!
//       </h1>
//       <p className="text-gray-600">
//         Cảm ơn bạn đã sử dụng dịch vụ. Mã giao dịch:
//       </p>
//       <p className="text-gray-800 font-mono mt-2">
//         {paymentId || "Không xác định"}
//       </p>
//     </div>
//   );
// };

// export default PaymentSuccess;



import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const PaymentSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Lấy purchaseId từ state khi redirect từ trang thanh toán
  const state = location.state as { purchaseId?: number } | undefined;
  const purchaseId = state?.purchaseId;

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-green-50 px-4">
      {/* Nút đóng */}
      <button
        onClick={() => navigate("/home")}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        aria-label="Đóng"
      >
        <FontAwesomeIcon icon={faXmark} size="xl" />
      </button>

      <h1 className="text-3xl font-bold text-green-700 mb-4">
        ✅ Thanh toán thành công!
      </h1>
      <p className="text-gray-600 text-center">
        Cảm ơn bạn đã sử dụng dịch vụ.
      </p>
      <p className="text-gray-600 text-center mt-1">
        Mã giao dịch của bạn:
      </p>
      <p className="text-gray-800 font-mono mt-2 text-center text-lg">
        {purchaseId ? `#${purchaseId}` : "Không xác định"}
      </p>

      <button
        onClick={() => navigate("/profile")}
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Quay về trang cá nhân
      </button>
    </div>
  );
};

export default PaymentSuccess;
