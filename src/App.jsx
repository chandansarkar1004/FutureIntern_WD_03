import { useState, useEffect } from 'react';

function App() {
  const [expression, setExpression] = useState('');

  useEffect(()=>{
    if(expression){
      localStorage.setItem("calculator_data", expression);
    }
  }, [expression]);

  useEffect(()=>{
    const calculatorData = localStorage.getItem("calculator_data");
    if(calculatorData){
      setExpression(calculatorData);
    }
  }, [])

  const numberList = Array.from({ length: 10 }, (_, i) => i);
  const symbolList = ['+', '-', '*', '/', '.'];

  const handleNumberClick = (num) => {
    setExpression((prev) => {
    if(prev+num === "0"){
      return prev
    }
    return prev + num;
    });
  };

  const handleClear = () => {
    setExpression((prev)=> prev.slice(0, -1))
  }

  const handleSymbolClick = (sym) => {
    setExpression((prev) => {
      const lastChar = prev.slice(-1);
      if (symbolList.includes(lastChar) && symbolList.includes(sym)) {
        return prev;
      }
      return prev + sym;
    });
  };

  const evaluateExpression = () => {
    try {
      if(expression.length === 0) return;
      
      let result = '';
      if(expression[0] === "0"){
         result += expression.slice(1);
      }
      
      const finalResult = eval(result || expression);
      setExpression(finalResult.toString());
      
    } catch (error) {
      setExpression('Invalid Input!');
    }
  };

  const clearExpression = () => {
    setExpression('');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-green-500">
      <div className="bg-gray-800 p-6 min-w-[300px] rounded-lg shadow-lg w-64">
        <div className="bg-gray-300 text-black text-2xl p-4 rounded mb-4 text-right min-h-28">
          {expression || "0"}
        </div>
        <div className="grid grid-cols-4 gap-2">
          <button onClick={handleClear} className="bg-gray-600 text-white text-lg font-semibold py-2 rounded hover:bg-gray-700">DEL</button>
          {numberList.map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              className="bg-gray-600 text-white text-lg font-semibold py-2 rounded hover:bg-gray-700"
            >
              {num}
            </button>
          ))}
          {symbolList.map((sym, i) => (
            <button
              key={i}
              onClick={() => handleSymbolClick(sym)}
              className="bg-gray-600 text-white text-lg font-semibold py-2 rounded hover:bg-gray-700"
            >
              {sym}
            </button>
          ))}
          
          <button
            onClick={clearExpression}
            className="col-span-2 bg-red-500 text-white text-lg font-semibold py-2 rounded hover:bg-red-600"
          >
            Reset
          </button>

          <button
            onClick={evaluateExpression}
            className="col-span-2 bg-orange-500 text-white text-lg font-semibold py-2 rounded hover:bg-orange-600"
          >
            =
          </button>

        </div>
      </div>
    </div>
  );
}

export default App;
