import { useDispatch, useSelector } from "react-redux"
import { onSetActiveEvent, onAddNewEvent, onUpdateEvent } from "../store"


export const useCaledarStore = () => {

    const dispatch = useDispatch()
    const { events, activeEvent } = useSelector(state => state.calendar)

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent) => {
        if (calendarEvent._id) {
            //actualizar
            dispatch(onUpdateEvent({ ...calendarEvent }))
        } else {
            //crear
            dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }))
        }
    }


    return {
        // properties
        events,
        activeEvent,

        //metodos
        setActiveEvent,
        startSavingEvent
    }
}
