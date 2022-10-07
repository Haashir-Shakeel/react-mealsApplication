import React from 'react'
import { useGlobalContext } from '../context'
const Meals = () => {
  const {meals} = useGlobalContext()
  
  return (

    <section>
      {meals.map((singleMeal)=>{
        console.log(singleMeal)
        return <h4>singleMeal</h4>
      })}

    </section>
  )
}

export default Meals