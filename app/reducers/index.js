import { combineReducers } from 'redux';

// reducers
import isSideBarOpen from './reducer_sidemenu';
import categoryReducer from './category-reducer';
import searchReducer from './search-reducer';

const rootReducer = combineReducers({
    isSideBarOpen: isSideBarOpen,
    category: categoryReducer,
    search: searchReducer
});

export default rootReducer;
