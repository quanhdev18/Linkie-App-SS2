import { useState } from 'react';
import { AiFillPieChart } from "react-icons/ai";
import { IoSettings } from "react-icons/io5";
import { SiGoogleanalytics } from "react-icons/si";
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate } from "react-router-dom";
import { FaFlag, FaUserAlt } from 'react-icons/fa';
import { GoPackage } from "react-icons/go";
import { MdVideoLibrary } from "react-icons/md";
const { Sider } = Layout;

// Hàm tạo item cho Menu
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

// Danh sách menu
const items = [
    getItem('Biểu đồ', '1', <AiFillPieChart />),
    getItem('Phân tích', '2', <SiGoogleanalytics />),
    getItem('Tài khoản', '3', <FaUserAlt />),
    getItem('Báo cáo', '4', <FaFlag />),
    getItem('Lời khuyên hẹn hò', '5', <MdVideoLibrary />),
    getItem('Gói hẹn hò', '6', <GoPackage />),
    getItem('Cài đặt', '7', <IoSettings />),
];

// Component SlideBar
const SlideBar = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    const handleClick = (e) => {
        const routes = ["/", "/analytics", "/users", "/report", "/advice", "/package", "/settings"];
        const index = parseInt(e.key, 10) - 1;
        if (routes[index]) navigate(routes[index]);
    };

    return (
        <Layout style={{ minHeight: '90vh' }}>
            <Sider
                className="bg-white py-3"
                width={"16.666666%"}
                collapsible
                collapsed={collapsed}
                onCollapse={value => setCollapsed(value)}
            >
                <div className="demo-logo-vertical" />
                <Menu
                    onClick={handleClick}
                    className="bg-white"
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    items={items}
                />
            </Sider>
            <Layout className="h-[90.8vh] overflow-y-auto">
                <Outlet />
            </Layout>
        </Layout>
    );
};

export default SlideBar;
