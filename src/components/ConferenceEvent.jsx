import { useDispatch, useSelector } from "react-redux"
import { decrementQuantity, incrementQuantity } from "../slices/venueSlice"
import { decrementAddOnQuantity, incrementAddOnQuanity } from "../slices/addOnSlice"
import { useState } from "react"
import { toggleMealSelection } from "../slices/mealsSlice"

const ConferenceEvent = () => {
    const dispatch = useDispatch()
    
    const venueItems = useSelector((state) => state.venue) //'venue' name comes from the store.js 'venu' name
    const addOnItems = useSelector((state) => state.addOn)
    const mealsItems = useSelector((state) => state.meals)

    const [numberOfPeople, setNumberOfPeople] = useState(1)

    //venue functions
    const handleAddToCart = (index) => {
        dispatch(incrementQuantity(index))
    }

    const handleRemoveFromCart = (index) => {
        if(venueItems[index].quantity > 0){
            dispatch(decrementQuantity(index))
        }
    }

    //addOn functions
    const handleAddOnIncrement = (index) => {
        dispatch(incrementAddOnQuanity(index))
    }

    const handleAddOnDecrement = (index) => {
        dispatch(decrementAddOnQuantity(index))
    }

    //meal function
    const handleMealSelection = (index) => {
        dispatch(toggleMealSelection(index))
    }


    const calculateTotalCost = (section) => {
        let totalCost = 0
        if(section === 'venue'){
            venueItems.forEach((item) => {
                totalCost += item.cost * item.quantity
            })
        }
        else if(section === 'addOn'){
            addOnItems.forEach((item) => {
                totalCost += item.cost * item.quantity
            })
        }
        else if (section === 'meals'){
            mealsItems.forEach((item) => {
                if (item.selected) {
                  totalCost += item.cost * numberOfPeople;
                }
            })
        }

        return totalCost
    }

    //Total Cost
    const venuTotalCost = calculateTotalCost('venue')
    const addOnTotalCost = calculateTotalCost('addOn')
    const mealsTotalCost = calculateTotalCost('meals')

    return(
        <div>
            <section>
                <h2 className="text-5xl">Venues</h2>
                <div className="flex flex-wrap gap-2">
                    {venueItems.map((item, index) => (
                        <div key={index} className="w-[350px] h-[400px] border-1" >
                            <img src={item.img} alt={item.name} />
                            <h3>{item.name}</h3>

                            <h4>${item.cost}</h4>

                            <div className="flex justify-evenly items-center">
                                <button 
                                    className="border px-3 py-1 text-2xl cursor-pointer"
                                    onClick={() => handleRemoveFromCart(index)}
                                >   
                                    -
                                </button>
                                <h4>{item.quantity}</h4>
                                <button 
                                    className="border px-3 py-1 text-2xl cursor-pointer"
                                    onClick={() => handleAddToCart(index)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <h3 className="text-center my-5 p-2 border-1">Total Cost : {venuTotalCost}</h3>
            </section>

            <section>
                <h2 className="text-5xl">Add-ons</h2>
                <div className="flex flex-wrap gap-2">
                    {addOnItems.map((item, index) => (
                        <div key={index} className="w-[350px] h-[400px] border-1" >
                            <img src={item.img} alt={item.name} />
                            <h3>{item.name}</h3>

                            <h4>${item.cost}</h4>

                            <div className="flex justify-evenly items-center">
                                <button 
                                    className="border px-3 py-1 text-2xl cursor-pointer"
                                    onClick={() => handleAddOnDecrement(index)}
                                >   
                                    -
                                </button>
                                <h4>{item.quantity}</h4>
                                <button 
                                    className="border px-3 py-1 text-2xl cursor-pointer"
                                    onClick={() => handleAddOnIncrement(index)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <h3 className="text-center my-5 p-2 border-1">Total Cost : {addOnTotalCost}</h3>
            </section>

            <section>
                <h2 className="text-5xl">Meal Selection</h2>

                <div>
                    <label htmlFor="numberOfPeople">
                    <h3>Number of People:</h3>
                    </label>
                    <input
                        type="number"
                        id="numberOfPeople"
                        className="border-1"
                        value={numberOfPeople}
                        onChange={(e) => setNumberOfPeople(e.target.value)}
                        min="1"
                    />

                    <div>
                        {mealsItems.map((item, index) => (
                            <div key={index}>

                                <input
                                    type="checkbox"
                                    id={`meal_${index}`}
                                    checked={item.selected}
                                    onChange={() => handleMealSelection(index)}
                                />

                                <label htmlFor={`meal_${index}`}>{item.name}</label>

                                <div>${item.cost}</div>
                          </div>
                        ))}
                    </div>
              </div>

              <h3 className="text-center my-5 p-2 border-1">Total Cost : {mealsTotalCost}</h3>
            </section>
        </div>
    )
}

export default ConferenceEvent