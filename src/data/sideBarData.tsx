import { BiMoney } from "react-icons/bi";
import { BsBagFill, BsPersonFill } from "react-icons/bs";


export const navigationLink = [
    {
        id: 1,
        name: 'Profile',
        path: '/profile',
        icon: <BsPersonFill />
    },
    
    {
        id: 2,
        name: 'Income',
        path: '/income',
        icon: <BiMoney />
    }, 
    {
        id: 3,
        name: 'Employer Plan',
        path: '/plans',
        icon: <BsBagFill />
    },
]


