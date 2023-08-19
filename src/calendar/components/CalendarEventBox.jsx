import React from 'react'

export const CalendarEventBox = ({ event }) => {
    const { course, teacher, group } = event
    return (
        <>
            <span>{group}</span>
            <strong> - {course}</strong>
            <span> - {teacher}</span>
        </>
    )
}
