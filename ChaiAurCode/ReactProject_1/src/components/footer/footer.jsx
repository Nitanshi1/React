import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-wrap gap-y-10">

          {/* Logo & Copyright */}
          <div className="w-full lg:w-5/12">
            <Logo width="100px" />
            <p className="mt-4 text-sm text-gray-500 max-w-sm">
              © {currentYear} DevUI. All rights reserved.
            </p>
          </div>

          {/* Company */}
          <div className="w-full sm:w-1/2 lg:w-2/12">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Company
            </h3>
            <ul className="space-y-3">
              <li><Link className="footer-link" to="/">Features</Link></li>
              <li><Link className="footer-link" to="/">Pricing</Link></li>
              <li><Link className="footer-link" to="/">Affiliate Program</Link></li>
              <li><Link className="footer-link" to="/">Press Kit</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="w-full sm:w-1/2 lg:w-2/12">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Support
            </h3>
            <ul className="space-y-3">
              <li><Link className="footer-link" to="/">Account</Link></li>
              <li><Link className="footer-link" to="/">Help</Link></li>
              <li><Link className="footer-link" to="/">Contact Us</Link></li>
              <li><Link className="footer-link" to="/">Customer Support</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="w-full sm:w-1/2 lg:w-3/12">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Legal
            </h3>
            <ul className="space-y-3">
              <li><Link className="footer-link" to="/">Terms &amp; Conditions</Link></li>
              <li><Link className="footer-link" to="/">Privacy Policy</Link></li>
              <li><Link className="footer-link" to="/">Licensing</Link></li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
