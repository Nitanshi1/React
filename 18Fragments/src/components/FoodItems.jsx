
import Item from "./Item";

function FoodItems({ mereItems }) {
  return (
    <ul className="list-group m-3">
      {mereItems.map((item, index) => (
        <Item key={index} foodItem={item} />
      ))}
    </ul>
  );
}

export default FoodItems;
