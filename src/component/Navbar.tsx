import { BiMessageSquareDetail } from 'react-icons/bi';
import { FiSearch } from 'react-icons/fi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { generalImages } from '../utils/images';

const Navbar = () => {
  return (
    <div className=' bg-white  text-black fixed top-0 left-60 right-0 z-10'>
      <div className='flex items-center h-20 justify-between gap-6 w-full px-0 max-w-7xl mx-auto my-auto'>
        {/* Search Bar */}
        <div className='flex-1 max-w-md'>
          <div className='relative'>
            <input 
              type="text" 
              placeholder="Search here"
              className='w-full px-4 py-4 pl-4 pr-10 bg-neutral-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm'
            />
            <FiSearch className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />
          </div>
        </div>

        {/* Right Side - Icons and Profile */}
        <div className='flex items-center gap-4 ml-8 shrink-0'>
          {/* Message Icon */}
          <button className='p-2 bg-neutral-100 rounded-lg transition-colors relative'>
            <BiMessageSquareDetail className='w-5 h-5 text-neutral-800' />
          </button>

          {/* Notification Icon */}
          <button className='p-2 bg-neutral-100 rounded-lg transition-colors relative'>
            <IoMdNotificationsOutline className='w-6 h-6 text-neutral-800' />
            <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full'></span>
          </button>

          {/* User Profile */}
          <div className='flex items-center gap-3 ml-2'>
            <img 
              src={generalImages.profile}
              alt="Profile" 
              className='w-10 h-10 rounded-full object-cover'
            />
            <div className='min-w-max'>
              <p className='text-sm font-medium text-gray-800'>Ethan</p>
              <p className='text-xs text-gray-500'>ethan@aift.edu</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar