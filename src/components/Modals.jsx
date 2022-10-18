import React from 'react'
import { useGlobalContext } from '../context'
const Modals = () => {
  
  const {selectedMeal, closeModal} = useGlobalContext()

  const {strMealThumb : image, strMeal: title, strInstructions: text, strSource: source} = selectedMeal
  return (
    <aside className='modal-overlay'>
      <div className='modal-container'>
        <img src={image} alt={title}/>
        <div className="modal-content"></div>
        <h4>{title}</h4>
        <p>Cooking Instructions</p> 
        <p>{text}</p>
        <a href={source} target="_blank">Original Source</a>
        <button onClick={closeModal}>Close</button>
        </div>  
    </aside>
  )
}

export default Modals