import styles from "./Item.module.css"; 
const Item = ({foodItem,handleBuyButton}) =>{


  // const handleBuyButtonClicked = (event) =>{
  //   console.log(event);
  //   console.log(`${foodItem} being bought..`)
  // }
return  (
    <li className={`list-group-item ${styles.items}`}>
      {foodItem}

      <button className={`${styles.button} btn btn-secondary`}
      onClick={handleBuyButton}
      >Buy</button>
    </li>
  );
}

export default Item;