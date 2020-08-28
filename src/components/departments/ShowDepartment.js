import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { startGetAllTickets } from '../../actions/ticketsAction';



class ShowDepartment extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    
    componentDidMount() {
        this.props.dispatch(startGetAllTickets())
    }

    render() {
        let tickete = this.props.tickets.find(ticket => ticket.department == this.props.eachDepartment._id )
        console.log(this.props.eachDepartment, "each department")
        console.log(this.props.tickets, "all tickets")
        return(
            
            <div>
                <h3>Name - {this.props.eachDepartment.name}</h3>
                <p><Link to={`/editDepartment/${this.props.eachDepartment._id}`}>Edit</Link></p><br/>

                {(this.props.tickets.find(ticket => ticket.department == this.props.eachDepartment._id)) && (<div>
                     <h3>Tickets - {this.props.tickets.filter(ticket => ticket.department == this.props.eachDepartment._id).length}</h3>
                    {(tickete.isResolved)?(<div>
                        <h4>Completed</h4>
                        <p>Code No. : {tickete.code}</p>
                        <p>Customer:  </p>
                        <p>Employees: </p>
                        <p>Department: {this.props.eachDepartment.name} </p>
                        <p>Message: {tickete.message} </p>
                        <p>Priority: {tickete.priority} </p>

                    </div>) : (<div>
                        <h4>Pending</h4>
                        <p>Code No. : {tickete.code}</p>
                        <p>Customer:  </p>
                        <p>Employees: </p>
                        <p>Department: {this.props.eachDepartment.name} </p>
                        <p>Message: {tickete.message} </p>
                        <p>Priority: {tickete.priority} </p>
                    </div>) }
                 </div>)}
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        eachDepartment : state.eachDepartment,
        tickets : state.tickets
    }
}

 export default connect(mapStateToProps)(ShowDepartment)