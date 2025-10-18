import React from "react";
import { useNavigate } from "react-router-dom";

const CoomingSoon = () => {
  const navigate = useNavigate();

  return (
    <div class="min-h-screen flex flex-col justify-center items-center bg-[var(--secbg)]">
      <img
        src="/asset/com.jpg"
        alt="Logo"
        className="object-cover w-64 mb-8 rounded-full"
      />
      <h1 className="text-4xl font-bold mb-4">Coming Soon</h1>
      <p className="text-lg mb-8 px-4 md:px-0 text-center">
        Fitur ini masih dalam tahap pengembangan, untuk sementara ini{" "}
        <span className="font-bold text-xl">Mbalik O Sek</span>
      </p>
      <div className="flex justify-center items-center space-x-4">
        <button
          onClick={() => navigate("/")}
          className="bg-[var(--lowprim)] hover:shadow-lg hover:opacity-90 transition duration-300 ease-in-out text-white px-4 py-2 rounded-md"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default CoomingSoon;
