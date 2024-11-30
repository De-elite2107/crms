// store.js
import { createStore, action, persist } from 'easy-peasy';

const storeModel = {
    user: {
        user_id: null,
        username: '',
        email: '',
    },
    setUser: action((state, payload) => {
        state.user = payload; // Update the user state with the payload
    }),
    clearUser: action((state) => {
        state.user = { id: null, username: '', email: '' }; // Reset user state
    }),
};

const store = createStore(persist(storeModel));

export default store;