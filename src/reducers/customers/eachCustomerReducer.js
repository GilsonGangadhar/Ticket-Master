const customerInitialValue = {}

const eachCustomerReducer = (state = customerInitialValue, action) => {
    switch(action.type) {
        case 'SET_EACH_CUSTOMER' : {
            return action.payload
        }

        default : {
            return {...state}
        }
    }
}

export default eachCustomerReducer