import { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"


const ControlPresupuesto = ({
  gastos,
  setGastos,
  presupuesto,
  setPresupuesto,
  setIsValidPresupuesto
}) => {

  const [porcentaje, setPorcentaje] = useState(0);
  const [disponible, setDisponible] = useState(presupuesto);
  const [gastado, setGastado] = useState(0);

  useEffect(() => {

    let gastoTotal = 0;
    for (let i = 0; i < gastos.length; i++)
      gastoTotal += gastos[i].cantidad

    const totalDisponible = presupuesto - gastoTotal;
    //Calcular porcen taje gastado

    const porcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);




    setTimeout(() => {
      setPorcentaje(porcentaje);
    }, 1500);



    setGastado(gastoTotal);
    setDisponible(totalDisponible);
  }, [gastos])

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    })
  }

  const handleResetApp= () => {
    const resultado = confirm("Estás seguro de reiniciar el presupuesto y gastos?");
    console.log("Confirm ejecutandose")

    if(resultado){
      setGastos([]);
      setPresupuesto(0);
      setIsValidPresupuesto(false);
    }
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? "DC2626" : "#3B82F6",
            trailColor: "#F5F5F5",
            textColor: porcentaje > 100 ? "DC2626" : "#3B82F6"
          })}
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
        />
      </div>

      <div className='contenido-presupuesto'>

        <button
          className='reset-app'
          type="button"
          onclick= {handleResetApp}
        >
          Resetear App
        </button>

        <p>
          <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? "negativo" : ""}`}>
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
