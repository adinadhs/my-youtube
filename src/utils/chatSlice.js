import { createSlice } from "@reduxjs/toolkit"
import { LIVE_CHAT_COUNT } from "./constants";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        messages: [],
    },
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
            if (state.messages.length > LIVE_CHAT_COUNT) {
                // Remove the oldest message
                state.messages.shift();
            }

        },
    },

});

export const { addMessage } = chatSlice.actions;

export default chatSlice.reducer;