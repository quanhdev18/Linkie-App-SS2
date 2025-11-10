// src/components/FilterModal.tsx
import React, { useState } from "react";
import { X } from "lucide-react";

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose, onApply }) => {
  const [distance, setDistance] = useState(10);
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(25);

  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [selectedOrientation, setSelectedOrientation] = useState<string[]>([]);
  const [selectedRelationship, setSelectedRelationship] = useState<string[]>([]);

  if (!visible) return null;

  const toggleSelection = (value: string, list: string[], setList: Function) => {
    if (list.includes(value)) setList(list.filter((v) => v !== value));
    else setList([...list, value]);
  };

  const handleApply = () => {
    onApply({
      distance,
      minAge,
      maxAge,
      gender: selectedGender,
      orientation: selectedOrientation,
      relationship: selectedRelationship,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-lg font-semibold">Bộ lọc</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X size={20} />
          </button>
        </div>

        {/* Distance */}
        <div className="mb-4">
          <label className="font-medium text-sm">Khoảng cách: {distance} km</label>
          <input
            type="range"
            min="0"
            max="100"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Age */}
        <div className="mb-4">
          <label className="font-medium text-sm">Độ tuổi: {minAge} - {maxAge}</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="18"
              max="80"
              value={minAge}
              onChange={(e) => setMinAge(Number(e.target.value))}
              className="border rounded p-1 w-20 text-center"
            />
            <span>-</span>
            <input
              type="number"
              min="18"
              max="80"
              value={maxAge}
              onChange={(e) => setMaxAge(Number(e.target.value))}
              className="border rounded p-1 w-20 text-center"
            />
          </div>
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="font-medium text-sm">Giới tính:</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {["Nam", "Nữ", "Khác"].map((g) => (
              <button
                key={g}
                onClick={() => toggleSelection(g, selectedGender, setSelectedGender)}
                className={`px-3 py-1 rounded-full border text-sm ${
                  selectedGender.includes(g)
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Orientation */}
        <div className="mb-4">
          <label className="font-medium text-sm">Khuynh hướng tính dục:</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {["Dị tính", "Đồng tính", "Song tính", "Chưa rõ"].map((o) => (
              <button
                key={o}
                onClick={() => toggleSelection(o, selectedOrientation, setSelectedOrientation)}
                className={`px-3 py-1 rounded-full border text-sm ${
                  selectedOrientation.includes(o)
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {o}
              </button>
            ))}
          </div>
        </div>

        {/* Relationship */}
        <div className="mb-6">
          <label className="font-medium text-sm">Mối quan hệ:</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {[
              "Người yêu",
              "Bạn đời",
              "Không ràng buộc",
              "Bạn mới",
              "Chưa rõ",
            ].map((r) => (
              <button
                key={r}
                onClick={() => toggleSelection(r, selectedRelationship, setSelectedRelationship)}
                className={`px-3 py-1 rounded-full border text-sm ${
                  selectedRelationship.includes(r)
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Apply */}
        <button
          onClick={handleApply}
          className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full font-medium"
        >
          Áp dụng
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
