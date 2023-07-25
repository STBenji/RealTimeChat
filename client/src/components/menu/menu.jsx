import './menu.css'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Menu = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const navigate = useNavigate()

  const handleMenu = () => {
    if (isOpenMenu === false) {
      setIsOpenMenu(true)
    } else {
      setIsOpenMenu(false)
    }
    console.log(isOpenMenu)
  }

  const logout = () => {
    Cookies.remove('token')
    navigate('/')
  }

  return (
    <main className="body">
      <section className={`containerMenu ${isOpenMenu ? 'containerMenuOpen' : ''}`}>
        <nav>
          <ul>
            <li onClick={handleMenu}>
              <i className={`fa-solid fa-bars  ${isOpenMenu ? 'active fa-arrow-left' : ''}`}></i>
            </li>
            {isOpenMenu ? (
              <>
                <li>
                  <i className="fa-solid fa-message"></i>
                  Mensajes
                </li>
                <li>
                  <i className="fa-solid fa-user"></i>
                  Amigos
                </li>
                <li>
                  <i className="fa-solid fa-user-plus"></i>
                  Añadir amigos
                </li>
                <li>
                  <i className="fa-solid fa-star"> </i>
                  Favoritos
                </li>
                <li>
                  <i className="fa-solid fa-gears"> </i>
                  Configuraciones
                </li>
                <li onClick={logout}>
                  <i className="fa-solid fa-right-from-bracket"> </i>
                  Cerrar sesión
                </li>
              </>
            ) : (
              <>
                <li>
                  <i className="fa-solid fa-message"></i>
                </li>
                <li>
                  <i className="fa-solid fa-user"></i>
                </li>
                <li>
                  <i className="fa-solid fa-user-plus"></i>
                </li>
                <li>
                  <i className="fa-solid fa-star"> </i>
                </li>
                <li>
                  <i className="fa-solid fa-gears"> </i>
                </li>
                <li onClick={logout}>
                  <i className="fa-solid fa-right-from-bracket"> </i>
                </li>
              </>
            )}
          </ul>
        </nav>
      </section>
    </main>
  )
}
