import React, { useContext } from 'react'
import { Authcontext } from '../context/Authcontext'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const {blogs,user}=useContext(Authcontext);
  console.log(blogs)
  return (
    <>
      <nav className="shadow-lg px-4 py-2">
        <div className="flex items-center justify-between container mx-auto">
          <div className="font-semibold text-xl">
            Cilli<span className="text-blue-500">Blog</span>
          </div>
          {/* Desktop */}

          <div className=" mx-6">
            <ul className=" space-x-6">
              <Link to="/" className="hover:text-blue-500">
                HOME
              </Link>
              <Link to="/blogs" className="hover:text-blue-500">
                BLOGS
              </Link>
              <Link to="/creators" className="hover:text-blue-500">
                CREATORS
              </Link>
              <Link to="/about" className="hover:text-blue-500">
                ABOUT
              </Link>
              <Link to="/contact" className="hover:text-blue-500">
                CONTACT
              </Link>
            </ul>
          </div>

          <div  className=" space-x-2">
            <Link to="/dashboard"  className="bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 px-4 py-2 rounded"> DASHBOARD</Link>
            <Link to="/login"  className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded"> LOGIN</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar