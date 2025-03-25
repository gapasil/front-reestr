import { configureStore } from '@reduxjs/toolkit';
import crudReducer from './slices/mainCrudSlice';
import inactiveCrudReducer from './slices/inactiveCrudSlice';
import authAndRegFormReducer from './slices/authAndRegForm';
import disputReducer from './slices/disputSlice';
import infModalReducer from './UISlices/infModalSlice';
import candidateReducer from './slices/candidateSlice';

const store = configureStore({
  reducer: {
    crud: crudReducer,
    inactiveCrud: inactiveCrudReducer,
    authAndRegForm: authAndRegFormReducer,
    infModal: infModalReducer,
    disput: disputReducer,
    candidate: candidateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
