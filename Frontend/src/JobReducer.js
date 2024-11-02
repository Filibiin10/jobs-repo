// JobReducer.js

export const initialState = {
  jobs: [],
  user: JSON.parse(localStorage.getItem('user')) || null,
  categories: [],
  selectedCategory: "", // Load selected category from localStorage
};

// Job Reducer
export const jobReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_JOBS':
      return { ...state, jobs: payload.jobs };
    case 'SET_USER':
      return { ...state, user: payload.user };
    case 'SET_CATEGORIES':
      return { ...state, categories: payload.categories };
    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: payload.category };
    case 'LOGOUT_USER':
      return { ...state, user: null };
    default:
      return state;
  }
};
