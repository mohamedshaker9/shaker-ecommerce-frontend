import {useState} from 'react';
import { FaShoppingCart, FaSignInAlt, FaStore } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import AccountMenu from './AccountMenu';
import { useSelector } from 'react-redux';

function Navbar({cartQuantity}) {
    const path = useLocation().pathname;
    const [isOpenNavBar, setOpenNavBar] = useState(true);

    const isUserLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  return <div>
    <nav className="w-full bg-blue-600 p-4 text-white">
       <div className="flex flex-col md:flex-row items-start gap-4 md:items-center container mx-auto justify-between ">
            <div className="text-2xl ">
                <Link to="/" className="flex items-center">
                <FaStore /><span className="font-bold ml-1">Shaker E-Commerce</span>
                </Link>
            </div>
            <div>
                <ul className={`flex flex-col  gap-3 items-start md:flex-row md:h-fit  md:items-center
                     ${isOpenNavBar ? "h-fit" : "h-0 overflow-hidden"} `}>
                    <li>
                                <Link to="/" className={`${path === '/' ? 'font-bold underline' : ''} mr-4 hover:text-gray-300`}>
                                    Home
                                </Link>
                    </li>
                    <li>
                                <Link to="/products" className={`${path=== '/products' ? 'font-bold underline' : ''} mr-4 hover:text-gray-300`}>
                                    products
                                </Link>
                        </li>
                        <li>
                            <Link to="/about" 
                            className={`${path === '/about' ? 'font-bold underline' : ''} mr-4 hover:text-gray-300`}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" 
                            className={`${path=== '/contact' ? 'font-bold underline' : ''} mr-4 hover:text-gray-300`}>
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link to="/cart" 
                            className={`${path=== '/cart' ? 'font-bold underline' : ''} mr-4 hover:text-gray-300`}>
                                <Badge color="secondary" 
                                badgeContent={cartQuantity}
                                showZero
                                overlap="circular"
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                >
                                <FaShoppingCart size={30} />
                                </Badge>
                            </Link>
                        </li>
                        <li className="font-medium transition-all duration-300">

                            {
                                isUserLoggedIn ? (<AccountMenu />) :
                                 ( 
                                   <Link to="/login" 
                                    className="flex items-center hover:text-gray-300 space-x-2 px-4 py-1.5
                                    bg-linear-to-r from-purple-600 to-red-500  hover:from-blue-600 hover:to-blue-500
                                    text-white font-semibold rounded shadow-lg hover:shadow-xl">
                                        <FaSignInAlt/><span>Login</span>
                                    </Link>)
                            }
                           
                    </li>
                </ul>
                
            </div>
          
                
            
                        
        </div>  
         <button onClick={() => setOpenNavBar(!isOpenNavBar)}
                   className="md:hidden " >
                    {isOpenNavBar? (<CloseIcon />):(<MenuIcon />)}
        </button>
    </nav>
</div>;
}


export default Navbar;