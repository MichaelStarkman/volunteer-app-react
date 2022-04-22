import { useState } from "react"

const EditSingleEventComponenet = (props) => {
    console.log(props)
    const [showing, setShowing] = useState(false)
    const toggleShowing = () => {
        setShowing(!showing)
    }
    const [updateEvent, setUpdateEvent] = useState({
        eventName: props.event.eventName,
        hostName: props.event.hostName,
        location: props.event.location,
        peopleNeeded: props.event.peopleNeeded,
        _id: props.event._id 
    })
    const handleInputChange = (e) =>{
        setUpdateEvent({
            ...updateEvent,
            [e.target.name]: e.target.value
        })
    }
    const submitUpdateEvent = (e) => {
        e.preventDefault();
        props.updateEvent(props.event._id, updateEvent)
        console.log("updating item")
        setShowing(false)
    }
    
    return(
       <div>
        <>
        {
            showing ?
            <div id="edit-single-event-form">           
            <button onClick={toggleShowing}>Close</button>
            <form onSubmit={submitUpdateEvent}>
                
                Event Name: <input onChange={handleInputChange} type="text" name="eventName" placeholder={updateEvent.eventName} required/>
                Hosted by: <input onChange={handleInputChange} type="text" name="hostName" placeholder={(updateEvent.hostName)} required/>
                Located at: <input onChange={handleInputChange} type="text" name="location" placeholder={updateEvent.location} required/>
                Volunteers needed: <input onChange={handleInputChange} type="number" name="peopleNeeded" placeholder={updateEvent.peopleNeeded}/>
                <br></br>
                <button type="submit">Submit</button>
                
            </form>
        </div>
        :
        <button onClick={toggleShowing}>Edit Event!</button>
        }
         </>
         </div>
    )
}
export default EditSingleEventComponenet;



