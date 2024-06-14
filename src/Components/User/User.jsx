import React, {useEffect, useState} from 'react';
import './user.scss'
import {getDataAboutUser} from "../../Service/service";

const User = () => {
    const [userData,setUserData] = useState([])
    const [modal,setModal] = useState(false)

    useEffect(() => {
        getDataAboutUser('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGF0SWQiOjYzNDc4OTU5OSwiaWF0IjoxNzE4MTMwODI1fQ.xqNldflSAKJIxuezPGgGidSf7-IhSZC_KQWlQHHOAQM').then(r => setUserData(r))
    }, []);
    const showModal = () =>{
        setModal(!modal)
    }
    return (
        <div className='user'>
            <svg onClick={showModal} xmlns="http://www.w3.org/2000/svg" className="feather feather-user" fill="none" height="24"
                 stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                 viewBox="0 0 24 24" width="24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
            </svg>
            {modal && (
                <div className="user_modal">
                    {userData ?
                        <>
                            <p>{userData.thisUser?.phoneNumber}</p>
                            {/*<p>{userData.thisUser?.userName}</p>*/}
                        </>
                        : null
                    }
                </div>
            )}
        </div>
    );
};

export default User;