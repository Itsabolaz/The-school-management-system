import ClassesTable from "../features/classes/ClassesTable"
import PageHeader from "../ui/PageHeader"

function Classes() {
    return (
        <div className="px-8 overflow-scroll h-[88%] pb-5">
         <PageHeader pageName='Classes' pagePath='All classes' />
         <ClassesTable />
        </div>
    )
}

export default Classes
