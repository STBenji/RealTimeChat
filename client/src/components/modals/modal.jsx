import './modal.css'

export const Modal = ({ title, message, onClose }) => {
  return (
    <div className="modal-container">
      <div className="modal">
        <header className="modal-header">
          <h2>{title}</h2>
          <span class="material-symbols-outlined" onClick={onClose}>close</span>
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
