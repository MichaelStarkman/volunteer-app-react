import { useEffect, useState } from "react";
import SingleEventComponent from "./singleEventComponent/singleEventComponent";
import NewEventComponent from "./newEventComponent/newEventComponent";

const EventContainer = () => {
    const [events, setEvents] = useState([])
    const [newItemServerError, setNewItemServerError] = useState("")
    // CREATE event in STATE
    const createNewEvent = async (newEvent) => {
        // Send request to back-end
        try {
            const apiResponse = await fetch("http://localhost:3001/events",{
                method: "POST",
                body: JSON.stringify(newEvent),
                headers: {
                    "Content-Type": "application/json"
                }
              })
        // parse response
        const parsedResponse = await apiResponse.json()
        // if success:
        console.log(parsedResponse)
        if(parsedResponse.success){
            // add new event to state
            setEvents([parsedResponse.data, ...events])
        }else {
            setNewItemServerError(parsedResponse.data)
            // TODO: refactor state from newItemForm to here
        }}catch(err){
            console.log(err)
        }
    }
    // DELETE event from STATE
    const deleteEvent = async (idToDelete) => {
        try {
            const deleteRequestResponse = await fetch(`http://localhost:3001/events/${idToDelete}`, {
            method: "DELETE",
            })
            const parsedResponse = await deleteRequestResponse.json()
            if(parsedResponse.success){
                const newEvents = events.filter(event => event._id !== idToDelete)
                setEvents(newEvents)
            }else{
                // TODO: handle an unsuccessful delete
            }
        } catch(err){
            console.log(err)
            // TODO: handle FE error, unsure of what that would look like 
        }
        console.log("deleting id:" + idToDelete)
    }
    const getEvents = async () => {
        try {
            const events = await fetch("http://localhost:3001/events")
            const parsedEvents = await events.json();
            setEvents(parsedEvents.data)
        }catch(err) {
            console.log(err)
            // TODO
        }
    }
    // UPDATE event 
    const updateEvent = async (idToUpdate, eventToUpdate) => {
        // const newEvents = [];
        // for(let i = 0; i < events.length; i++){
        //     if(events[i]._id === idToUpdate){
        //         newEvents[i] = eventToUpdate
        //     }else {
        //         newEvents.push(events[i])
        //     }
        // }
        const updateRequestResponse = await fetch(`http://localhost:3001/events/${idToUpdate}`, {
            method: "PUT",
            body: JSON.stringify(eventToUpdate),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const parsedResponse = await updateRequestResponse.json();
        if(parsedResponse.success){
            const newEvents = events.map(event => event._id === idToUpdate ? eventToUpdate : event) 
            setEvents(newEvents)
        } else {
            setNewItemServerError(parsedResponse.data)
        }
        
    }
    useEffect(() => getEvents, [])
    return (
        <div>
            <h2>Event here!</h2>
            <NewEventComponent
            newItemServerError={newItemServerError}
            createNewEvent={createNewEvent}
            ></NewEventComponent>
            {events.map((event)=>{
                return <SingleEventComponent
                key={event._id}
                event={event}
                deleteEvent={deleteEvent}
                updateEvent={updateEvent}
                ></SingleEventComponent>
            })}
        </div>
    )
}
export default EventContainer;