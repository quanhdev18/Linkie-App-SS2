import React, { useState } from "react";
import { X } from "lucide-react";

interface PasswordModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  if (!visible) return null;

  const handleSubmit = () => {
    if (!password || !confirm) {
      setError("Vui lòng nhập đầy đủ.");
      return;
    }
    if (password !== confirm) {
      setError("Mật khẩu không trùng khớp.");
      return;
    }
    setError("");
    onSubmit(password);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-lg font-semibold">Tạo mật khẩu</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X size={20} />
          </button>
        </div>

        {/* Inputs */}
        <div className="mb-4">
          <label className="font-medium text-sm mb-1 block">Mật khẩu mới</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg w-full p-2"
            placeholder="Nhập mật khẩu mới"
          />
        </div>

        <div className="mb-4">
          <label className="font-medium text-sm mb-1 block">Nhập lại mật khẩu</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="border rounded-lg w-full p-2"
            placeholder="Nhập lại mật khẩu"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full font-medium"
        >
          Tạo mật khẩu
        </button>
      </div>
    </div>
  );
};

export default PasswordModal;
