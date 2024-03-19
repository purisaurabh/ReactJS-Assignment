import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from "../reducer/CounterReducer";

export default configureStore({
  reducer: {
    counter: CounterReducer,
  },
});
