// App.tsx
import React from "react";
import { Provider } from "react-redux";
import { Counter } from "./components/Counter";
import store from "./api/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      {" "}
      <div className="App">
        <Counter />
      </div>
    </Provider>
  );
};

export default App;
