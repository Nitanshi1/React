import styles from "./BtnContainer.module.css";

const BtnContainer = () => {
  const buttons = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
    "+",
    "C",
  ];
  return (
    <div className={styles.buttonContainer}>
      {buttons.map((button) => (
        <button className={styles.button}>{button}</button>
      ))}
    </div>
  );
};
export default BtnContainer;
