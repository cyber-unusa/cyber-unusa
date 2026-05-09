import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { AppContextProvider } from "./context/appContext.jsx";

const About = React.lazy(() => import("./pages/About"));
const Member = React.lazy(() => import("./pages/Member"));
const Auth = React.lazy(() => import("./pages/Auth"));
const EmailVerify = React.lazy(() => import("./pages/EmailVerify"));
const ResetPassword = React.lazy(() => import("./pages/ResetPassword"));
const CyberMart = React.lazy(() => import("./pages/CyberMart"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Presensi = React.lazy(() => import("./pages/Presensi"));
const Page404 = React.lazy(() => import("./pages/Page404"));
const CoomingSoon = React.lazy(() => import("./pages/CoomingSoon"));
const Home = React.lazy(() => import("./pages/Home"));

function LoadingScreen() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <span>Loading...</span>
    </div>
  );
}

export default function App() {
  return (
    <AppContextProvider>
      <div>
        <ToastContainer />
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/member" element={<Member />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/email-verify" element={<EmailVerify />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/cyber-mart" element={<CyberMart />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/presensi" element={<Presensi />} />
            <Route path="/cooming" element={<CoomingSoon />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Suspense>
      </div>
    </AppContextProvider>
  );
}
