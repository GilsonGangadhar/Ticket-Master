const ticketInitialValue = {}

const eachTicketReducer = (state = ticketInitialValue, action) => {
    switch(action.type) {
        case 'SET_EACH_TICKET' : {
            return action.payload
        }
        default : {
            return {...state}
        }
    }
}

export default eachTicketReducer