import './login.css'
import { useRef, useState } from 'react'
import Cookie from 'js-cookie'
import { login } from '../../api/httpRequest'
import { Link, useNavigate } from 'react-router-dom'
import { Modal } from '../modals/modal'

export const Login = () => {
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const correoRef = useRef()
  const passwordRef = useRef()

  const navigate = useNavigate()

  const loginIN = async (e) => {
    e.preventDefault()
    const email = correoRef.current.value
    const contrasena = passwordRef.current.value
    const data = { email, contrasena }

    try {
      const res = await login(data)
      const token = res.data.response.info.token

      Cookie.set('token', token, {
        expires: 1,
        sameSite: 'none',
        secure: true
      })

      navigate('/dashboard')
    } catch (error) {
      const msg = error.response.data.message
      setAlertMessage(msg)
      setShowAlert(true)
    }
  }

  const handleCloseAlert = () => {
    setShowAlert(false)
  }

  return (
    <main className="containerLogin">
      <header className="nameApp">
        <h3>· ChatVibe</h3>
      </header>
      <section className="gridContent">
        <section className="formLogin">
          <header className="headerLogin">
            <h1>Bienvenido de vuelta.</h1>
            <p>Por favor, ingresa tus credenciales.</p>
          </header>
          <form onSubmit={loginIN}>
            <section>
              <div>
                <label htmlFor="email">Correo electrónico</label>
                <input type="email" ref={correoRef} placeholder="example@example.com" name="email" id="email" autoComplete="off" />
              </div>
              <div>
                <label htmlFor="password">Contraseña</label>
                <input type="password" ref={passwordRef} placeholder="***********" name="password" id="password" autoComplete="off" />
              </div>
            </section>

            <button className="buttonLogin">Iniciar sesión</button>
          </form>
          <Link to={'/register'} className="register">
            <p>
              {' '}
              ¿No tienes una cuenta? <span> crea una aquí.</span>
            </p>
          </Link>
        </section>
        <section className="backgroundUiLogin">
          <span className="circleLogin"></span>
          <span className="blurLogin"></span>
        </section>
      </section>
      {showAlert && <Modal title="¡Alerta!" message={alertMessage} onClose={handleCloseAlert} />}
    </main>
  )
}
