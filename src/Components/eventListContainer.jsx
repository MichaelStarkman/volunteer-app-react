import React, {Component} from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {v4 as uuid} from 'uuid';

class EventList extends Component {
    state = {
        events: [
            { id: uuid(), eventName: 'Kiss picks up trash', hostName: 'Kiss', location: 'Detroit', peopleNeeded: '4', eventDate: '2022-12-31'},
            { id: uuid(), eventName: 'Rush fights crime', hostName: 'Rush', location: 'Canada', peopleNeeded: '3', eventDate: '2022-08-12'}
        ]
    }
    render () {
        const { events } = this.state;
        return (
            <Container>
                <Button
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={()=>{
                        const eventName = prompt('Enter Event');
                        if(eventName) {
                            this.setState(state => ({
                                events: [...state.events, {id: uuid(), eventName,}]
                            }));
                        }
                    }}
                >Add concert </Button>
                <ListGroup>
                    <TransitionGroup className="concerts-list">
                        {events.map(({ id, eventName, hostName, location, peopleNeeded, eventDate })=> (
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                        className='remove-btn'
                                        color="danger"
                                        size="sm"
                                        onClick={()=> {
                                            this.setState(state =>({
                                                events: state.events.filter(event => event.id !== id)
                                            }))
                                        }}
                                    >&times;</Button>
                                    {eventName}
                                    <br />
                                    Hosted by: {hostName}
                                    <br />
                                    Location: {location} 
                                    <br />
                                    Volunteers Needed: {peopleNeeded} 
                                    <br />
                                    {eventDate}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}

export default EventList;