import DashboardLayout from '../features/dashboard/DashboardLayout'
import PageHeader from '../ui/PageHeader'
function Dashboard() {
    return (
        <div className="px-8 overflow-scroll h-[88%] pb-5">
         <PageHeader pageName='Dashboard' pagePath='dashboard' />
         <DashboardLayout />
        </div>
    )
}

export default Dashboard
