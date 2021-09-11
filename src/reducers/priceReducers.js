import { PRICE_BOOKING ,ADD_INSURANCES, ADD_BAGGAGE_SEATTYPE, SELECT_PAYMENT_METHOD} from "./actions/types";

const INSURANCE_PRICE = {
    travelInsurance:47000,
    covid19Insurance:30000,
    flightDelayInsurance:25000,
    baggageLossProtection:15000
}

const initialState = {
    insurances:{
        travelInsurance:false,
        covid19Insurance:false,
        flightDelayInsurance:false,
        baggageLossProtection:false,
    },
    travelerDetailList:[],
    totalPrice:0,
    paymentMethod:'',
    coupon:'',
    points:''
}

const calculateTotalPrice_Initial = (travelerDetailList) => {
    let totalPrice = 0
    travelerDetailList.map((data,index) => {
        //price base only, not add insurances, baggage, seat type
        totalPrice += data.departureFlight.price
        totalPrice += data.returnFlight.price   
    })
    return totalPrice
}

const calculateTotalPrice_Traveler = (travelerDetailList_Prev, newDataTraveler) => {
    let totalPrice = 0
    let travelerDetailList_Updated = travelerDetailList_Prev.map((item, index) => {
        if (index !== (newDataTraveler.id-1)) {
          return item
        }
        return {
          ...item,
          ...newDataTraveler
        }
    })
    travelerDetailList_Updated.map((data,index) => {
        //price after add baggage and choose seat number type
        let baggage = data.departureFlight.baggage
        let seatNumberType = data.departureFlight.seatNumberType
        totalPrice += data.departureFlight.price
        if(baggage===25){
            totalPrice += 155000  
        }else if(baggage===30){
            totalPrice += 290000  
        }else if(baggage===35){
            totalPrice += 400000  
        }

        baggage = data.returnFlight.baggage
        seatNumberType = data.returnFlight.seatNumberType
        totalPrice += data.returnFlight.price
        if(baggage===25){
            totalPrice += 155000  
        }else if(baggage===30){
            totalPrice += 290000  
        }else if(baggage===35){
            totalPrice += 400000  
        }
        
    })

    return totalPrice //update price
}

const calculateTotalPrice_Insurances = (prevTotalPrice, insurances) => {
    let totalPrice = prevTotalPrice
    Object.keys(insurances).map((key,index) => {
        if(insurances[key]){
            totalPrice += INSURANCE_PRICE[key] 
        }else{
            totalPrice -= INSURANCE_PRICE[key] 
        }
    })
    return totalPrice
}

const priceBookingReducer = (state = initialState,action) => {
    switch(action.type){
        case PRICE_BOOKING:
            return {
                ...state,
                travelerDetailList: action?.data?.travelerDetailList, //store first time
                totalPrice: calculateTotalPrice_Initial(action?.data?.travelerDetailList)
            }
        case ADD_INSURANCES:
            let insuranceType = ''
            Object.keys(action?.data).map((key,index) => {
                insuranceType=key
            })
            console.log(insuranceType)
            return {
                ...state,
                insurances: {
                    ...state.insurances,
                    [insuranceType]:action?.data[insuranceType]
                }, //add insurances
                totalPrice: calculateTotalPrice_Insurances(state.totalPrice,action?.data)
            }
        case ADD_BAGGAGE_SEATTYPE:
            return {
                ...state,
                travelerDetailList: state.travelerDetailList.map((item, index) => {
                    if (index !== (action?.data.id-1)) {
                      return item
                    }
                    return {
                      ...item,
                      ...action.data
                    }
                  }),
                totalPrice: calculateTotalPrice_Traveler(state.travelerDetailList,action?.data)
            }
         case SELECT_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod:action?.data
            }
        default:
            return state
    }
}

export default priceBookingReducer;

