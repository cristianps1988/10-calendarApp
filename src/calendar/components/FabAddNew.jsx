import { addHours } from "date-fns"
import { useCaledarStore, useUiStore } from "../../hooks"

// const newEvent = {
//     start: new Date(),
//     end: addHours(new Date(), 2),
//     asignatura: '',
//     semestre: '',
//     grupo: '',
//     docente: ''
// }

export const FabAddNew = () => {

    const { openDateModal } = useUiStore()
    const { setActiveEvent } = useCaledarStore()

    const onClickNew = () => {
        setActiveEvent({
            start: new Date(),
            end: addHours(new Date(), 2),
            course: '',
            semester: '',
            group: '',
            teacher: ''
        })
        openDateModal()
    }

    return (
        <button
            className="btn btn-primary fab"
            onClick={onClickNew}
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
