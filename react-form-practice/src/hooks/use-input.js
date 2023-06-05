import { useReducer } from 'react'

const initialStateReducer = {
    value: '',
    isTouched: false
};
const inputReducer = (state, action) => {
    if (action.type === 'INPUT') {
        return {value: action.value , isTouched: state.isTouched}
    }
    if (action.type === "BLUR") {
         return { isTouched: true, value:state.value };
    }
    if (action.type === "RESET") {
        return initialStateReducer;
    }
    return initialStateReducer
}
const useInput = (validateValue) => {
    const [inputState, dispatch] = useReducer(inputReducer, initialStateReducer)


    const valueIsValid = validateValue(inputState.value);
    const hasError = !valueIsValid && inputState.isTouched

    const valueChangeHandler=(e)=>{
       dispatch({type:'INPUT', value:e.target.value})
    }
    const valueBlurHandler=()=>{
      dispatch({ type: "BLUR" });
    }

    const reset=()=>{
       dispatch({ type: "RESET" });
    }

    return {
      value: inputState.value,
      isValid: valueIsValid,
      hasError,
      valueChangeHandler,
      valueBlurHandler,
      reset,
    };


}

export default useInput