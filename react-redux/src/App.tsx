// App.tsx
import React from "react";
import { Provider } from "react-redux";
import Counter from "./counter"; // Assuming the Counter component is in a file named Counter.tsx
import { Store } from "./store"; // Import your Redux store

const App: React.FC = () => {
  return (
    <Provider store={Store}>
      {" "}
      <div className="App">
        <h1>React Redux</h1>
        <Counter /> {/* Render the Counter component */}
      </div>
    </Provider>
  );
};

export default App;
