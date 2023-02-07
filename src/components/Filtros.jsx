


export const Filtros = ({setFiltro,filtro}) => {
    
  return (
    <div className="filtros sombra contenedor">
        <form >
            <div className="campo">
                <label htmlFor="">Filtrar Gastos</label>
                <select  onChange={(e)=>setFiltro(e.target.value)} value={filtro}>
                    <option value="" >-- Todas las Categorias --</option>
                    <option value="ahorro" >Ahorro</option>
                    <option value="comida" >Comida</option>
                    <option value="gastos" >Gastos</option>
                    <option value="ocio" >Ocio</option>
                    <option value="salud" >Salud</option>
                    <option value="suscripcion" >Suscripciones</option>
                </select>
            </div>
        </form>
        </div>
  )
}
