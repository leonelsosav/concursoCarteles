import React from 'react'
import { FaPencilAlt, FaBookOpen, FaQuestionCircle, FaUserCog, FaChartBar, FaSignOutAlt } from "react-icons/fa";

export const SidebarData = [
    {
        titulo: "Nueva Evaluacion",
        ruta: "/",
        icono: <FaPencilAlt/>,
        clase: "sidebar-text" 
    },
    {
        titulo: "Admin de carteles",
        ruta: "/home2",
        icono: <FaBookOpen/>,
        clase: "sidebar-text" 
    },
    {
        titulo: "Admin de Preguntas",
        ruta: "/",
        icono: <FaQuestionCircle/>,
        clase: "sidebar-text" 
    },
    {
        titulo: "Admin de Jueces",
        ruta: "/",
        icono: <FaUserCog/>,
        clase: "sidebar-text" 
    },
    {
        titulo: "Evaluaciones",
        ruta: "/",
        icono: <FaChartBar/>,
        clase: "sidebar-text" 
    },
    {
        titulo: "Cerrar Sesion",
        ruta: "/",
        icono: <FaSignOutAlt/>,
        clase: "sidebar-text" 
    }
]
