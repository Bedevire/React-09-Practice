import { useState } from 'react'

export default function Input({isTextArea, label, initialValue, onValueChange, ...props}){

    const [inputValue, setInputValue] = useState(initialValue);

    function onInputChange(event){
        setInputValue(event.target.value);
        onValueChange(event);
    }

    return(
        <div>
            <label className="text-sm font-bold uppercase text-stone-500">{label}</label>
            
            {!isTextArea && 
                <input 
                    type="text" 
                    value={inputValue} 
                    onChange={onInputChange} 
                    className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"  
                    {...props}>
                </input>}
            
            {isTextArea && 
                <textarea 
                    type="textArea"
                    value={inputValue} 
                    onChange={onInputChange} 
                    className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"  
                    {...props}>
                </textarea>}
        </div>
    )
}