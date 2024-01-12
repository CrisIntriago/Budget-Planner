import {useEffect, useState} from 'react'

const ControlPresupuesto = ({presupuesto, gastos}) => {

  const [disponible, setDisponible ]= useState(presupuesto);
  const [gastado, setGastado]= useState(0);

  useEffect(() => {
    
    let gastoTotal= 0;
    for( let i = 0 ; i < gastos.length; i++)
      gastoTotal += gastos[i].cantidad

    setGastado(gastoTotal);
    setDisponible(presupuesto - gastoTotal);
  }, [gastos])

  const formatearCantidad= (cantidad) =>{
    return cantidad.toLocaleString("en-US",{
      style: "currency",
      currency: "USD"
    })
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <p>Grafica aquí</p>

      <div className='contenido-presupuesto'>
        <p>
          <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
        </p>
        <p>
          <span>Disponible: </span> {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastadoo: </span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div> 
  )
}

export default ControlPresupuesto
