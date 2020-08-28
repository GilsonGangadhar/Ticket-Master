import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import Customer from './components/Customer'
import Departments from './components/departments/Departments'
import Employees from './components/employees/Employees'
import Tickets from './components/tickets/Tickets'
import AddCustomer from './components/AddCustomer'
import ShowCustomer from './components/ShowCustomer'
import EditCustomer from './components/EditCustomer'
import { connect } from 'react-redux'
import { startUserLogout } from './actions/registerAction'
import ShowDepartment from './components/departments/ShowDepartment';
import EditDepartment from './components/departments/EditDeparment'
import AddEmployee from './components/employees/AddEmployee'
import ShowEmployee from './components/employees/ShowEmployee'
import EditEmployee from './components/employees/EditEmployee'
import AddTicket from './components/tickets/AddTicket'
import ShowTicket from './components/tickets/ShowTicket'
import EditTicket from './components/tickets/EditTicket'
import TicketsCompleted from './components/tickets/CompletedTickets'


function App(props) {
    const handleLogout = () => {
        props.dispatch(startUserLogout())
    }
    return(
        <BrowserRouter>
                <div>
                    <h1>TicketMaster</h1>
            
                    {
                        Object.keys(props.user).length !== 0 ? (
                    <div>
                    <Link to="/">Home--</Link>
                    <Link to="/customer">Customer--</Link>
                    <Link to="/departments">Departments--</Link>
                    <Link to="/employees">Employees--</Link>
                    <Link to="/tickets">Tickets--</Link>
                    <Link to="#" onClick={handleLogout}>Logout</Link>
                     </div>
                    ) : (
                    <div>
                    <Link to="/">Home--</Link>
                    <Link to="/login">Login--</Link>
                    <Link to="/register">Register</Link>
                  </div>    
                        )
                    }
                    
                    
                    <Route path="/" component={Home} />
                    <Route path="/login" component={Login} exact={true} />
                    <Route path="/register" component={Register} exact={true} />
                    <Route path="/customer" component={Customer} />
                    <Route path="/departments" component={Departments} />
                    <Route path="/employees" component={Employees} />
                    <Route path="/tickets" component={Tickets} /> 
                    <Route path="/addCustomer" component={AddCustomer}/>
                    <Route path="/showCustomer" component={ShowCustomer} />
                    <Route path="/editCustomer/:id" component={EditCustomer} />
                    <Route path="/showDepartment" component={ShowDepartment}  />
                    <Route path="/editDepartment/:id" component={EditDepartment} />
                    <Route path="/addEmployee" component={AddEmployee} />
                    <Route path="/showEmployee" component={ShowEmployee} />
                    <Route path="/editEmployee/:id" component={EditEmployee} /> 
                    <Route path="/addTicket" component={AddTicket} /> 
                    <Route path="/showTicket" component={ShowTicket} />
                    <Route path="/editTicket/:id" component={EditTicket} />
                    <Route path="/completedTickets" component={TicketsCompleted} />
                   
               
                </div>
        </BrowserRouter>
    )
}

const mapStateToProps = (state) => {
    return {
        user : state.user
    }
}
export default connect(mapStateToProps)(App)