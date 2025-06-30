import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleRedirectToHome = () => {
    navigate("/");
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#121212] transition-colors duration-300 px-4 py-10">
      <div className="text-center w-full max-w-md sm:max-w-lg md:max-w-xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
          404
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-200 mt-4">
          Page Not Found
        </h2>
        <p className="mt-4 text-gray-400 text-sm sm:text-base md:text-lg">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <button
          onClick={handleRedirectToHome}
          className="mt-6 px-5 py-2.5 sm:px-6 sm:py-3 bg-purple-700 hover:bg-purple-800 text-white font-medium rounded-lg shadow-md transition text-sm sm:text-base"
        >
          Back to Home
        </button>
      </div>
    </div>

  );
};

export default NotFoundPage;
