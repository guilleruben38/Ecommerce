import React from 'react'


 export function CantStock  ({ stock = 0 }) {
  return (
    <h5>{stock= 0 ? 'No hay stock' : ' En stock'}</h5>
  )
}

export default CantStock