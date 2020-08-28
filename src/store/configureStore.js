import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import usersReducer from '../reducers/usersReducer'
import costumersReducer from '../reducers/customers/customersReducer'
import departmentsReducer from '../reducers/departments/departmentsReducer'
import eachDepartmentReducer from '../reducers/departments/eachDepartmentReducer'
import employeesReducer from '../reducers/employees/employeesReducer'
import eachEmployeeReducer from '../reducers/employees/eachEmployeeReducer'
import ticketsReducer from '../reducers/tickets/ticketsReducer'
import eachTicketReducer from '../reducers/tickets/eachTicketReducer';
import eachCustomerReducer from '../reducers/customers/eachCustomerReducer';

const configureStore = () => {
    const store = createStore(combineReducers({
        user : usersReducer,
        customers : costumersReducer,
        eachCustomer : eachCustomerReducer,
        departments : departmentsReducer,
        eachDepartment : eachDepartmentReducer,
        employees : employeesReducer,
        eachEmployee : eachEmployeeReducer,
        tickets : ticketsReducer,
        eachTicket : eachTicketReducer


    }), applyMiddleware(thunk))
    return store
}

export default configureStore