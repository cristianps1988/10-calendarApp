import { useDispatch, useSelector } from "react-redux"
import { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents, onLoadTeachers } from "../store"
import calendarApi from "../api/calendarApi"
import { convertDates } from "../helpers"
import Swal from "sweetalert2"


export const useCaledarStore = () => {

    const dispatch = useDispatch()
    const { events, activeEvent, teachers } = useSelector(state => state.calendar)
    const { user } = useSelector(state => state.auth)

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent) => {
        try {
            if (calendarEvent.id) {
                //actualizar
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
                dispatch(onUpdateEvent({ ...calendarEvent }))
                return
            }
            //crear
            const { data } = await calendarApi.post('/events', calendarEvent)
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }))
        } catch (error) {
            Swal.fire('Ups... something went wrong', error.response.data?.msg, 'error')
        }
    }

    const startDeletingEvent = async () => {

        try {
            await calendarApi.delete(`/events/${activeEvent.id}`)
            dispatch(onDeleteEvent())
        } catch (error) {
            console.log(error)
            Swal.fire('Ups... something went wrong', error.response.data?.msg, 'error')
        }
    }

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get('/events')
            const eventsConverted = convertDates(data.events)
            dispatch(onLoadEvents(eventsConverted))
        } catch (error) {
            console.log(error)
        }
    }

    const startLoadingTeachers = async () => {
        try {
            const { data } = await calendarApi.get('/teacher')
            dispatch(onLoadTeachers(data.teachers))
        } catch (error) {
            console.log(error)
        }
    }


    return {
        // properties
        events,
        teachers,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //metodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents,
        startLoadingTeachers
    }
}
