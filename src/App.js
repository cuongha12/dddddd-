import './App.css';
import React, {useCallback, useState} from 'react';
import Calculator from "./Component/Calculator";

function App() {
	const Array = ['AC','CE','DEL','/','7','8','9','*','4','5','6','+','1','2','3','-','.','0','=']
	const [result, setResult] = useState('');
	//hook

	const [calculator, setCalculator] = useState('');
	const onAction = useCallback((value) => {
		if(!isNaN(parseInt(value))) {
			setResult(result + value);
		}else {
			switch (value){
				case ".":
					setResult(result + value);
					break;
				case "+":
				case "-":
				case "*":
				case "/":
					setCalculator(result + value)
					setResult('')
					break;
				case "=":
					const equal = calculator.split('').find(x=>x==="=")
					const sign = calculator.split('').find(x=>x==="+"||x==="-"||x==="*"||x==="/")
					let previous = parseFloat(calculator.split(sign)[0])
					let current = parseFloat(result)
					if(equal) {
						const previousCalculator = calculator.split(equal)[0]
						const nextNumber = previousCalculator.split(sign)[1]
						current = parseFloat(nextNumber)
						previous = parseFloat(result)
						if(isNaN(parseInt(nextNumber))){
							return nextNumber;
						}else {
							setCalculator(previous + sign + current + '=')

						}
					}else{
						setCalculator(calculator + result + "=")
					}
					switch (sign){
						case "+":
							setResult((previous + current).toString())
							break;
						case "-":
							setResult((previous - current).toString())
							break;
						case "*":
							setResult((previous*current).toString())
							break;
						case "/":
							setResult((previous / current).toString())
							break;
						default:
					}

					break;
				case "AC":
					setResult("")
					setCalculator("");
					break;
				case "DEL":
					setResult((result.slice(0,result.length-1)))
					break;
				case "CE":
					setResult("");
					break;
				default:
			}
		}



	},[result,calculator]);
	return (
		<div className="App">
			<div className={'calculator'}>
				<div className={'output'}>
					<div className={'previous'}>
						{calculator}
					</div>
					<div className={'current'}>
						{result}
					</div>
				</div>
				{
					Array.map((el)=>(
						<Calculator onClick={onAction} action={el} key={el}/>
					))
				}
			</div>
		</div>
	);
}

export default App;
