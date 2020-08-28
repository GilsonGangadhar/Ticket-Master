import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { startGetAllEmployees, startDeleteEmployee, startShowEmployee } from '../../actions/employeesAction'

class Employees extends React.Component {

    handleShow = (id) => {
        const redirect = () => {
            return this.props.history.push('/showEmployee')
        }

        this.props.dispatch(startShowEmployee(id, redirect))
    }

    handleRemove = (id) => {
        window.confirm("Are you sure you want to delete?")
        if(window.confirm) {
            this.props.dispatch(startDeleteEmployee(id))
        }
    }
    
    componentDidMount() {
        this.props.dispatch(startGetAllEmployees())
    }

    render() {
        console.log(this.props.employees,  "all employees")
        return (
            <div>
                <h2>Employees - {this.props.employees.length} </h2>
                <table border="1">
                    <thead>
                        <tr>
                            <th>id</th>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Mobile</td>
                            <td>Department</td>
                            <td>Action</td>
                            <td>Remove</td>
                        </tr>
                    </thead>
                    {
                        (this.props.employees.length > 0) && (
                            <tbody>
                                {
                                    this.props.employees.map((ele,i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{ele.name}</td>
                                                <td>{ele.email}</td>
                                                <td>{ele.mobile}</td>
                                                <td>{ele.department.name}</td>
                                                <td><button onClick={() => {
                                                    this.handleShow(ele._id)
                                                }}>Show</button></td>
                                                <td><button onClick={() => {
                                                    this.handleRemove(ele._id)
                                                }}>Remove</button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        )
                    }
                </table> <br/>
                <p><Link to="/addEmployee">Add Employee</Link></p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        employees : state.employees
    }
}

export default connect(mapStateToProps)(Employees)