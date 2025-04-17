import styles from "./Item.module.css"; 
const Item = (props) =>{
return  (
    <li className={`list-group-item ${styles.items}`}>
      {props.foodItem}
    </li>
  );
}

export default Item;