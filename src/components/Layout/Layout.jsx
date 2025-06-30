import { Outlet } from "react-router-dom"
import Navbar from '../Navbar/Navbar'
// import Footer from "../Footer/Footer"
import {useState} from "react"
import Footer from "../Footer/Footer"

const Layout = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="bg-[#121212]">
        <Outlet />

        {/* <Footer /> */}
        <Footer />
      </div>
    </>
  )
}

export default Layout
