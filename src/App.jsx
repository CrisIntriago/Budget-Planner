import { useState, useEffect } from 'react'
import Header from './components/header'
import IconoNuevoGasto from "./img/nuevo-gasto.svg"
import Filtros from './components/Filtros';
import Modal from './components/modal';
import { generarId } from './helpers';
import ListadoGastos from './components/ListadoGastos';

function App() {

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
    );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState(
    localStorage.getItem("gastos") ? JSON.parse(localStorage.getItem("gastos")) : [] 
  );
  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro ,setFiltro]= useState("");
  const [gastosFiltrados, setGastosFiltrados]= useState([]);


  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);

      setTimeout(() => {
        console.log("Animando modal ...")
        setAnimarModal(true);
      }, 500);


    }
  }, [gastoEditar]);

  useEffect( () => {
    localStorage.setItem("presupuesto", presupuesto ?? 0);
  }, [presupuesto])


  useEffect( () => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
  }, [presupuesto])


  useEffect( () => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0;
    if( presupuestoLS > 0 ){
      setIsValidPresupuesto(true);
    }

  },[])

  useEffect( () =>{
    if(filtro) {
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro);

      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro])

  const handleNuevoGasto = () => {

    setModal(true);
    setGastoEditar({})

    setTimeout(() => {
      console.log("Animando modal ...")
      setAnimarModal(true);
    }, 500);
  }

  
  const guardarGasto = gasto => {
    

    if(gasto.id){
      //Se actualiza
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados);
      setGastoEditar({});
    }else {
      //Nuevo gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
      
    }
    
    setAnimarModal(false);
    
    
    
    setTimeout(() => {
      console.log("Desanimando modal ...")
      setModal(false);
    }, 500);
  }


  const eliminarGasto = id =>{
    const listaActualizada = gastos.filter( gastoState => gastoState.id !== id);
    setGastos(listaActualizada);
    console.log(listaActualizada);
  };


  return (
    <div className={modal && "fijar"}>
      <Header
        gastos={gastos}
        setGastos= {setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <>
          <main>
          <Filtros
            filtro = {filtro}
            setFiltro = {setFiltro}
          
          />
            <ListadoGastos
              setGastoEditar={setGastoEditar}
              gastos={gastos}
              eliminarGasto= {eliminarGasto}
              filtro = {filtro}
              gastosFiltrados= {gastosFiltrados}
            />
          </main>
          <div className='nuevo-gasto'>
            <img
              src={IconoNuevoGasto}
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && <Modal
        setModal={setModal}
        animarModal={animarModal}
        setAnimarModal={setAnimarModal}
        guardarGasto={guardarGasto}
        gastoEditar={gastoEditar}
        setGastoEditar={setGastoEditar}
      />}

    </div>


  )
}

export default App
