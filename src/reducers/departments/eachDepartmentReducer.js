const deparmentInitialValue = {}

const eachDepartmentReducer = (state = deparmentInitialValue, action) => {
    switch(action.type) {
        case 'SET_EACH_DEPARTMENT' : {
            return action.payload
        }

        default : {
            return {...state}
        }
    }
}

export default eachDepartmentReducer