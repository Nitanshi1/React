import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Logo, LogOutBtn } from "../index";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="inline-block px-4 py-2 duration-200 hover:bg-blue-50 rounded-lg transition-all"
            >
              <Logo width="120px" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-2">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="px-6 py-2 text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 transform hover:scale-105"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li>
                <LogOutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 mt-2">
            <ul className="flex flex-col space-y-2 pt-4">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        navigate(item.slug);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}

              {authStatus && (
                <li className="px-4 py-2">
                  <LogOutBtn />
                </li>
              )}
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;