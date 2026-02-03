import React, { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { createDailyStatus, deleteDailyStatus } from "@/services/api";

const DailyStatusModal = ({ visible, onClose, status, onUpdated }: any) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      setText(status?.content || "");
    }
  }, [visible, status]);

  const handleSave = async () => {
    if (!text.trim()) return;
    try {
      setLoading(true);

      if (status) {
        await deleteDailyStatus(); // giống web
      }

      await createDailyStatus(text.trim());
      onUpdated();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteDailyStatus();
      onUpdated();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>
            {status ? "Trạng thái hôm nay" : "Ngày hôm nay của bạn thế nào"}
          </Text>

          <TextInput
            value={text}
            onChangeText={setText}
            maxLength={120}
            multiline
            placeholder="Bạn đang nghĩ gì?"
            style={styles.input}
          />

          <Text style={styles.counter}>{text.length}/120</Text>

          <View style={styles.actions}>
            {status && (
              <TouchableOpacity onPress={handleDelete}>
                <Text style={styles.delete}>Xoá</Text>
              </TouchableOpacity>
            )}

            <View style={{ flexDirection: "row", gap: 12 }}>
              <TouchableOpacity onPress={onClose}>
                <Text>Huỷ</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave} disabled={loading}>
                <Text style={styles.save}>
                  {status ? "Cập nhật" : "Lưu"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DailyStatusModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
  },
  title: { fontWeight: "600", marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    minHeight: 60,
  },
  counter: {
    textAlign: "right",
    fontSize: 11,
    color: "#999",
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  delete: { color: "#ef4444" },
  save: { color: "#0284c7", fontWeight: "600" },
});
