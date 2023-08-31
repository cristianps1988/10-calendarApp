import { useDispatch, useSelector } from "react-redux"
import { onLoadCourses, onLoadTeachers, onLoadGroups } from "../store"
import calendarApi from "../api/calendarApi"
import { convertDates } from "../helpers"
import Swal from "sweetalert2"


export const useEventFormStore = () => {

    const dispatch = useDispatch()
    const { teachers, courses, groups } = useSelector(state => state.eventForm)
    const { user } = useSelector(state => state.auth)

    const startLoadingTeachers = async () => {
        try {
            const { data } = await calendarApi.get('/teacher')
            dispatch(onLoadTeachers(data.teachers))
        } catch (error) {
            console.log(error)
        }
    }

    const startLoadingCourses = async () => {
        try {
            const { data } = await calendarApi.get('/course')
            dispatch(onLoadCourses(data.courses))
        } catch (error) {
            console.log(error)
        }
    }

    const startLoadingGroups = async () => {
        try {
            const { data } = await calendarApi.get('/group')
            dispatch(onLoadGroups(data.groups))
        } catch (error) {
            console.log(error)
        }
    }


    return {
        // properties
        teachers,
        courses,
        groups,

        //metodos
        startLoadingTeachers,
        startLoadingCourses,
        startLoadingGroups
    }
}
