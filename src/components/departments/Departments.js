import React from 'react'
import { connect } from 'react-redux'
import {startGetAllDepartments, startPostDepartment, startDeleteDepartment, startShowDepartment } from '../../actions/departmentsAction'


class Departments extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            department: '', 
            array : []
        }
    }

    handleDepartment = (e) =>{
        let department = e.target.value
        this.setState({department})
    }

    handleShow = (id) => {
        const redirect = () => {
            return this.props.history.push('/showDepartment')
        }

        this.props.dispatch(startShowDepartment(id, redirect))
    }

    handleRemove =(id)=>{
        window.confirm("Are you sure you want to delete?")
        if(window.confirm){
            this.props.dispatch(startDeleteDepartment(id))
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const department = {
            name : this.state.department
        }

        this.setState({department: ''})

        

        this.props.dispatch(startPostDepartment(department))

    }

    componentDidMount() {
        this.props.dispatch(startGetAllDepartments())
    }


    render() {
        console.log(this.props.departments, "all departments")
        return (
            <div>
                <h2>Departments - {this.props.departments.length} </h2> 
                <table border="1">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Department</th>
                            <th>Action</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                   
                      
                              {
                                  (this.props.departments.length > 0) && (
                                     <tbody>
                                         {
                                             this.props.departments.map((ele,i) => {
                                                 return(
                                                     <tr key={i}>
                                                         <td>{i + 1}</td>
                                                         <td>{ele.name}</td>
                                                         <td><button onClick={() => {
                                                             this.handleShow(ele._id)
                                                         }}>Show</button></td>
                                                         <td><button onClick={()=>{
                                                             this.handleRemove(ele._id)
                                                         }}>Remove</button></td>
                                                     </tr>
                                                 )
                                             })
                                         }
                                     </tbody>
                                  )
                              }
                       
                   
                </table>

              
                <h3>Add Department</h3> 

                <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.department} onChange={this.handleDepartment} /><br/><br/>
                <input type="submit" value="Add" />
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

export default connect(mapStateToProps)(Departments)