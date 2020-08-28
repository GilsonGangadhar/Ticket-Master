import React from 'react'
import { connect } from 'react-redux'
import { startEmployeeUpdate } from '../../actions/employeesAction'


class EditEmployee extends React.Component {
    constructor() {
        super()
        this.state = {
            name : '',
            email : '',
            mobile : '', 
            department : ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        let object = {
            name : this.state.name
        }

        const redirect = () => {
            return this.props.history.push('/showEmployee')
        }

        this.props.dispatch(startEmployeeUpdate(this.props.match.params.id, object, redirect))
    }
    

    render() {
        let employee = this.props.employees.find(employee => employee._id === this.props.match.params.id)
        console.log(this.props.employees, "employees")
        console.log(employee, "required customer")
        return(
            <div>
                <h2>Edit Employee</h2>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange} placeholder={employee.name} /> <br/><br/>
                    <label htmlFor="email">Email: </label>
                    <input type="text" id="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder={employee.email} /> <br/><br/>
                    <label htmlFor="mobile">Mobile: </label>
                    <input type="text" id="mobile" name="mobile" value={this.state.mobile} onChange={this.handleChange} placeholder={employee.mobile} /> <br/><br/>
                    <label htmlFor="department">Department:  </label>
                    <select  id ='department' name = 'department' value={this.state.department} onChange={this.handleChange}>
                        <option value =''>--select--</option>
                        <option  value="5e933170adc1d9001619c661">Finance</option>
                        <option value="5e9363dcadc1d9001619c6bd">Tech</option>
                        </select>
                     <br/>
                     <br/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        employees : state.employees
    }
}

export default connect(mapStateToProps)(EditEmployee)