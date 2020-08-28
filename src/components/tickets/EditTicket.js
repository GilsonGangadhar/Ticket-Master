import React from 'react'
import { connect } from 'react-redux'
import { startTicketUpdate } from '../../actions/ticketsAction'

class EditTicket extends React.Component {
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
        
        const redirect = () => {
            return this.props.history.push("/showTicket")
        }
        this.props.dispatch(startTicketUpdate(this.props.match.params.id, object, redirect))
    }


    render(){
        let ticket = this.props.tickets.find(ticket => ticket._id === this.props.match.params.id)
        console.log(ticket, "show Ticket")
        console.log(this.props.match.params.id, "id")
        return (
            <div>
                <h3>Edit Ticket</h3>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="code">Code: </label>
                    <input type="text" id="code" name="code" value={this.state.code} onChange={this.handleChange} placeholder={ticket.code} /><br/><br/>
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
                    <textarea rows="4" cols="50" id="message" name="message" value={this.state.message} onChange={this.handleChange} placeholder={ticket.message} /><br/><br/>

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
        employees : state.employees,
        tickets : state.tickets
    }
}

export default connect(mapStateToProps)(EditTicket)