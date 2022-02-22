import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { addCard, getSity, onChengeInput } from "../Redux/mainReduser"
import { getSityData } from './../API'
const Input = () => {
    const inputValue = useSelector(state => state.inputValue)
    const dispatch = useDispatch()

    const onChenge = (e) => {
        dispatch(onChengeInput(e.target.value))
    }

    const addSity = () => {
        dispatch(getSity(inputValue))
    }

    return (
        <div class="input-group" >
            <input
                style={{size:'100px'}}
                value={inputValue}
                onChange={onChenge}
                type="text"
                className="form-control w-10 "
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="button-addon2" />
            <button className="btn  btn-primary"
                type="button"
                id="button-addon2"
                onClick={addSity}>Add</button>
        </div>


    )
}

export default Input