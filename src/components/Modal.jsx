import CerrarBtn from "../img/cerrar.svg"
import { useState } from "react";
import Mensaje from "./Mensaje";

const Modal = ({ setModal, animarModal, setAnimarModal ,guardarGasto}) => {

    const [mensaje, setMensaje] = useState("");

    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [categoria, setCategoria] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Probando Formulario")

        if( [nombre, cantidad, categoria ].includes("")){
            setMensaje("Todos los campos son obligatorios");

            setTimeout(()=>{
                setMensaje("");
            }, 3000);
            return;   
        }
        
        guardarGasto({nombre, cantidad, categoria});
    }

    const ocultarModal = () => {
        setAnimarModal(false);

        setTimeout(() => {
            console.log("Desanimando modal ...")
            setModal(false);
        }, 500);

    }


    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img
                    src={CerrarBtn}
                    alt="cerrar modal"
                    onClick={ocultarModal}
                />
            </div>
            <form
                className={`formulario ${animarModal ? "animar" : ""}`}
                onSubmit={handleSubmit}
            >
                <legend>Nuevo Gasto</legend>
                {mensaje && <Mensaje tipo= "error">{mensaje}</Mensaje>}

                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Añade el Nombre del Gasto"
                        value={nombre}
                        onChange={e => {
                            setNombre(e.target.value)
                        }}

                    />
                </div>

                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input
                        id="cantidad"
                        type="number"
                        placeholder="Añade la cantidad del gasto"
                        cantidad={cantidad}
                        onChange={e => {
                            setCantidad(Number(e.target.value))
                        }}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="categoria">Categoria</label>

                    <select
                        id="categoria"
                        cantidad={categoria}
                        onChange={e => {
                            setCategoria(e.target.value)
                        }}
                    >
                        <option value="">-- Select --</option>
                        <option value="ahorro"> Ahorro </option>
                        <option value="comida"> Comida </option>
                        <option value="casa"> Ahorro </option>
                        <option value="gastos"> Gastos Varios </option>
                        <option value="ocio"> Ocio </option>
                        <option value="salud"> Salud </option>
                        <option value="movilizacion"> Movilizaciones </option>
                    </select>

                    <input
                        type="submit"
                        value="Añadir Gasto"
                    />

                </div>
            </form>

        </div>


    )
}

export default Modal
