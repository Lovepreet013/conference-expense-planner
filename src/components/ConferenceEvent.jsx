import { useDispatch, useSelector } from "react-redux"
import { decrementQuantity, incrementQuantity } from "../slices/venueSlice"
import { decrementAddOnQuantity, incrementAddOnQuanity } from "../slices/addOnSlice"
import { useState } from "react"
import { toggleMealSelection } from "../slices/mealsSlice"
import TotalCost from "./TotalCost"

const ConferenceEvent = () => {
    const dispatch = useDispatch()
    
    const venueItems = useSelector((state) => state.venue)
    const addOnItems = useSelector((state) => state.addOn)
    const mealsItems = useSelector((state) => state.meals)

    const [numberOfPeople, setNumberOfPeople] = useState(1)
    const [showItems, setShowItems] = useState(false)

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
        if(addOnItems[index].quantity > 0){
            dispatch(decrementAddOnQuantity(index))
        }
    }

    //meal function
    const handleMealSelection = (index) => {
        dispatch(toggleMealSelection(index))
    }

    const handleToggleItems = () => {
        setShowItems(!showItems);
    }

    const getItemsFromTotalCost = () => {
        const items = [];
        venueItems.forEach((item) => {
          if (item.quantity > 0) {
            items.push({ ...item, type: "venue" });
          }
        });
        addOnItems.forEach((item) => {
          if (
            item.quantity > 0 &&
            !items.some((i) => i.name === item.name && i.type === "av")
          ) {
            items.push({ ...item, type: "av" });
          }
        });
        mealsItems.forEach((item) => {
          if (item.selected) {
            const itemForDisplay = { ...item, type: "meals" };
            if (item.numberOfPeople) {
              itemForDisplay.numberOfPeople = numberOfPeople;
            }
            items.push(itemForDisplay);
          }
        });
        return items;
    }

    const items = getItemsFromTotalCost()

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
    const venueTotalCost = calculateTotalCost('venue')
    const addOnTotalCost = calculateTotalCost('addOn')
    const mealsTotalCost = calculateTotalCost('meals')

    const totalCosts = {
        venue : venueTotalCost,
        addOn : addOnTotalCost,
        meals : mealsTotalCost
    }

    //ItemsDisplay Component
    const ItemsDisplay = ({ items }) => {
        return (
          <div className="my-6">
            <h4 className="text-xl font-bold mb-2">Selected Items</h4>
            {items.length === 0 && <p className="text-gray-500">No items selected.</p>}
            {items.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Name</th>
                                <th className="py-3 px-6 text-left">Unit Cost</th>
                                <th className="py-3 px-6 text-left">Quantity</th>
                                <th className="py-3 px-6 text-left">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {items.map((item, index) => (
                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-6 text-left whitespace-nowrap">{item.name}</td>
                                    <td className="py-3 px-6 text-left">${item.cost}</td>
                                    <td className="py-3 px-6 text-left">
                                        {item.type === "meals" || item.numberOfPeople
                                          ? `${numberOfPeople} people`
                                          : item.quantity}
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        ${item.type === "meals" || item.numberOfPeople
                                          ? `${item.cost * numberOfPeople}`
                                          : `${item.cost * item.quantity}`}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
          </div>
        );
    };

    return(
        <div className="container mx-auto p-4 md:p-8">
            {/* Venues Section */}
            <section className="bg-white p-6 md:p-8 rounded-lg shadow-lg mb-8" id="venue">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-6 border-b-4 border-blue-500 pb-2 text-center">Venues</h2>
                <div className="flex flex-wrap justify-center gap-6">
                    {venueItems.map((item, index) => (
                        <div key={index} className="w-full sm:w-[350px] p-4 border border-gray-200 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105">
                            <img src={item.img} alt={item.name} className="w-full h-48 object-cover rounded-md mb-4"/>
                            <h3 className="text-2xl font-bold text-gray-800 mb-1">{item.name}</h3>
                            <h4 className="text-xl font-semibold text-green-600 mb-4">${item.cost}</h4>
                            <div className="flex justify-evenly items-center">
                                <button 
                                    className="bg-red-500 text-white font-bold text-2xl w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer"
                                    onClick={() => handleRemoveFromCart(index)}
                                > - </button>
                                <h4 className="text-2xl font-bold text-gray-800">{item.quantity}</h4>
                                <button 
                                    className="bg-blue-500 text-white font-bold text-2xl w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                                    onClick={() => handleAddToCart(index)}
                                > + </button>
                            </div>
                        </div>
                    ))}
                </div>
                <h3 className="text-center text-3xl font-bold text-gray-800 mt-8 py-4 border-t-2 border-gray-200">Total Cost: <span className="text-green-600">${venueTotalCost}</span></h3>
            </section>

            {/* Add-ons Section */}
            <section className="bg-white p-6 md:p-8 rounded-lg shadow-lg mb-8 " id="addOn">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-6 border-b-4 border-blue-500 pb-2 text-center">Add-ons</h2>
                <div className="flex flex-wrap justify-center gap-6">
                    {addOnItems.map((item, index) => (
                        <div key={index} className="w-full sm:w-[350px] p-4 border border-gray-200 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105">
                            <img src={item.img} alt={item.name} className="w-full h-48 object-cover rounded-md mb-4"/>
                            <h3 className="text-2xl font-bold text-gray-800 mb-1">{item.name}</h3>
                            <h4 className="text-xl font-semibold text-green-600 mb-4">${item.cost}</h4>
                            <div className="flex justify-evenly items-center">
                                <button 
                                    className="bg-red-500 text-white font-bold text-2xl w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer"
                                    onClick={() => handleAddOnDecrement(index)}
                                > - </button>
                                <h4 className="text-2xl font-bold text-gray-800">{item.quantity}</h4>
                                <button 
                                    className="bg-blue-500 text-white font-bold text-2xl w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                                    onClick={() => handleAddOnIncrement(index)}
                                > + </button>
                            </div>
                        </div>
                    ))}
                </div>
                <h3 className="text-center text-3xl font-bold text-gray-800 mt-8 py-4 border-t-2 border-gray-200">Total Cost: <span className="text-green-600">${addOnTotalCost}</span></h3>
            </section>

            {/* Meal Selection Section */}
            <section className="bg-white p-6 md:p-8 rounded-lg shadow-lg mb-8" id="meals">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-6 border-b-4 border-blue-500 pb-2 text-center">Meal Selection</h2>
                <div className="flex flex-col items-center mb-8">
                    <label htmlFor="numberOfPeople" className="flex flex-col items-center">
                        <h3 className="text-xl font-bold text-gray-700 mb-2">Number of People:</h3>
                    </label>
                    <input
                        type="number"
                        id="numberOfPeople"
                        className="border border-gray-300 rounded-lg p-3 text-center w-24 text-lg focus:outline-none focus:border-blue-500 transition-colors duration-200"
                        value={numberOfPeople}
                        onChange={(e) => setNumberOfPeople(e.target.value)}
                        min="1"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mealsItems.map((item, index) => (
                        <div key={index} 
                             className={`flex items-center justify-between p-4 rounded-lg shadow-sm transition-all duration-200 border-2 
                             ${item.selected ? 'bg-blue-100 border-blue-500' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'} cursor-pointer`}
                        >
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`meal_${index}`}
                                    checked={item.selected}
                                    onChange={() => handleMealSelection(index)}
                                    className="form-checkbox h-5 w-5 text-blue-600 rounded cursor-pointer"
                                />
                                <label htmlFor={`meal_${index}`} className="ml-3 text-lg font-medium text-gray-800 cursor-pointer">
                                    {item.name}
                                </label>
                            </div>
                            <div className="text-xl font-bold text-green-600">${item.cost}</div>
                        </div>
                    ))}
                </div>
                <h3 className="text-center text-3xl font-bold text-gray-800 mt-8 py-4 border-t-2 border-gray-200">Total Cost: <span className="text-green-600">${mealsTotalCost}</span></h3>
            </section>
            
            {/* Total Cost Section */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg" id="total">
                <TotalCost
                    totalCosts={totalCosts}
                    handleClick={handleToggleItems}
                    ItemsDisplay={() => <ItemsDisplay items={items} />}
                />
            </div>
        </div>
    )
}

export default ConferenceEvent