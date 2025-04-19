import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorMessage from "./components/ErrorMessage";
import FoodItems from "./components/FoodItems";
import Container from "./components/Container";
import FoodInput from "./components/FoodInput";


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
      <Container asdf="asdfasdf">
        <h1 className="textheading">Healthy Foods</h1>
        <ErrorMessage mereItems={foodItems} />
        <FoodInput></FoodInput>
        <FoodItems mereItems={foodItems} />
      </Container>
      <Container>
        <p>Healthy Foods list is shown above.</p>
      </Container>
    </>
  );
}

export default App;
