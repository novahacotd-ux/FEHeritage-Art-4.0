import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { SideBar } from "../sidebar/SideBar";

const AdminLayout = () => {
    useEffect(() => {
        import("@coreui/coreui/dist/css/coreui.min.css");
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100">

            <SideBar />

            <div className="flex-1 p-8 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;