import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../utils/appSlice';
import { YOUTUBE_SEARCH_API } from '../utils/constants';
import { cacheResults } from '../utils/searchSlice';

const Head = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const searchCache = useSelector((store) => store.search);

    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchCache[searchQuery]) {
                setSuggestions(searchCache[searchQuery]);
            }
            else {
                getSearchSuggestions()
            }
        }, 100);

        return () => {
            clearTimeout(timer);
        };
    }, [searchQuery]);

    const getSearchSuggestions = async () => {

        const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
        const json = await data.json();
        setSuggestions(json[1]);

        dispatch(
            cacheResults({
                [searchQuery]: json[1],
            })
        );
    };

    const toggleMenuHandler = () => {
        dispatch(toggleMenu());
    };

    return (
        <div className='grid grid-flow-col p-5 m-2 shadow-lg '>
            <div className='flex col-span-1'>
                <img
                    onClick={() => toggleMenuHandler()}
                    className='h-8 cursor-pointer'
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/276px-Hamburger_icon.svg.png"
                    alt="menu"
                />

                <a href='/' >
                    <img
                        className='h-8 mx-2'
                        src="https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg"
                        alt="Youtube-Logo"
                    />
                </a>
            </div>
            <div className='col-span-10 px-10 '>
                <div className=''>
                    <input
                        className="px-5 w-7/12 border border-gray-400 p-2 rounded-l-full"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setShowSuggestions(false)}
                    />
                    <button
                        className="border border-gray-400 px-5 py-2 rounded-r-full bg-gray-100">
                        🔍
                    </button>
                </div>
                {showSuggestions && (<div className='fixed bg-white py-2 px-2 mt-1 w-[34rem] shadow-lg rounded-lg border border-gray-100 cursor-default'>
                    <ul>
                        {suggestions.map((s) => (
                            <li key={s} className='py-2 px-3 shadow-sm hover:bg-gray-200'>
                                🔍 {s}
                            </li>
                        ))}
                    </ul>
                </div>)}
            </div>
            <div col-span-1>
                <img
                    className='h-8'
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJMuGhZDrprb6LDwxLGFPQJmbUeDLIQN5y8BZDgL1Bzfi8Q5hLYiVHiOAE3A&s"
                    alt="user" />
            </div>
        </div>
    )
};

export default Head;
