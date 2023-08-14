import { Calendar } from 'react-big-calendar'
import { addHours } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { localizer, getMessagesES } from '../../helpers'

import { Navbar } from "../components/Navbar"

const myEventsList = [{
    title: 'Cumpleaños de juan',
    start: new Date(),
    notes: 'Hay que comprar el pastel',
    end: addHours(new Date(), 1),

}]

export const CalendarPage = () => {

    const eventPropGetter = (event, start, end, isSelected) => {
        console.log({ event, start, end, isSelected })
    }

    return (
        <>
            <Navbar />

            <Calendar
                culture='es'
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                messages={getMessagesES()}
                eventPropGetter={eventPropGetter}
            />
        </>
    )
}
