// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
// import các slice của bạn vào đây

export const store = configureStore({
  reducer: {
    // sliceName: sliceReducer,
  },
});

// Kiểu TypeScript cho useSelector/useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
