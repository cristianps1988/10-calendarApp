import { useDispatch, useSelector } from "react-redux"
import { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } from "../store"


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

    const startDeletingEvent = () => {
        dispatch(onDeleteEvent())
    }


    return {
        // properties
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //metodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
    }
}
