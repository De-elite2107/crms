// store.js
import { createStore, action } from 'easy-peasy';

const storeModel = {
    user: {
        id: null,
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

const store = createStore(storeModel);

export default store;