import EditSingleEventComponenet from "./editSingleEventComponent/editSingleEventComponent";

const SingleEventComponent = (props) => {
    return (
        <div>
            <h2>{props.event.eventName}</h2>
            <p>Location: {props.event.location}</p>
            <p>Hosted by: {props.event.hostName}</p>
            <p>Number of Volunteers needed: {props.event.peopleNeeded}</p>
            <br />
            <button onClick={()=>{
                props.deleteEvent(props.event._id)
            }}>Delete</button>
            <EditSingleEventComponenet
            event={props.event}
            updateEvent={props.updateEvent}

            ></EditSingleEventComponenet>
        </div>
    )
}
export default SingleEventComponent;