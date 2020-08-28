import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { startGetAllEmployees } from '../../actions/employeesAction'
import { startGetAllDepartments } from '../../actions/departmentsAction'
import { startGetAllCustomers } from '../../actions/customerAction'
import { startPostTicket } from '../../actions/ticketsAction'

class AddTicket extends React.Component {
    constructor(){
        super() 
        this.state = {
            code : '', 
            customer : '',
            department : '', 
            employees : '',
            priority : '',
            message : ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handlePriority = (priority) => {
        this.setState({priority})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let object = {
            code : this.state.code,
            customer : this.state.customer, 
            department : this.state.department, 
            employees : [
                {
                    id : this.state.employees
                }
            ],
            priority : this.state.priority,
            message : this.state.message
        }
        //console.log(object, "sending object")
        const redirect = () => {
            return this.props.history.push("/tickets")
        }
        this.props.dispatch(startPostTicket(object,redirect))
    }

    componentDidMount() {
        this.props.dispatch(startGetAllEmployees())
        this.props.dispatch((startGetAllDepartments()))
        this.props.dispatch((startGetAllCustomers()))
    }

    render(){
        console.log(this.props.departments, "all departments")
        console.log(this.props.employees, "all employees")
        console.log(this.props.customers, "all customers")
        return (
            <div>
                <h3>Add Ticket</h3><br/><br/>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="code">Code: </label>
                    <input type="text" id="code" name="code" value={this.state.code} onChange={this.handleChange} /><br/><br/>
                    <label htmlFor="customer">Customer:  </label>
                    <select id="customer" name="customer" value={this.state.customer} onChange={this.handleChange} >
                        <option value =''>--select--</option>
                        {
                           this.props.customers.map((ele, i) => {
                               return (
                                <option key={i} value ={`${ele._id}`}>{ele.name}</option>
                               )
                           })
                       }
                    </select><br/><br/>
                    <label htmlFor="department">Department: </label>
                    <select id="department" name="department" value={this.state.department} onChange={this.handleChange}>
                    <option value =''>--select--</option>
                       {
                           this.props.departments.map((ele, i) => {
                               return (
                                <option key={i} value ={`${ele._id}`}>{ele.name}</option>
                               )
                           })
                       }
                    </select><br/><br/>
                    <label htmlFor="employees">Employees: </label>
                    <select id="employees" name="employees" value={this.state.employees} onChange={this.handleChange}>
                        <option value =''>--select--</option>
                        {
                           this.props.employees.filter(em => em.department._id == this.state.department).map((ele, i) => {
                               return (
                                <option key={i} value ={`${ele._id}`}>{ele.name}</option>
                               )
                           })
                       }
                    </select><br/><br/>
                    <label htmlFor="message">Message: </label><br/>
                    <textarea rows="4" cols="50" id="message" name="message" value={this.state.message} onChange={this.handleChange} /><br/><br/>

                    <label>Priority</label><br/>

                    <input type="radio" id="high" name="priority" value={this.state.priority} onChange={() => {this.handlePriority('high')}} checked={this.state.priority == 'high'} /><label htmlFor="high"> High</label><br/>

                    <input type="radio" id="medium" name="priority" value={this.state.priority} onChange={() => {this.handlePriority('medium')}} checked={this.state.priority == 'medium'} /><label htmlFor="medium"> Medium</label><br/>

                    <input type="radio" id="low" name="priority" value={this.state.priority} onChange={() => {this.handlePriority('low')}} checked={this.state.priority == 'low'} /><label htmlFor="low"> Low</label><br/><br/>

                    <input type="submit" value="Submit" />

                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        customers : state.customers,
        departments : state.departments,
        employees : state.employees
    }
}

export default connect(mapStateToProps)(AddTicket)