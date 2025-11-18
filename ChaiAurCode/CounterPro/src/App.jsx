import { useState } from "react";

function App() {
  // let counter = 5;
  let [counter, setCounter] = useState(15);
  const addValue = () => {
    if (counter < 20) {
      setCounter(counter + 1);
    } else {
      alert("Counter cannot be more than 20!");
    }
    // console.log("clicked", Math.random());

    // console.log("clicked", counter);

    // counter = counter + 1;
    // setCounter(counter); // method ko update krnege y toh ese y fir setCounter(counter+1)
  };

  const removeValue = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    } else {
      alert("Counter cannot be less than 0!");
    }

    // setCounter(counter -1 );
  };
  return (
    <>
      <h1>Project !</h1>
      <h2>Counter Value : {counter} </h2>

      <button onClick={addValue}>Add Value </button>
      <br />
      <button onClick={removeValue}>Remove Value </button>
    </>
  );
}

export default App;
