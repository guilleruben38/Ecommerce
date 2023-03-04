import { addDoc, collection, getFirestore, } from "firebase/firestore"
import { useState } from "react"
import { useCartContext } from "../../context/CartContext"

const CartContainer = () => {
    const [formInfo, setFormInfo] = useState( {
        nombre: '',
        telefono: '',
        email:'',
        repetirEmail: ''
    } )
    const [mostrarId, setMostrarId] = useState ('')
    const { cartList, vaciarCarrito, precioTotal, eliminarProducto } = useCartContext() 
    
    const insertarOrder = (e) => {
        e.preventDefault()
        const order = {}
      
        order.buyer = formInfo
        order.isActive = true
        order.items = cartList.map( ({id, nombre, precio}) => ({id, nombre, precio}))
        order.total = ''


        
        const db = getFirestore()
        const ordersCollection = collection(db, 'orders')
        
        
    addDoc(ordersCollection, order)
    .then(resp => setMostrarId(resp.id))
     .catch(err => console.log(err))
     .finally(() => {
        vaciarCarrito()
        setFormInfo({
            name: '',
            phone: '',
            email:'',
            repetirEmail: ''
            })
        })

    
    }

    const handleOnChange = (e) => {
     

        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        })
    }


 return (
<div>
    {mostrarId !== 0 && <h3>{mostrarId}</h3>}
    <div style={{
        textAlign:'center',
    }}>
    <form onSubmit={insertarOrder} >
     <input type="text" name="nombre" placeholder ="Ingrese el nombre" onChange={handleOnChange} value={formInfo.nombre} style={{width:'500px', fontSize:'20px', borderRadius:'15px'}}/><br /><br />


     <input type="text" name="telefono" placeholder= "Ingrese el teléfono" onChange={handleOnChange} value={formInfo.telefono} style={{width:'500px', fontSize:'20px', borderRadius:'15px'}}/><br /><br />

     <input type="text" name="email" placeholder= "Ingrese el email" onChange={handleOnChange} value={formInfo.email} style={{width:'500px', fontSize:'20px', borderRadius:'15px'}}/><br /><br />

    <input type="text" name="repetirEmail"  placeholder = "Repetir el email" onChange={handleOnChange} value={formInfo.repetirEmail} style={{width:'500px', fontSize:'20px', borderRadius:'15px'}}/><br />

     <button style={{marginTop:'10px', color:'black'}} className="btn btn-success" type="submit">Generar la orden</button>
    </form>
    </div>
     { cartList.map(producto => (
     <div style={{
        textAlign:'center',
        color:'black',
        fontSize:'25px',
        marginTop:'7px',
        
        
     }} key={producto.id}>
          <img src={producto.imagen} style={{width: 100}} />
              Nombre: {producto.nombre} - Cantidad: {producto.cantidad} - Precio: ${producto.precio} {' '}
           <button className="btn btn-danger" onClick={()=> eliminarProducto(producto.id)}> X </button>
     </div>
                  
                  ))}
                  <p style={{
                     textAlign:'center',
                     marginLeft:'220px',
                     color:'black',
                     fontSize:'25px',
                     marginTop:'7px',
                  }}>{precioTotal() !== 0 && `El precio Total es: $${precioTotal()}`}</p>
     <div style={{textAlign:'center',
                marginRight:'450px',}}>
    <button className="btn btn-danger" onClick={vaciarCarrito}>Vaciar Carrito</button>
    </div>
    </div>
    )
}

export default CartContainer