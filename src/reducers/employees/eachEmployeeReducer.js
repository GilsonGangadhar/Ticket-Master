const employeeInitialValue = {}

const eachEmployeeReducer = (state = employeeInitialValue, action) => {
    switch(action.type) {
        case 'SET_EACH_EMPLOYEE' : {
            return action.payload
        }

        default : {
            return {...state}
        }
    }
}

export default eachEmployeeReducer