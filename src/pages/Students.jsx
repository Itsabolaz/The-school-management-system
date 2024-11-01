import { useLocation } from "react-router-dom"
import PageHeader from "../ui/PageHeader"
import AddStudentAndParentsForm from "../features/students/AddStudentAndParentsForm"
import StudentsTable from "../features/students/StudentsTable"

function Students() {
    const {pathname} = useLocation()

    const isPathAllStudents = pathname === "/all-students"
    return (
        <div className="px-8 overflow-scroll h-[88%] pb-5">
         <PageHeader pageName='Students' pagePath={isPathAllStudents ? "All Students" : "Student Admit Form"} />
         {isPathAllStudents ? <StudentsTable /> : <AddStudentAndParentsForm />}
        </div>
    )
}

export default Students;