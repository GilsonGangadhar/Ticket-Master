import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class ShowTicket extends React.Component {
   

    render() {
        console.log(this.props.eachTicket, "showEachTicket")
        console.log(this.props.departments, "showdepartments")
        console.log(this.props.customers, "show customers")
        console.log(this.props.employees, "show employees")
        return(
            <div>
                <h2>Code Number : {this.props.eachTicket.code}</h2>
                <h4>Customer - {this.props.customers.find(customer => customer._id == this.props.eachTicket.customer).name}</h4>
                {<h4>Employees - </h4>}
                <h4>Department - {this.props.departments.find(department => department._id == this.props.eachTicket.department).name}</h4>
                <h4>Message - {this.props.eachTicket.message}</h4>
                <h4>Priority - {this.props.eachTicket.priority}</h4><br/>
                <p><Link to={`/editTicket/${this.props.eachTicket._id}`}>Edit</Link></p>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        eachTicket : state.eachTicket,
        departments : state.departments, 
        customers : state.customers,
        employees : state.employees

    }
}

export default connect(mapStateToProps)(ShowTicket)