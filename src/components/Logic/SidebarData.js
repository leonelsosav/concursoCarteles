import React from 'react'
import { FaPencilAlt, FaBookOpen, FaQuestionCircle, FaUserCog, FaChartBar, FaSignOutAlt, FaBuromobelexperte, FaInfoCircle } from "react-icons/fa";

export const SidebarData = [
    {
        titulo: "Nueva Evaluación",
        ruta: "/",
        icono: <FaPencilAlt/>,
        clase: "sidebar-text" 
    },
    {
        titulo: "Administración de carteles",
        ruta: "/AdminCarteles",
        icono: <FaBookOpen/>,
        clase: "sidebar-text" 
    },
    {
        titulo: "Administración de Preguntas",
        ruta: "/AdminPreguntas",
        icono: <FaQuestionCircle/>,
        clase: "sidebar-text" 
    },
    {
        titulo: "Administración de Jueces",
        ruta: "/AdminJueces",
        icono: <FaUserCog/>,
        clase: "sidebar-text" 
    },
    {
        titulo: "Evaluaciones",
        ruta: "/Evaluaciones",
        icono: <FaChartBar/>,
        clase: "sidebar-text" 
    },
    {
        titulo: "Tipos de cartel",
        ruta: "/TiposCarteles",
        icono: <FaBuromobelexperte/>,
        clase: "sidebar-text" 
    },
    {
        titulo: "Acerca de",
        ruta: "/AcercaDe",
        icono: <FaInfoCircle/>,
        clase: "sidebar-text" 
    },
    {
        titulo: "Cerrar Sesion",
        ruta: "/",
        icono: <FaSignOutAlt/>,
        clase: "sidebar-text" 
    }
]
