import CurriculaTable from "../features/curricula/CurriculaTable"
import PageHeader from "../ui/PageHeader"

function Curricula() {
    return (
        <div className="px-8 overflow-scroll h-[88%] pb-5">
         <PageHeader pageName='Curricula' pagePath='All Curricula' />
         <CurriculaTable />
        </div>
    )
}

export default Curricula