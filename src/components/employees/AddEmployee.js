import React from 'react'
import { connect } from 'react-redux'
import { startPostEmployee } from '../../actions/employeesAction'

class AddEmployee extends React.Component {
    constructor(){
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
            name : this.state.name,
            email : this.state.email, 
            mobile : this.state.mobile,
            department : this.state.department
        }

        const redirect = () => {
           return this.props.history.push("./employees")
        }
        this.props.dispatch(startPostEmployee(object, redirect))
    }

    render() {
        console.log(this.props.departments, "for looping")
        return (
            <div>
                <h2>Add Employee</h2>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange} /> <br/><br/>
                    <label htmlFor="email">Email: </label>
                    <input type="text" id="email" name="email" value={this.state.email} onChange={this.handleChange} /> <br/><br/>
                    <label htmlFor="mobile">Mobile: </label>
                    <input type="text" id="mobile" name="mobile" value={this.state.mobile} onChange={this.handleChange} /> <br/><br/>
                    <label htmlFor="department">Department:  </label>
                    <select  id ='department' name = 'department' value={this.state.department} onChange={this.handleChange}>
                        <option value =''>--select--</option>
                        {/* <option  value="5e933170adc1d9001619c661">Finance</option>
                        <option value="5e9363dcadc1d9001619c6bd">Tech</option> */}
                        {   
                            this.props.departments.map((ele,i) => {
                                return (
                                    <option key={i+1} value={`${ele._id}`}>{ele.name}</option>
                                )
                            })
                        }
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
        departments : state.departments
    }
}

export default connect(mapStateToProps)(AddEmployee)