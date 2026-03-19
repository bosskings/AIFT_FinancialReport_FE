import { BiMoney } from "react-icons/bi";
import { BsFillShieldFill, BsPersonFill } from "react-icons/bs";
import { IoBag } from "react-icons/io5";
import { LuGoal } from "react-icons/lu";
import { PiBankFill } from "react-icons/pi";


export const navigationLink = [
    {
        id: 1,
        name: 'Profile',
        path: '/questionnaire/profile',
        icon: <BsPersonFill />
    },
    
    {
        id: 2,
        name: 'Income',
        path: '/questionnaire/income',
        icon: <BiMoney />
    }, 
    {
        id: 3,
        name: 'Employer Plan',
        path: '/questionnaire/plans',
        icon: <IoBag />
    },
    {
        id: 4,
        name: 'IRAs',
        path: '/questionnaire/iras',
        icon: <PiBankFill />
    },

    // {
    //     id: 5,
    //     name: 'Social Security',
    //     path: '/questionnaire/social-security',
    //     icon: <BsFillShieldFill />
    // },

    {
        id: 5,
        name: 'Goals',
        path: '/questionnaire/goals',
        icon: <LuGoal />
    },
]


