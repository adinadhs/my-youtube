import React from 'react';

const VideoCard = ({ info }) => {
    const { snippet } = info;
    if (!snippet) {
        return null;
    };

    const { channelTitle, thumbnails, title } = snippet;

    return (
        <div className="p-2 m-1 w-72">
            <img className="rounded-lg" alt="thumbnail" src={thumbnails.medium.url} />
            <ul>
                <li className="font-bold py-2">{title}</li>
                <li>{channelTitle}</li>
            </ul>
        </div>
    )
};

export default VideoCard;
