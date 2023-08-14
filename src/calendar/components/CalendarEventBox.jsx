import React from 'react'

export const CalendarEventBox = ({ event }) => {
    const { asignatura, docente, grupo } = event
    return (
        <>
            <span>{grupo}</span>
            <strong> - {asignatura}</strong>
            <span> - {docente}</span>
        </>
    )
}
