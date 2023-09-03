import { useEffect, useState } from 'react'
import { useUiStore, useCaledarStore, useAuthStore } from '../../hooks'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { localizer, getMessagesES } from '../../helpers'

import { Navbar, CalendarEventBox, CalendarModal, FabAddNew, FabDelete } from "../"


export const CalendarPage = () => {
    const { user } = useAuthStore()
    const { openDateModal } = useUiStore()
    const { events, setActiveEvent, hasEventSelected, startLoadingEvents } = useCaledarStore()

    const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'week') // esto también lo puedo quitar... también buscar la forma de ocultar el header 

    const eventPropGetter = (event, start, end, isSelected) => {
        const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid)
        const style = {
            backgroundColor: isMyEvent ? '#347CF7' : '#455660',
            borderRadius: '3px',
            opacity: 0.8,
            color: 'white',
            fontSize: '0.8rem'
        }
        return {
            style
        }
    }

    const onDoubleClick = (event) => {
        openDateModal()
    }

    const onSelected = (event) => {
        setActiveEvent(event)
    }

    const onViewChanged = (event) => { // esto lo puedo quitar para mi app definitiva
        localStorage.setItem('lastView', event)
        setlastView(event)
    }

    useEffect(() => {
        startLoadingEvents()
    }, [])

    return (
        <>
            <Navbar />
            <div className='d-flex flex-row align-items-baseline'>
                <Calendar
                    className='flex-grow-1'
                    culture='es'
                    localizer={localizer}
                    events={events}
                    defaultView={lastView}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 'calc(100vh - 80px)' }}
                    messages={getMessagesES()}
                    eventPropGetter={eventPropGetter}
                    components={{
                        event: CalendarEventBox
                    }}
                    onDoubleClickEvent={onDoubleClick}
                    onSelectEvent={onSelected}
                    onView={onViewChanged}
                    toolbar={false}
                    step={15}
                />
            </div>

            <CalendarModal />
            <FabAddNew />
            {hasEventSelected && <FabDelete />}
        </>
    )
}
