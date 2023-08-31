import { addHours, differenceInSeconds } from 'date-fns';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import es from 'date-fns/locale/es';
import Swal from 'sweetalert2';

import { useUiStore } from '../../hooks/useUiStore';
import { useCaledarStore } from '../../hooks';
import { useEventFormStore } from '../../hooks/useEventFormStore';

registerLocale('es', es)

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


Modal.setAppElement('#root');

export const CalendarModal = () => {
    const totalSemesters = 8 // este número debe venir del formulario de configuración
    let semesters = []
    for (let i = 1; i <= totalSemesters; i++) {
        semesters.push(<option key={i} value={i}>{i}</option>)
    }

    const { isDateModalOpen, closeDateModal } = useUiStore()
    const { activeEvent, startSavingEvent } = useCaledarStore()
    const { teachers, courses, groups, startLoadingCourses, startLoadingTeachers, startLoadingGroups } = useEventFormStore()

    const [formValues, setformValues] = useState({
        start: new Date(),
        end: addHours(new Date(), 2),
        course: '',
        semester: '',
        group: '',
        teacher: ''
    })

    useEffect(() => {
        if (activeEvent !== null) {
            setformValues({ ...activeEvent })
        }

    }, [activeEvent])

    useEffect(() => {
        startLoadingTeachers()
    }, [])

    useEffect(() => {
        startLoadingCourses()
    }, [])

    useEffect(() => {
        startLoadingGroups()
    }, [formValues.semester])

    const onInputChange = ({ target }) => {
        setformValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChange = (event, type) => {
        setformValues({
            ...formValues,
            [type]: event
        })
    }

    const onCloseModal = () => {
        closeDateModal()
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        console.log(formValues)
        const diference = differenceInSeconds(formValues.end, formValues.start)
        if (isNaN(diference) || diference <= 0) {
            Swal.fire('Fechas incorrectas', 'Revise las fechas ingresadas', 'error')
        }
        if (formValues.course.length === 0 || formValues.semester.length === 0 || formValues.group.length === 0 || formValues.teacher.length === 0) {
            Swal.fire('Campos vacios', 'Todos los campos son obligatorios', 'error')
            return
        }
        await startSavingEvent(formValues)
        closeDateModal()
    }

    return (

        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className='modal'
            overlayClassName='modal-fondo'
            closeTimeoutMS={200}
        >
            <h1> Nuevo Horario </h1>
            <hr />
            <form className="container"
                onSubmit={onSubmit}
            >
                <div className="d-flex justify-content-between">
                    <div className="form-group mb-2">
                        <label>Hora inicio</label>
                        <DatePicker
                            className="form-control"
                            selected={formValues.start}
                            onChange={(date) => onDateChange(date, 'start')}
                            dateFormat='Pp'
                            showTimeSelect
                            locale='es'
                            timeCaption='Hora'
                        />
                    </div>

                    <div className="form-group mb-2">
                        <label>Hora fin</label>
                        <DatePicker
                            minDate={formValues.start}
                            className="form-control"
                            selected={formValues.end}
                            onChange={(date) => onDateChange(date, 'end')}
                            dateFormat='Pp'
                            showTimeSelect
                            locale='es'
                            timeCaption='Hora'
                        />
                    </div>
                </div>


                <hr />
                <div className="form-group mb-2">
                    <label>Asignatura</label>
                    <select
                        name='course'
                        value={formValues.course}
                        onChange={onInputChange}
                        className='form-control'>
                        defaultValue={formValues.course}
                        <option disabled value='' >Elegir asignatura</option>
                        {
                            courses.map(element => (
                                <option key={element.id} value={element.course}>{element.course} </option>
                            ))
                        }
                    </select>
                </div>
                <div className="form-group mb-2">
                    <label>Semestre</label>
                    <select
                        name='semester'
                        value={formValues.semester}
                        onChange={onInputChange}
                        className='form-control'>
                        defaultValue={formValues.semester}
                        <option disabled value='' >Elegir semestre</option>
                        {semesters}
                    </select>
                </div>
                <div className="form-group mb-2">
                    <label>Grupo</label>
                    <select
                        name='group'
                        value={formValues.group}
                        onChange={onInputChange}
                        className='form-control'>
                        defaultValue={formValues.group}
                        <option disabled value='' >Elegir grupo</option>
                        {
                            groups.map(element => {
                                let semesterChosed = formValues.semester
                                console.log(semesterChosed)
                                console.log(element.semester)
                                if (semesterChosed == element.semester) {
                                    <option key={element.id} value={element.group}>{element.group} </option>
                                }
                            }
                            )
                        }
                    </select>
                    {/* <input
                        type="text"
                        className="form-control"
                        placeholder="Grupo"
                        name="group"
                        autoComplete="off"
                        value={formValues.group}
                        onChange={onInputChange}
                    /> */}
                </div>
                <div className="form-group mb-2">
                    <label>Docente</label>
                    <select
                        name='teacher'
                        value={formValues.teacher}
                        onChange={onInputChange}
                        className='form-control'>
                        defaultValue={formValues.teacher}
                        <option disabled value='' >Elegir docente</option>
                        {
                            teachers.map(element => (
                                <option key={element.id} value={element.name}>{element.name} </option>
                            ))
                        }
                    </select>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
