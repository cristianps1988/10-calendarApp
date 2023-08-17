import { useCaledarStore } from "../../hooks/useCaledarStore"

export const FabDelete = () => {

    const { startDeletingEvent } = useCaledarStore()

    const onClickDelete = () => {
        startDeletingEvent()
    }

    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={onClickDelete}
        >
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}
