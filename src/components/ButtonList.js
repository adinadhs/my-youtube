import React from 'react';
import Button from './Button';

const ButtonList = () => {

    const list = ["All", "Live", "Music", "Mixes", "News", "Debates", "Cinema", "Comedy", "arts", "Recent", "Watched", "New"];
    return (
        <div className="flex overflow-x-auto">
            <div className="flex">
                {list.map((section, index) => <Button key={index} name={section} />)}
            </div>
        </div>
    )
};

export default ButtonList;
