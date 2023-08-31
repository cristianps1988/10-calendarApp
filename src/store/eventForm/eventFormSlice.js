import { createSlice, } from '@reduxjs/toolkit';

export const eventFormSlice = createSlice({
    name: 'eventForm',
    initialState: {
        isLoading: true,
        teachers: [],
        courses: [],
        groups: []
    },
    reducers: {
        onLoadTeachers: (state, { payload = [] }) => {
            state.isLoading = false,
                payload.forEach(teacher => {
                    const exist = state.teachers.some(dbTeacher => dbTeacher.id === teacher.id)
                    if (!exist) {
                        state.teachers.push(teacher)
                    }
                })
        },
        onLoadCourses: (state, { payload = [] }) => {
            state.isLoading = false,
                payload.forEach(course => {
                    const exist = state.courses.some(dbCourse => dbCourse.id === course.id)
                    if (!exist) {
                        state.courses.push(course)
                    }
                })
        },
        onLoadGroups: (state, { payload = [] }) => {
            state.isLoading = false,
                payload.forEach(group => {
                    const exist = state.groups.some(dbGroup => dbGroup.id === group.id)
                    if (!exist) {
                        state.groups.push(group)
                    }
                })
        },
        onLogoutEventForm: (state) => {
            state.isLoading = true,
                state.teachers = [],
                state.courses = [],
                state.groups = []
        }
    }
});
export const { onLoadTeachers, onLoadCourses, onLogoutEventForm, onLoadGroups } = eventFormSlice.actions;