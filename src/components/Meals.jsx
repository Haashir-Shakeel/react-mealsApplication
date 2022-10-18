import React from 'react'
import { useGlobalContext } from '../context'
import {BsHandThumbsUp} from 'react-icons/bs'

const Meals = () => {
  const {loading, meals, selectMeal} = useGlobalContext()
  
  if (loading){
    return <section className='section'>
      <h4>Loading...</h4>
    </section>
  }

  if (meals.length < 1){
    return <section className='section'>
    <h4>No Meals matched your searched term. Please try again.</h4>
  </section>
  } 
  
  return (

    <section className='section-center'>
      {meals.map((singleMeal)=>{
        const {idMeal, strMeal: title, strMealThumb: image} = singleMeal

// onClick={selectMeal(idMeal)} putting this directly in img runs 25 times(length of meals array)
        return <article className='single-meal' key={idMeal}>
          <img src={image} className="img" alt={title} onClick={() => selectMeal(idMeal)}/>
          <footer>
            <h5>{title}</h5>
            <button className='like-btn'><BsHandThumbsUp/></button>
          </footer>
          </article>
      })}

    </section>
  )
}

export default Meals