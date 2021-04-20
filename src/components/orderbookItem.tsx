import React from 'react'

type Props = {
   prize: number
   size: number
   total: number
}

export const OrderbookItem = ({prize, size, total}: Props) => {
   return <div>
      <div>{prize}</div>
      <div>{size}</div>
      <div>{total}</div>
   </div>
}
