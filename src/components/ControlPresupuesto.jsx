import React from 'react'

const ControlPresupuesto = ({presupuesto}) => {
  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <p>Grafica aquí</p>

      <div className='contenido-presupuesto'>
        <p>
          <span>Presupuesto: </span> ${presupuesto}
        </p>
      </div>
    </div> 
  )
}

export default ControlPresupuesto
