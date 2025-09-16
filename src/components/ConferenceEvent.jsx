import { useDispatch, useSelector } from "react-redux"
import { decrementQuantity, incrementQuantity } from "../slices/venueSlice"

const ConferenceEvent = () => {
    const dispatch = useDispatch()
    
    const venueItems = useSelector((state) => state.venue) //'venue' name comes from the store.js 'venu' name

    //venue functions
    const handleAddToCart = (index) => {
        dispatch(incrementQuantity(index))
    }

    const handleRemoveFromCart = (index) => {
        if(venueItems[index].quantity > 0){
            dispatch(decrementQuantity(index))
        }
    }


    const calculateTotalCost = (section) => {
        let totalCost = 0
        if(section === 'venue'){
            venueItems.forEach((item) => {
                totalCost += item.cost * item.quantity
            })
        }

        return totalCost
    }

    //Total Cost
    const venuTotalCost = calculateTotalCost('venue')

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
        </div>
    )
}

export default ConferenceEvent