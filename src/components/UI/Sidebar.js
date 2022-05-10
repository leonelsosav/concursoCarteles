import { Link } from 'react-router-dom'
import { SidebarData } from '../Logic/SidebarData'
import '../Style/sidebar.css'
import { useState, useEffect } from 'react'
import { IconContext } from 'react-icons'
import * as FaIcons from 'react-icons/fa'
import Logo from '../../assets/logo.png'
import Cookies from 'universal-cookie';

const Sidebar = () => {
    const [sidebar, setSidebar] = useState(window.innerWidth > 1000);
    const cookies = new Cookies();
    const [rol, setRol] = useState('');

    const handleResize = () => {
        window.innerWidth <= 1000 ? setSidebar(false) : setSidebar(true);
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        let r = cookies.get('rol');
        if (r === '' || r === undefined) window.location.href = '/';
        else {
            if (r === 'Juez' && (!SidebarData.Juez.map(v => v.ruta).includes(window.location.pathname)
                && SidebarData.Administrador.map(v => v.ruta).includes(window.location.pathname))) window.location.href = '/NuevaEvaluacion';
            else setRol(r)
        }
        return () => {
            window.removeEventListener('resize', handleResize)
        }

    }, [])

    const logout = () => {
        cookies.remove('rol');
        cookies.remove('idJuez');
        cookies.remove('usuario');
        window.location.href = '/';
    }

    const toggleSidebar = (() => setSidebar(!sidebar))
    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className="header">
                    <Link to="#" className="menu-bars" onClick={toggleSidebar}>
                        <FaIcons.FaBars />
                    </Link>
                    <img src={Logo} alt="logo" className="logo" />
                </div>
            </IconContext.Provider>
            <IconContext.Provider value={{ color: '#060b26' }}>
                <nav className={sidebar ? 'menu active' : 'menu'}>
                    <ul>
                        {rol && SidebarData[rol].map((value, index) => {
                            return (
                                <li key={index} className={value.clase} onClick={value.Click && logout}>
                                    <Link to={value.ruta}>
                                        {value.icono}
                                        <span>{value.titulo}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    )
}

export default Sidebar
