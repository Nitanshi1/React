import { useState } from "react";
// import Card from "./components/Card";
import CurrencyApp from "./Pages/CurrencyApp";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import { InputBox } from "./components";
import './App.css';
// import Password from "./components/passwordGenerator";

function App() {
  // const [count, setCount] = useState(0);
  // let myArr = {
  //   username: "nitanshi",
  //   age: "22",
  // };
  // let newArr = [1, 2, 3, 4];
  // return (
  //   <>
  //     {/* <h1 className="text-3xl font-bold underline p-4 rounded-2xl bg-blue-200 mb-4">
  //       Hello world!
  //     </h1> */}

  //     {/* <Card  username="ChaiAurCode" someObject={myArr} someObject={newArr} />  */}
  //     {/* <Card  username="ChaiAurCode" btnText="Click profile"  /> */}

  //     {/* <Card  username="Nitanshi" btnText="See profile"/> */}
  //     {/* <Password /> */}

  //     {/* <CurrencyApp /> */}
  //   </>
  // );


  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)

  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }
  
  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }

  return (
    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
        }}
    >
        <div className="w-full">
            <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        convert()
                       
                    }}
                >
                    <div className="w-full mb-1">
                        <InputBox
                            label="From"
                            amount={amount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => setAmount(amount)}
                            selectCurrency={from}
                            onAmountChange={(amount) => setAmount(amount)}
                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-black px-2 py-0.5"
                            onClick={swap}
                        >
                            swap
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-4">
                        <InputBox
                            label="To"
                            amount={convertedAmount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => setTo(currency)}
                            selectCurrency={to}
                            amountDisable
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-black px-4 py-3 rounded-lg">
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    </div>
);
}

export default App;
