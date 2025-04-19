import styles from "./FoodInput.module.css"

const FoodInput = () =>{


    const handleOnChange = (event)=>{
        console.log(event.target.value)
    }
return <div className={styles.main}>
    <input type="text" placeholder="Enter your food here.." className={styles.foodinput} 
    onChange={handleOnChange }/>

    </div>
    }

export default FoodInput;