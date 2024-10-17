import { configureStore } from '@reduxjs/toolkit';
import crudReducer from './slices/mainCrudSlice';
import inactiveCrudReducer from './slices/inactiveCrudSlice';
import authAndRegFormReducer from './slices/authAndRegForm';
import infModalReducer from './UISlices/infModalSlice';

const store = configureStore({
  reducer: {
    crud: crudReducer,
    inactiveCrud: inactiveCrudReducer,
    authAndRegForm: authAndRegFormReducer,
    infModal: infModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
