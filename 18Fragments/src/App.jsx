import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorMessage from "./components/ErrorMessage";
import FoodItems from "./components/FoodItems";
function App() {
  let foodItems = [
    "Dal",
    "Paneer",
    "Cucumber",
    "Milk",
    "Green Vegetables",
    "Butter",
  ];
  // let emptyMessage = foodItems.length === 0 ? <h3>I am still Hungry.</h3> : null;

  return (
    <>
      <h1 className="textheading">Healthy Foods</h1>
      <ErrorMessage mereItems={foodItems} />
<FoodItems mereItems={foodItems} />

    </>
  );
}

export default App;
