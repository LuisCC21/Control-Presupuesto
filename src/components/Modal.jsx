import { useEffect, useState } from 'react'
import {Mensaje} from './Mensaje'

import CerrarModal from '../img/cerrar.svg'

export const Modal = ({setModal,animarModal,setAnimarModal,guardarGasto,gastoEditar,setGastoEditar}) => {

  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [categoria, setCategoria] = useState('');
  const [mensaje, setMensaje] = useState('')
  const [id, setId] = useState('')
  const [fecha, setFecha] = useState('')
  useEffect(() => {
    if(Object.keys(gastoEditar).length>0){
        setNombre(gastoEditar.nombre);
        setCantidad(gastoEditar.cantidad);
        setCategoria(gastoEditar.categoria)
        setId(gastoEditar.id)
        setFecha(gastoEditar.fecha)
    }
    
  
  
  }, [])
  
 

  const handleSubmit=(e)=>{
    e.preventDefault();
   
    if([nombre,cantidad,categoria].includes('')){
      setMensaje('Todos Los Campos Son Obligatorios');

      setTimeout(()=>{
        setMensaje('')
      },2000)

      return
    }

    guardarGasto({cantidad,categoria,nombre,id,fecha})

  }

   const cerrarModal=()=>{
       setAnimarModal(true)
       setGastoEditar({})
       
       setTimeout(()=>{
            setModal(false);
      },500)

    }



  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img 
            src={CerrarModal}
             alt="cerrar modal"
             onClick={cerrarModal}
              />
        </div>
        <form
         className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
         onSubmit={handleSubmit}
         >
            <legend>{gastoEditar.nombre ?'Editar Gasto':'Nuevo Gasto'}</legend>
            {mensaje && <Mensaje tipo={'error'}> {mensaje}</Mensaje>}
            <div className="campo">
              <label htmlFor="nombre">Nombre Gasto</label>
              <input
              id='nombre'
               type="text"
               placeholder='Añade el Nombre del Gasto'
               value={nombre}
               onChange={(e)=>setNombre(e.target.value)}
               />
            </div>
            <div className="campo">
              <label htmlFor="cantidad">Cantidad</label>
              <input
              id='cantidad'
               type="number"
               placeholder='Añade la cantidad del Gasto'
               value={cantidad}
               onChange={e=>setCantidad(Number(e.target.value))}
               />
            </div>
            <div className="campo">

              <label htmlFor="categoria">Categoria</label>
              <select name="categoria" id="categoria" value={categoria} onChange={e=>setCategoria(e.target.value)}>
                <option value="" disabled={true}>-- Seleccione --</option>
                <option value="ahorro" >Ahorro</option>
                <option value="comida" >Comida</option>
                <option value="gastos" >Gastos</option>
                <option value="ocio" >Ocio</option>
                <option value="salud" >Salud</option>
                <option value="suscripcion" >Suscripciones</option>

              </select>
              <input type="submit" value={gastoEditar.nombre ?'Editar Gasto':'Añadir Gasto'} />
              
            </div>

        </form>
        
    </div>
  )
}
