import './register.css'
import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../api/httpRequest'


export const Register = () => {
  const nombreRef = useRef(null)
  const apellidoRef = useRef(null)
  const correoRef = useRef(null)
  const passwordRef = useRef(null)
  
  const navigate = useNavigate()
  
  const singIn = async (e) => {
    e.preventDefault()
    const nombre = nombreRef.current.value
    const apellido = apellidoRef.current.value
    const email = correoRef.current.value
    const contrasena = passwordRef.current.value
    const data = { nombre, apellido, email, contrasena }

    try {
      const res = await register(data)
      const message  = res.data.message

      navigate('/')
      console.log(message)
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  return (
    <main className="containerRegister">
      <header className='nameApp'>
        <h3>· ChatVibe</h3> 
      </header>
      <section className="gridContentRegister">
        <section className="formRegister">
          <header className="headerRegister">
            <h1>Bienvenido a ChatVibe.</h1>
            <p>Ingresa tus credenciales para crear tu cuenta.</p>
          </header>
          <form onSubmit={singIn}>
            <section>
              <div>
                <label htmlFor="nombre">Ingrese su nombre completo</label>
                <input type="text" ref={nombreRef} placeholder="Juan Esteban" name="nombre" id="nombre" autoComplete="off" />
              </div>
              <div>
                <label htmlFor="apellido">Ingrese sus apellidos</label>
                <input type="text" ref={apellidoRef} placeholder="Benjumea Pérez" name="apellido" id="apellido" autoComplete="off" />
              </div>
              <div>
                <label htmlFor="email">Correo electrónico</label>
                <input type="email" ref={correoRef} placeholder="example@example.com" name="email" id="email" autoComplete="off" />
              </div>
              <div>
                <label htmlFor="password">Contraseña</label>
                <input type="password" ref={passwordRef} placeholder="***********" name="password" id="password" autoComplete="off" />
              </div>
            </section>

            <button>Registrarse</button>
          </form>
          <Link to={'/'} className="login">
            <p>
              ¿Ya tienes una? <span> Inicia sesión.</span>
            </p>
          </Link>
        </section>
        <section className="backgroundUiRegister">
          <span className="circleRegister"></span>
          <span className="blurRegister"></span>
        </section>
      </section>
    </main>
  )
}
