import { createSlice, } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
    // title: 'clase',
    _id: new Date().getTime(),
    start: new Date(),
    end: addHours(new Date(), 2),
    course: 'Fisiología del ejercicio',
    semester: '3',
    group: '301',
    teacher: 'Cristian Peña',
    user: {
        _id: '123',
        name: 'Cristian'
    }
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [tempEvent],
        activeEvent: null,
    },
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map(event => {
                if (event._id === payload._id) {
                    return payload;
                }
                return event
            })
        },
        onDeleteEvent: (state) => {
            if (state.activeEvent) {
                state.events = state.events.filter(event => event._id !== state.activeEvent._id);
                state.activeEvent = null;
            }
        }
    }
});
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;