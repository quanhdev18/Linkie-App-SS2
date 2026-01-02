import React, { useEffect, useState } from "react";
import { Table, Button, InputNumber, Modal, message } from "antd";
import axios from "axios";

// Leaflet
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";

const API = "http://localhost:8000";

// Fix icon Leaflet bị lỗi khi dùng React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const LocationAdmin = () => {
  const [locations, setLocations] = useState([]);
  const [hotZones, setHotZones] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // ----------------------------
  // FETCH LOCATIONS + HOTZONE
  // ----------------------------
  const fetchLocations = async () => {
    try {
      const res = await axios.get(`${API}/location/admin/all_locations`);
      setLocations(res.data);
    } catch (err) {
      message.error("Lỗi tải danh sách vị trí!");
    }
  };

  const fetchHotZone = async () => {
    try {
      const res = await axios.get(`${API}/location/hot_zone`);
      setHotZones(res.data);
    } catch (err) {
      message.error("Lỗi tải hot zone!");
    }
  };

  useEffect(() => {
    fetchLocations();
    fetchHotZone();
  }, []);

  // ----------------------------
  // CẬP NHẬT LOCATION
  // ----------------------------
  const handleUpdateLocation = async () => {
    if (!selectedUser) return;

    try {
      await axios.post(
        `${API}/location/update_location/${selectedUser.id}?latitude=${lat}&longitude=${lng}`
      );
      message.success("Cập nhật vị trí thành công!");
      setModalVisible(false);
      fetchLocations();
    } catch (err) {
      message.error("Lỗi cập nhật vị trí!");
    }
  };

  // ----------------------------
  // TABLE
  // ----------------------------
  const columns = [
    {
      title: "User ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Latitude",
      dataIndex: "latitude",
    },
    {
      title: "Longitude",
      dataIndex: "longitude",
    },
    {
      title: "Cập nhật",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => {
            setSelectedUser(record);
            setLat(record.latitude);
            setLng(record.longitude);
            setModalVisible(true);
          }}
        >
          Đổi vị trí
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-[20px] font-bold mt-5 mx-5">
        Quản lý vị trí người dùng
      </h1>

      {/* MAP */}
      <div className="m-5">
        <MapContainer
          center={[21.028511, 105.804817]}
          zoom={12}
          style={{ height: "700px", width: "100%" }}
        >
          {/* TILE FREE OSM */}
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* USER MARKERS */}
          {/* {locations.map((u) => (
            <Marker key={u.id} position={[u.latitude, u.longitude]}>
              <Popup>
                <b>{u.email}</b>
                <br />
                Lat: {u.latitude}
                <br />
                Lng: {u.longitude}
                <br />
                {u.avatar?.url ? (
                  <img
                    src={`http://localhost:8000/${u.avatar.url}`}
                    alt="avatar"
                    style={{
                      width: 70,
                      height: 70,
                      objectFit: "cover",
                      borderRadius: 10,
                      marginTop: 6,
                    }}
                  />
                ) : (
                  <i>Không có avatar</i>
                )}
              </Popup>
            </Marker>
          ))} */}

          {locations.map((u) => {
            const avatarUrl = u.avatar?.url
              ? `http://localhost:8000/${u.avatar.url}`
              : "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png";

            // Tạo DivIcon
            const userIcon = L.divIcon({
              className: "custom-avatar-icon",
              html: `<div style="
        width:50px; 
        height:50px; 
        border-radius:50%; 
        overflow:hidden; 
        border:2px solid white;
    ">
        <img src="${avatarUrl}" style="width:100%; height:100%; object-fit:cover;" />
    </div>`,
              iconSize: [50, 50],
              iconAnchor: [25, 50],
              popupAnchor: [0, -50],
            });

            return (
              <Marker
                key={u.id}
                position={[u.latitude, u.longitude]}
                icon={userIcon}
              >
                <Popup>
                  <b>{u.email}</b>
                  <br />
                  Lat: {u.latitude}
                  <br />
                  Lng: {u.longitude}
                </Popup>
              </Marker>
            );
          })}

          {/* HOT ZONES */}
          {hotZones.map((zone, index) => (
            <Circle
              key={index}
              center={[zone.center_lat, zone.center_lng]}
              radius={300}
              pathOptions={{
                color: "red",
                fillColor: "orange",
                fillOpacity: 0.3,
              }}
            >
              <Popup>
                <b>{zone.zone_name}</b>
                <br />
                Số người: {zone.user_count}
              </Popup>
            </Circle>
          ))}
        </MapContainer>
      </div>

      {/* TABLE */}
      <div className="m-5 bg-white p-3 rounded-lg shadow border">
        <Table rowKey="id" columns={columns} dataSource={locations} />
      </div>

      {/* MODAL UPDATE */}
      <Modal
        title="Cập nhật vị trí"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleUpdateLocation}
      >
        <p>User: {selectedUser?.email}</p>

        <div className="flex gap-4 mt-3">
          <div>
            <label>Latitude</label>
            <InputNumber
              value={lat}
              onChange={setLat}
              style={{ width: "100%" }}
            />
          </div>

          <div>
            <label>Longitude</label>
            <InputNumber
              value={lng}
              onChange={setLng}
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LocationAdmin;
