import { useState } from "react";

const NewEventComponent = (props) => {
    const [showing, setShowing] = useState(false)
    // set object in state
    const [newEvent, setNewEvent] = useState({
        eventName: "",
        hostName: "",
        location: "",
        peopleNeeded: 1 
    })
    const toggleShowing = () => {
        setShowing(!showing)
    }
    
    const handleInputChange = (e) =>{
        setNewEvent({
            ...newEvent,
            [e.target.name]: e.target.value
        })
    }
    return (
        <>
        {
            showing ?
            <div className="new-event-form">
            <button onClick={toggleShowing}>Close</button>
            <form onSubmit={(e)=>{
                e.preventDefault()
                props.createNewEvent(newEvent)
                // resets form back to original starte
                setNewEvent({
                    eventName: "",
                    hostName: "",
                    location: "",
                    peopleNeeded: 1 
                    
                })
                // form goes away after submission
                setShowing(false)
                }}>
                Event Name: <input onChange={handleInputChange} type="text" name="eventName" value={newEvent.eventName} required/>
                Hosted by: <input onChange={handleInputChange} type="text" name="hostName" value={(newEvent.hostName)} required/>
                Located at: <input onChange={handleInputChange} type="text" name="location" value={newEvent.location} required/>
                Volunteers needed: <input onChange={handleInputChange} type="number" name="peopleNeeded" value={newEvent.peopleNeeded}/>
                <br></br>
                <button type="submit">Post New Event!</button>
            </form>
        </div>
        :
        <button onClick={toggleShowing}>Create NEW Event!</button>
        }
        </>
    )
}
export default NewEventComponent;