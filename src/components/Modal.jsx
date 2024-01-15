import CerrarBtn from "../img/cerrar.svg"
import { useState, useEffect } from "react";
import Mensaje from "./Mensaje";

const Modal = ({
    setModal,
    animarModal,
    setAnimarModal,
    guardarGasto,
    gastoEditar,
    setGastoEditar }) => {

    const [mensaje, setMensaje] = useState("");
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [categoria, setCategoria] = useState("");
    const [fecha, setFecha] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre)
            setCantidad(Number(gastoEditar.cantidad));
            setCategoria(gastoEditar.categoria);
            setId(gastoEditar.id);
            setFecha(gastoEditar.fecha);
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Probando Formulario")

        if ([nombre, cantidad, categoria].includes("")) {
            setMensaje("Todos los campos son obligatorios");

            setTimeout(() => {
                setMensaje("");
            }, 3000);
            return;
        }

        guardarGasto({ nombre, cantidad, categoria, id, fecha });
    }

    const ocultarModal = () => {
        setAnimarModal(false);
        setGastoEditar({});

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
                <legend>{gastoEditar.nombre ? "Editar Gasto : " : "Añadir Gasto"}</legend>
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

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
                        value={gastoEditar.nombre ? "Modificar Gasto" : "Añadir Gasto"}
                    />

                </div>
            </form>

        </div>


    )
}

export default Modal
