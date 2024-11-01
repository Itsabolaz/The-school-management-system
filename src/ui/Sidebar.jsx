import Logo from "./Logo"
import MainNav from "./MainNav"

function Sidebar() {
    return (
        <div className="flex flex-col w-1/6 h-full">
            <Logo />
            <MainNav />
        </div>
    )
}

export default Sidebar
