import './modal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export const Modal = ({ title, message, onClose }) => {
  return (
    <div className="modal-container">
      <div className="modal">
        <header className="modal-header">
          <h2>{title}</h2>
          {/* <span className="material-symbols-outlined" onClick={onClose}>close</span> */}
          <i className="fa-solid fa-xmark modal-close-button" onClick={onClose}></i>
          {/* <span class="material-symbols-outlined modal-close-button " ></span> */}
        </header>
        <div className="modal-content">
          <i className="fi fi-br-cross"></i>
          <p>{message}</p>
        </div>
      </div>
    </div>
  )
}
