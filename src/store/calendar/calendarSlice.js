import { createSlice, } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
    // title: 'clase',
    _id: new Date().getTime(),
    start: new Date(),
    end: addHours(new Date(), 2),
    asignatura: 'Fisiología del ejercicio',
    semestre: '3',
    grupo: '301',
    docente: 'Cristian Peña'
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
        }
    }
});
export const { onSetActiveEvent } = calendarSlice.actions;