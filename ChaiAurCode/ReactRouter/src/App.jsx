import { useState } from "react";

import "./App.css";
import Header from "./components/Header/header";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="bg-orange-400 text-sm text-black p-4 ">React Router</h1>
      <Header />
    </>
  );
}

export default App;
