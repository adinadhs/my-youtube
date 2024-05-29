import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { generateRandomName, makeRandomMessage } from "../utils/helper";
import ChatMessage from "./ChatMessage";

const LiveChat = () => {
    const [liveMessage, setLiveMessage] = useState("");
    const dispatch = useDispatch();

    const chatMessages = useSelector((store) => store.chat.messages);

    useEffect(() => {
        const i = setInterval(() => {
            // API Polling

            dispatch(
                addMessage({
                    name: generateRandomName(),
                    message: makeRandomMessage(20) + " 🚀",
                })
            );
        }, 2000);

        return () => clearInterval(i);
    }, [dispatch]);

    return (
        <>
            <div className="w-full h-[600px] ml-2 p-2 border border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse">
                <div>
                    {
                        // Disclaimer: Don't use indexes as keys
                        chatMessages.map((c, i) => (
                            <ChatMessage key={i} name={c.name} message={c.message} />
                        ))
                    }
                </div>
            </div>

            <form
                className="w-full p-2 ml-2 border border-black flex flex-row"
                onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(
                        addMessage({
                            name: "adinadh",
                            message: liveMessage,
                        })
                    );
                    setLiveMessage("");
                }}
            >
                <div >
                    <input
                        class="bg-gray-100 placeholder:Chat... placeholder:opacity-50 rounded-full 
                         px-6 py-1 shadow-md focus:shadow-lg text-left"
                        placeholder="Chat..."
                        type="text"
                        value={liveMessage}
                        onChange={(e) => {
                            setLiveMessage(e.target.value);
                        }}
                    />

                    <button className="px-2 mx-2 bg-gray-200 hover:bg-gray-300 rounded-full">
                        Send
                    </button>
                </div>
            </form>
        </>
    );
};
export default LiveChat;