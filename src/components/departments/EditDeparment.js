import React from 'react'
import {connect} from 'react-redux'
import { startDepartmentUpdate } from '../../actions/departmentsAction' 


class EditDepartment extends React.Component {
    constructor(){
        super()
        this.state = {
            department : ''
        }
    }

    handleUpdate = (e) => {
        let department = e.target.value
        this.setState({department})
    }

    handleSubmit = (e) => {
        e.preventDefault()
       

        let object = {
            name : this.state.department
        }

        const redirect = () => {
       return this.props.history.push('/showDepartment')
        }

        this.props.dispatch(startDepartmentUpdate(this.props.match.params.id, object, redirect))
    }
    render() {
        let department = this.props.departments.find(depart => depart._id === this.props.match.params.id)
        console.log(this.props.departments, "deparments")
        console.log(department, "required depart")
        return(
            <div>
                <h2>Edit Department</h2>

                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.department} onChange={this.handleUpdate} placeholder={department.name} /><br/><br/>
                    <input type="submit" value="Add" />
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
return {
    eachDepartment : state.eachDepartment,
    departments : state.departments
}
}

export default connect(mapStateToProps)(EditDepartment)