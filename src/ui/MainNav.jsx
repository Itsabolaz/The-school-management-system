import { NavLink, useLocation } from "react-router-dom";
import {
  HiAcademicCap,
  HiBars3,
  HiChevronDown,
  HiChevronRight,
  HiMiniCog8Tooth,
  HiMiniUserGroup,
  HiMiniUserPlus,
  HiMiniUsers,
} from "react-icons/hi2";
import { PiStudentBold } from "react-icons/pi";
import { TbTableFilled  } from "react-icons/tb";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { useEffect, useState } from "react";

function MainNav() {
  const { pathname } = useLocation();
  const [isStudentsModalOpen, setIsStudentsModalOpen] = useState(pathname === "/add-student" || pathname === "/all-students");
  const [isTeachersModalOpen, setIsTeachersModalOpen] = useState(pathname === "/add-teacher" || pathname === "/all-teachers");

  useEffect(
    function () {
      if (pathname !== "/add-student" && pathname !== "/all-students") {
        setIsStudentsModalOpen(false);
      }
      if (pathname !== "/add-teacher" && pathname !== "/all-teachers") {
        setIsTeachersModalOpen(false);
      }
    },
    [pathname],
  );

  function handleOpenModal(message) {
    if (message === "students") {
      setIsStudentsModalOpen((isOpen) => !isOpen);
      setIsTeachersModalOpen(false);
    } else {
      setIsTeachersModalOpen((isOpen) => !isOpen);
      setIsStudentsModalOpen(false);
    }
  }

  return (
    <nav className="h-[88%] overflow-hidden" id="navbar">
      <ul className="h-full bg-primary-blue [&>li]:border-b-[3px] [&>li]:border-solid [&>li]:border-[#131f73] [&>li]:transition-all hover:[&>li]:bg-third-blue">
        <li>
          <NavLink
            to="/dashboard"
            className="flex items-center px-5 py-5 text-white [&>span]:ml-2"
          >
            <RiDashboardHorizontalFill className="text-xl" />
            <span className="custom-font-light">Dashboard</span>
          </NavLink>
        </li>
        <li>
          <button
            className="flex w-full items-center justify-between px-5 py-5 text-white"
            onClick={() => handleOpenModal("students")}
          >
            <div className="flex items-center [&>span]:ml-2">
              <PiStudentBold className="text-xl" />
              <span className="custom-font-light">Students</span>
            </div>
            {isStudentsModalOpen ? <HiChevronDown /> : <HiChevronRight />}
          </button>
        </li>
        <ul
          className={`bg-secendary-blue text-sm transition-max-height duration-300 ease-in-out ${isStudentsModalOpen ? "max-h-full" : "max-h-0 overflow-hidden"}`}
        >
          <li>
            <NavLink
              to="/all-students"
              className="flex items-center px-5 py-5 text-white transition-all hover:bg-primary-blue [&>span]:ml-2"
            >
              <HiBars3 />
              <span className="custom-font-light">All Students</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-student"
              className="flex items-center px-5 py-5 text-white transition-all hover:bg-primary-blue [&>span]:ml-2"
            >
              <HiMiniUserPlus />
              <span className="custom-font-light">Add Student</span>
            </NavLink>
          </li>
        </ul>
        <li>
          <NavLink
            to="/parents"
            className="flex items-center px-5 py-5 text-white [&>span]:ml-2"
          >
            <HiMiniUsers className="text-xl" />
            <span className="custom-font-light">Parents</span>
          </NavLink>
        </li>
        <li>
          <button
            className="flex w-full items-center justify-between px-5 py-5 text-white"
            onClick={() => handleOpenModal("teachers")}
          >
            <div className="flex items-center [&>span]:ml-2">
              <HiMiniUserGroup className="text-xl" />
              <span className="custom-font-light">Teachers</span>
            </div>
            {isTeachersModalOpen ? <HiChevronDown /> : <HiChevronRight />}
          </button>
        </li>
        <ul
          className={`bg-secendary-blue text-sm transition-max-height duration-300 ease-in-out ${isTeachersModalOpen ? "max-h-full" : "max-h-0 overflow-hidden"}`}
        >
          <li>
            <NavLink
              to="/all-teachers"
              className="flex items-center px-5 py-5 text-white transition-all hover:bg-primary-blue [&>span]:ml-2"
            >
              <HiBars3 />
              <span className="custom-font-light">All Teachers</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-teacher"
              className="flex items-center px-5 py-5 text-white transition-all hover:bg-primary-blue [&>span]:ml-2"
            >
              <HiMiniUserPlus />
              <span className="custom-font-light">Add Teacher</span>
            </NavLink>
          </li>
        </ul>
        <li>
          <NavLink
            to="/classes"
            className="flex items-center px-5 py-5 text-white [&>span]:ml-2"
          >
            <HiAcademicCap className="text-xl" />
            <span className="custom-font-light">Classes</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/curricula"
            className="flex items-center px-5 py-5 text-white [&>span]:ml-2"
          >
            <TbTableFilled className="text-xl" />
            <span className="custom-font-light">Curricula</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/settings"
            className="flex items-center px-5 py-5 text-white [&>span]:ml-2"
          >
            <HiMiniCog8Tooth className="text-xl" />
            <span className="custom-font-light">Settings</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
