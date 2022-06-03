import React from 'react';
import '../App.css';


const Calculator = ({onClick = () =>{}, action = ''}) => {
	const handClick = () =>{
		onClick(action) //callback data
	}
	let bigclass;
	switch (action){
		case '=':
			bigclass = 'span-two'
			break;
		default:
	}
	return (

			<button className={bigclass} onClick={handClick}>{action}</button>

	);
};

export default Calculator;