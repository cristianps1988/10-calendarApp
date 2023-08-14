import { useState } from 'react';
import Modal from 'react-modal';

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

    const [isOpen, setisOpen] = useState(true)

    const onCloseModal = () => {
        setisOpen(false)
    }

    return (

        <Modal
            isOpen={isOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className='modal'
            overlayClassName='modal-fondo'
            closeTimeoutMS={200}
        >
            <h1> Nuevo Horario </h1>
            <hr />
            <form className="container">
                <div className="d-flex justify-content-between">
                    <div className="form-group mb-2">
                        <label>Hora inicio</label>
                        <input className="form-control" placeholder="Fecha inicio" />
                    </div>

                    <div className="form-group mb-2">
                        <label>Hora fin</label>
                        <input className="form-control" placeholder="Fecha inicio" />
                    </div>
                </div>


                <hr />
                <div className="form-group mb-2">
                    <label>Asignatura</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Asignatura"
                        name="asignatura"
                        autoComplete="off"
                    />
                    {/* <small id="emailHelp" className="form-text text-muted">Asignatura a programar</small> */}
                </div>
                <div className="form-group mb-2">
                    <label>Semestre</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Semestre"
                        name="semestre"
                        autoComplete="off"
                    />
                    {/* <small id="emailHelp" className="form-text text-muted">Asignatura a programar</small> */}
                </div>
                <div className="form-group mb-2">
                    <label>Grupo</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Grupo"
                        name="grupo"
                        autoComplete="off"
                    />
                    {/* <small id="emailHelp" className="form-text text-muted">Asignatura a programar</small> */}
                </div>
                <div className="form-group mb-2">
                    <label>Docente</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Docente"
                        name="docente"
                        autoComplete="off"
                    />
                    {/* <small id="emailHelp" className="form-text text-muted">Asignatura a programar</small> */}
                </div>

                {/* <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div> */}

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
