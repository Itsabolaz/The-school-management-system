import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Student from "./pages/Student";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import AllParents from "./pages/AllParents";
import Parents from "./pages/Parents";
import Teacher from "./pages/Teacher";
import Classes from "./pages/Classes";
import Curricula from "./pages/Curricula";
import Login from "./pages/Login";
import ProtectedRoute from "./ui/ProtectedRoute";
import Settings from "./pages/Settings";
import SendRecoveryEmail from "./pages/SendRecoveryEmail";
import ResetPassword from "./pages/ResetPassword";
import SignUp from "./pages/SignUp";
import PageNotFound from './pages/PageNotFound'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="all-students" element={<Students />} />
            <Route path="all-students/:studentId" element={<Student />} />
            <Route path="add-student" element={<Students />} />
            <Route path="parents" element={<AllParents />} />
            <Route path="parents/:parentsId" element={<Parents />} />
            <Route path="all-teachers" element={<Teachers />} />
            <Route path="add-teacher" element={<Teachers />} />
            <Route path="all-teachers/:teacherId" element={<Teacher />} />
            <Route path="classes" element={<Classes />} />
            <Route path="curricula" element={<Curricula />} />
            <Route path="Settings" element={<Settings />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="send-email" element={<SendRecoveryEmail />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="*" element={<PageNotFound />}/>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#fff",
            color: "#374151",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
