function ErrorMessage({ mereItems }) {
    if (mereItems.length === 0) {
      return <h3 className="text-center text-danger">I am still Hungry!</h3>;
    }
    return null;
  }
  
  export default ErrorMessage;
  