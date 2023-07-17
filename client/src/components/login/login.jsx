import './login.css'
import { useRef } from 'react'
import Cookies from 'js-cookie'
import { login } from '../../api/httpRequest'
import  { Link } from 'react-router-dom'

export const Login = () => {
  const correoRef = useRef()
  const passwordRef = useRef()

  const loginIN = async (e) => {
    e.preventDefault()
    const email = correoRef.current.value
    const contrasena = passwordRef.current.value
    const data = { email, contrasena }

    try {
      const res = await login(data)
      const token = res.data.token

      Cookies.set('token', token, { expires: 2, path: '/login', sameSite: 'None', secure: true })
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  return (
    
    <main className="containerLogin">
      {/* <header>
        <h3>· ChatVibe</h3> 
      </header> */}
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

            <button>Iniciar sesión</button>
          </form>
          <Link to={'/register'} className='register'>
           <p> ¿No tienes una cuenta? <span> crea una aquí.</span></p>
          </Link>
        </section>
        <section className="backgroundUi">
          <span className="circle"></span>
          <span className="blur"></span>
        </section>
      </section>
    </main>
  )
}
