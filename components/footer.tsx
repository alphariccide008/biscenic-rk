import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 tracking-wide">CUSTOMER CARE</h3>
            <ul className="space-y-1 md:space-y-2">
              <li>
                <Link href="#" className="text-xs md:text-sm hover:text-gray-300 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 tracking-wide">SERVICES</h3>
            <ul className="space-y-1 md:space-y-2">
              <li>
                <Link href="/contact" className="text-xs md:text-sm hover:text-gray-300 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-xs md:text-sm hover:text-gray-300 transition-colors">
                  Personal Shopping
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 tracking-wide">COMPANY</h3>
            <ul className="space-y-1 md:space-y-2">
              <li>
                <Link href="/about" className="text-xs md:text-sm hover:text-gray-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/exhibition" className="text-xs md:text-sm hover:text-gray-300 transition-colors">
                  Exhibition
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 tracking-wide">CONNECT</h3>
            <ul className="space-y-1 md:space-y-2">
              <li>
                <Link
                  href="https://www.instagram.com/biscenic/?igsh=MWY3dmR2NjN0NW4zMA%3D%3D#"
                  className="text-xs md:text-sm hover:text-gray-300 transition-colors"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="#" className="text-xs md:text-sm hover:text-gray-300 transition-colors">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="#" className="text-xs md:text-sm hover:text-gray-300 transition-colors">
                  Facebook
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8 text-center">
          <p className="text-xs md:text-sm text-gray-400">© 2024 BISCENIC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
