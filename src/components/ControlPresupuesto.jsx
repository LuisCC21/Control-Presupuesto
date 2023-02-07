import { useEffect, useState } from "react"
import {CircularProgressbar,buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'


export const ControlPresupuesto = ({presupuesto,gastos,setPresupuesto,setGastos,setIsValidPresupuesto}) => {
    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);
    const [porcentaje, setPorcentaje] = useState(0)
   

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto)=> gasto.cantidad+total, 0);

        const totalDisponible = presupuesto - totalGastado

        /* Calular porcentaje gastado */
        const nuevoPresupuesto = (((presupuesto-totalDisponible)/presupuesto) * 100).toFixed(2);
        setTimeout(()=>{
            setPorcentaje(nuevoPresupuesto)

        },1000)

        setGastado(totalGastado)
        setDisponible(totalDisponible)
        
        
       
      }, [gastos])




    const formatearCantidad=(cantidad)=>{
        return cantidad.toLocaleString('en-US',{
            style:'currency',
            currency:'USD'
        })
    }

    const hanldeResetApp=()=>{
        const resultado = confirm('Deseas reiniciar todo?')
        if(resultado){
            setPresupuesto(0)
            setGastos([])
            setIsValidPresupuesto(false)

        }
    }
  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
      
            <div>
                <CircularProgressbar
                styles={buildStyles({
                    pathColor:porcentaje > 100 ? '#DC2626':'#3B82F6',
                    trailColor:'#F5F5F5',
                    textColor:porcentaje > 100 ? '#DC2626':'#3B82F6'
                })}
                value={porcentaje}
                text={`${porcentaje}% Gastado`}
                >


                </CircularProgressbar>

            </div>
            <div className="contenido-presupuesto">
                <button className="reset-app" type="button" onClick={hanldeResetApp}>Resetear App</button>
                <p>
                    <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
                </p>
                <p className={`${disponible < 0 ? 'negativo':''}`}>
                    <span>Disponible:</span> {formatearCantidad(disponible)}
                </p>
                <p>
                    <span>Gastado:</span> {formatearCantidad(gastado)}
                </p>
            </div>
        
    </div>
  )
}
