import { Calendar } from 'react-big-calendar'
import { addHours } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { localizer, getMessagesES } from '../../helpers'

import { Navbar, CalendarEventBox, CalendarModal } from "../"
import { useState } from 'react'

const myEventsList = [{
    // title: 'clase',
    start: new Date(),
    end: addHours(new Date(), 2),
    asignatura: 'Fisiología del ejercicio',
    semestre: '3',
    grupo: '301',
    docente: 'Cristian Peña'
}]

export const CalendarPage = () => {

    const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'week') // esto también lo puedo quitar... también buscar la forma de ocultar el header 

    const eventPropGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: '#347CF7',
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
        console.log('Double Click:', event)
    }

    const onSelected = (event) => {
        console.log('Selected:', event)
    }

    const onViewChanged = (event) => { // esto lo puedo quitar para mi app definitiva
        localStorage.setItem('lastView', event)
        setlastView(event)
    }


    return (
        <>
            <Navbar />

            <Calendar
                culture='es'
                localizer={localizer}
                events={myEventsList}
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
            />
            <CalendarModal />
        </>
    )
}
