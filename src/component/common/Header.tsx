// import { useState } from "react";
// import { BiCart, BiUser, BiChevronDown } from "react-icons/bi";
// import { Link } from "react-router-dom";
// import { headerNav } from "./data";

// const Header = () => {
//   const [walletConnected, setWalletConnected] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const toggleDropdown = () => setDropdownOpen((prev) => !prev);
//   const disconnectWallet = () => {
//     setWalletConnected(false);
//     setDropdownOpen(false);
//   };

//   return (
//     <div className="py-4 px-10 flex items-center justify-between w-full border-b-2 bg-white relative z-50">
//       <Link to="/" className="font-bold text-4xl">
//         Truss
//       </Link>

//       <div>
//         {walletConnected ? (
//           <div className="flex items-center justify-center gap-10 relative">
//             {/* Cart */}
//             <div className="flex relative items-center justify-center gap-2">
//               <BiCart className="w-8 h-8" />
//               <p className="absolute top-0 -right-2 bg-red-500 p-2 rounded-full w-6 h-6 flex items-center justify-center text-white">
//                 0
//               </p>
//             </div>

//             {/* User + Dropdown */}
//             <div className="relative">
//               <div
//                 onClick={toggleDropdown}
//                 className="flex bg-neutral-200 text-neutral-700 rounded-full p-2 px-4 items-center justify-center gap-2 cursor-pointer"
//               >
//                 <BiUser className="w-6 h-6" />
//                 <p>Muh'd Musa</p>
//                 <BiChevronDown
//                   className={`w-5 h-5 transform transition-transform duration-200 ${
//                     dropdownOpen ? "rotate-180" : ""
//                   }`}
//                 />
//               </div>

//               {dropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-10">
//                   {headerNav?.map((eachNav: any) => (
//                     <Link
//                       to={eachNav?.link}
//                       className="block px-4 py-2 hover:bg-gray-100"
//                       onClick={() => setDropdownOpen(false)}
//                     >
//                       {eachNav?.title}
//                     </Link>
//                   ))}
//                   <button
//                     onClick={disconnectWallet}
//                     className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
//                   >
//                     Disconnect
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         ) : (
//           <button
//             onClick={() => setWalletConnected(true)}
//             className="p-2 px-4 rounded-sm bg-primary text-white"
//           >
//             Connect Wallet
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Header;

// ======== version 2 ========
import { useState } from "react";
import { BiCart, BiUser, BiChevronDown, BiMenu } from "react-icons/bi";
import { Link } from "react-router-dom";
import { headerNav } from "./data";

const Header = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const disconnectWallet = () => {
    setWalletConnected(false);
    setDropdownOpen(false);
  };

  return (
    <header className="w-full border-b-2 bg-white relative z-50">
      <div className="py-4 px-6 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-bold text-3xl md:text-4xl">
          Truss
        </Link>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            <BiMenu className="w-7 h-7" />
          </button>
        </div>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-8">
          {walletConnected ? (
            <>
              {/* Cart */}
              <div className="relative flex items-center">
                <BiCart className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  0
                </span>
              </div>

              {/* User + Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex bg-neutral-200 text-neutral-700 rounded-full px-4 py-2 items-center gap-2"
                >
                  <BiUser className="w-5 h-5" />
                  <span className="text-sm">Muh'd Musa</span>
                  <BiChevronDown
                    className={`w-4 h-4 transform transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-50">
                    {headerNav?.map((eachNav: any, index: number) => (
                      <Link
                        key={index}
                        to={eachNav?.link}
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {eachNav?.title}
                      </Link>
                    ))}
                    <button
                      onClick={disconnectWallet}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                    >
                      Disconnect
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button
              onClick={() => setWalletConnected(true)}
              className="p-2 px-4 bg-primary text-white rounded-sm"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4">
          {walletConnected ? (
            <>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <BiCart className="w-5 h-5" />
                  <span className="text-sm">Cart (0)</span>
                </div>
              </div>

              {headerNav.map((eachNav: any, index: number) => (
                <Link
                  key={index}
                  to={eachNav.link}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-neutral-700 hover:underline"
                >
                  {eachNav.title}
                </Link>
              ))}

              <button
                onClick={disconnectWallet}
                className="text-sm text-red-600 mt-2"
              >
                Disconnect
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setWalletConnected(true);
                setMobileMenuOpen(false);
              }}
              className="p-2 bg-primary text-white rounded-sm"
            >
              Connect Wallet
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
