import { Outlet } from "react-router-dom"
import Header from "./Header"
import Sidebar from "./Sidebar"

function AppLayout({children}) {
    return (
        <div className="flex h-screen bg-fourth-gray">
            <Sidebar />

            <div className="flex flex-col w-5/6 h-full">
            <Header />
            <Outlet>{children}</Outlet>
            </div>
        </div>
    )
}

export default AppLayout
