import React from 'react';

const commentsData = [
    {
        name: "adinadh",
        text: "The information the video is so good and informative",
        replies: [

        ]
    },
    {
        name: "slan",
        text: "Lorem ipsum",
        replies: [
            {
                name: "slan",
                text: "Lorem ipsum",
            },
        ]
    },
    {
        name: "adinadh",
        text: "Lorem ipsum",
    },
    {
        name: "adinadh",
        text: "Lorem ipsum",
        replies: [
            {
                name: "slan",
                text: "Lorem ipsum",
                replies: [
                    {
                        name: "slan",
                        text: "Lorem ipsum",
                        replies: [
                            {
                                name: "slan",
                                text: "Lorem ipsum",
                            },
                        ]
                    },
                ]
            },
        ]
    },
    {
        name: "adinadh",
        text: "Lorem ipsum",
    },
    {
        name: "adinadh",
        text: "Lorem ipsum",
    },
];

const Comment = ({ data }) => {
    const { name, text } = data;
    return (
        <div className='flex bg-gray-100 rounded-lg p-2 my-2'>
            <img className='w-12 h-12'
                alt="user"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJMuGhZDrprb6LDwxLGFPQJmbUeDLIQN5y8BZDgL1Bzfi8Q5hLYiVHiOAE3A&s" />

            <div className='px-3'>
                <p className='font-bold'>{name}</p>
                <p>{text}</p>
            </div>
        </div>
    );
};

const CommentsList = ({ comments }) => {

    return (comments.map((comment, index) => (
        <div key={index}>
            <Comment data={comment} />
            {comment.replies && (
                <div className='pl-5 border border-l-black ml-5'>
                    <CommentsList comments={comment.replies} />
                </div>
            )}
        </div>
    )));
};

const CommentsContainer = () => {
    return (
        <div className='m-5 p-2'>
            <h1 className='text-2xl font-bold'>Comments: </h1>
            <CommentsList comments={commentsData} />
        </div>
    )
}

export default CommentsContainer;
