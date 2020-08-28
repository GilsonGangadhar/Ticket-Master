const customersInitialState = []

const customersReducer = (state = customersInitialState, action) => {
    switch(action.type) {
        case 'SET_CUSTOMERS' : {
            return action.payload
        }

        default : {
          return  [...state]
        }
    }
}

export default customersReducer
