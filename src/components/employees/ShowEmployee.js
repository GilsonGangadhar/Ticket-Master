import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


class ShowEmployee extends React.Component {
    render(){
        console.log(this.props.eachEmployee, "show each employee")
        return(
           
            <div>
              <h3>{this.props.eachEmployee.name} - {this.props.eachEmployee.email} </h3>
              <p><Link to={`/editEmployee/${this.props.eachEmployee._id}`}>Edit</Link></p>
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        eachEmployee : state.eachEmployee
    }
}

export default connect(mapStateToProps)(ShowEmployee)