import { calculatePaymentFrequency } from "../../../components/utils/productDetails.utils";


enum cartInfoActionKind  {
    INCREMENT_QUANTITY,
    DECREMENT_QUANTITY,
    INCREMENT_AMOUNT,
    DECREMENT_AMOUNT,
    CHANGE_DURATION
}

 type CartInfoProps = {
    totalQuantity: number,
    totalProductAmount: number,
    daily_payment: number,
    monthly_payment: number
    weekly_payment: number
    duration: number
}

 type cartInitializerType = {
    totalQuantity: number
    totalAmount: number
    duration: number
}

type cartInfoActionProps = {
    type: cartInfoActionKind
    payload: {
        duration?: number,
        quantity?: number,
        price?:number
    }
}
export function cartInfoReducer(state: CartInfoProps, action: cartInfoActionProps): CartInfoProps{

    let newQuantity
    let totalProductAmount
    let dailyPayment
    let weeklyPayment
    let monthlyPayment
    let paymentObj
    
    switch(action.type){
        case cartInfoActionKind.CHANGE_DURATION:
            const newDuration = action.payload.duration ?? 12

            //calculate payment frequency
            let {dailyPayment:daily_payment, weeklyPayment:weekly_payment, monthlyPayment:monthly_payment} =    calculatePaymentFrequency(newDuration, state.totalProductAmount)

            //return new cart state
            return {
                ...state,
                daily_payment,
                weekly_payment,
                monthly_payment,
                duration: newDuration
            }

            case cartInfoActionKind.INCREMENT_QUANTITY:
                newQuantity = state.totalQuantity + (action.payload?.quantity ?? 1)
                totalProductAmount = state.totalProductAmount + (action.payload?.price ?? 0)
                paymentObj= calculatePaymentFrequency( state.duration, totalProductAmount)
                dailyPayment = paymentObj.dailyPayment
                weeklyPayment = paymentObj.weeklyPayment
                monthlyPayment = paymentObj.monthlyPayment
    
                return {
                    ...state,
                    totalQuantity: newQuantity,
                    totalProductAmount,
                    daily_payment: dailyPayment,
                    weekly_payment: weeklyPayment,
                    monthly_payment: monthlyPayment
                }

                case cartInfoActionKind.DECREMENT_QUANTITY:
                    newQuantity =  state.totalQuantity - (action.payload.quantity ?? 1)
                    totalProductAmount = state.totalProductAmount - (action.payload?.price ?? 0)
                    paymentObj= calculatePaymentFrequency( state.duration, totalProductAmount)
                    dailyPayment = paymentObj.dailyPayment
                    weeklyPayment = paymentObj.weeklyPayment
                    monthlyPayment = paymentObj.monthlyPayment
        
                    
                    return {
                        ...state,
                        totalQuantity: newQuantity,
                        totalProductAmount,
                        daily_payment: dailyPayment,
                        weekly_payment: weeklyPayment,
                        monthly_payment: monthlyPayment
                    }
    
        default:
            return state
        }
    }

export function cartInitializer({duration, totalQuantity, totalAmount}: cartInitializerType): CartInfoProps{

    let {dailyPayment:daily_payment, weeklyPayment:weekly_payment, monthlyPayment:monthly_payment} = calculatePaymentFrequency(duration, totalAmount)

    return {
        daily_payment,
        weekly_payment,
        monthly_payment,
        totalQuantity,
        totalProductAmount: totalAmount,
        duration
    }
}

export const getTotalQuantity = (products: productType[]): number => {
    return products.reduce((initialValue, product) => initialValue + product.qty, 0)
}

export const getFrequencyAmount = (type: FrequencyType, cartInfo: CartInfoProps) => { 
    switch(type){
        case "daily":
            return cartInfo.daily_payment
        case "weekly":
            return cartInfo.weekly_payment
        case "monthly":
            return cartInfo.monthly_payment
    }
 }
