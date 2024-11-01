import PageHeader from "../ui/PageHeader"
import ParentsTable from "../features/parents/ParentsTable"

function AllParents() {
    return (
        <div className="px-8 overflow-scroll h-[88%] pb-5">
         <PageHeader pageName='Parents' pagePath='All parents' />
         <ParentsTable />
        </div>
    )
}

export default AllParents
