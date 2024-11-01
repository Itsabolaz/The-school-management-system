import { useLocation } from "react-router-dom"
import PageHeader from "../ui/PageHeader"
import TeachersTable from "../features/teachers/TeachersTable"
import AddTeacherForm from "../features/teachers/AddTeacherForm"

function Teachers() {
    const {pathname} = useLocation()

    const isPathAllTeachers = pathname === "/all-teachers"
    return (
        <div className="px-8 overflow-scroll h-[88%] pb-5">
         <PageHeader pageName='Teachers' pagePath={isPathAllTeachers ? "All Teachers" : "Teacher Admit Form"} />
         {isPathAllTeachers ? <TeachersTable /> : <AddTeacherForm />}
        </div>
    )
}

export default Teachers
