import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    // <footer className="bg-[#121212] text-white py-10 mt-32 border-t border-gray-700">
    //   <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-20">
    //     {/* Column 1: Logo */}
    //     <div className="text-center md:text-left">
    //       <h2 className="text-2xl font-bold mb-4"> Filmaze</h2>
    //       <p className="text-sm text-gray-400">
    //         Your ultimate destination for movies and TV shows.
    //       </p>
    //     </div>

    //     {/* Column 2: Quick Links */}
    //     <div className="">
    //       <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
    //       <ul className="space-y-2 text-sm text-gray-300">
    //         <li><a href="/" className="hover:text-purple-700"> Home</a></li>
    //         <li><a href="#" className="hover:text-purple-700"> Contact Us</a></li>
    //         <li><a href="#" className="hover:text-purple-700"> Help Center</a></li>
    //         <li><a href="#" className="hover:text-purple-700"> Applications</a></li>
    //         <li><a href="#" className="hover:text-purple-700"> Terms & Conditions</a></li>
    //         <li><a href="#" className="hover:text-purple-700"> Privacy Policy</a></li>
    //       </ul>
    //     </div>

    //     {/* Column 3: Social Media */}
    //     <div className=" ">
    //       <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
    //       <div className="flex justify-start  gap-4">
    //         <a href="https://facebook.com" target="_blank" rel="noreferrer"
    //           className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-blue-600 rounded-full transition">
    //           <i className="fab fa-facebook-f text-white" />
    //         </a>
    //         <a href="https://instagram.com" target="_blank" rel="noreferrer"
    //           className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-pink-600 rounded-full transition">
    //           <i className="fab fa-instagram text-white" />
    //         </a>
    //         <a href="https://twitter.com" target="_blank" rel="noreferrer"
    //           className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-sky-500 rounded-full transition">
    //           <i className="fab fa-twitter text-white" />
    //         </a>
    //         <a href="https://youtube.com" target="_blank" rel="noreferrer"
    //           className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-red-600 rounded-full transition">
    //           <i className="fab fa-youtube text-white" />
    //         </a>
    //         <a href="https://tiktok.com" target="_blank" rel="noreferrer"
    //           className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-gray-300 rounded-full transition">
    //           <i className="fab fa-tiktok text-white" />
    //         </a>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-4">
    //     &copy; {new Date().getFullYear()} Filmaze. All rights reserved.
    //   </div>
    // </footer>

    <footer className="bg-[#121212] text-white py-10 mt-32 border-t border-gray-700">
  <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-20">
    {/* Column 1: Logo */}
    <div className="text-center md:text-left">
      <h2 className="text-2xl font-bold mb-4">Filmaze</h2>
      <p className="text-sm text-gray-400">
        Your ultimate destination for movies and TV shows.
      </p>
    </div>

    {/* Column 2: Quick Links */}
    <div className="text-center md:text-left">
      <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
      <ul className="space-y-2 text-sm text-gray-300">
        <li><a href="/" className="hover:text-purple-700">Home</a></li>
        <li><a href="#" className="hover:text-purple-700">Contact Us</a></li>
        <li><a href="#" className="hover:text-purple-700">Help Center</a></li>
        <li><a href="#" className="hover:text-purple-700">Applications</a></li>
        <li><a href="#" className="hover:text-purple-700">Terms & Conditions</a></li>
        <li><a href="#" className="hover:text-purple-700">Privacy Policy</a></li>
      </ul>
    </div>

    {/* Column 3: Social Media */}
    <div className="text-center md:text-left">
      <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
      <div className="flex justify-center md:justify-start flex-wrap gap-4">
        <a href="https://facebook.com" target="_blank" rel="noreferrer"
          className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-blue-600 rounded-full transition">
          <i className="fab fa-facebook-f text-white" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer"
          className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-pink-600 rounded-full transition">
          <i className="fab fa-instagram text-white" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer"
          className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-sky-500 rounded-full transition">
          <i className="fab fa-twitter text-white" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noreferrer"
          className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-red-600 rounded-full transition">
          <i className="fab fa-youtube text-white" />
        </a>
        <a href="https://tiktok.com" target="_blank" rel="noreferrer"
          className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-gray-300 rounded-full transition">
          <i className="fab fa-tiktok text-white" />
        </a>
      </div>
    </div>
  </div>

  <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-4">
    &copy; {new Date().getFullYear()} Filmaze. All rights reserved.
  </div>
</footer>

  );
};

export default Footer;
