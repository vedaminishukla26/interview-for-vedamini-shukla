import logo from '../assets/Logo.svg'

const Navbar = () => {
    return (
      <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16 space-x-4">
            <img src={logo}
              alt="Logo"
              className="h-10 w-auto"
            />
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;