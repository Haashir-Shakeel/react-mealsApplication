import React from 'react'
import { useState } from 'react'
import { useGlobalContext } from '../context'

const Search = () => {

  const { fetchRandomMeal,setSearchTerm} = useGlobalContext()
  const [text, setText] = useState('')


  const handleChange = (e) =>{
    setText(e.target.value)
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    if (text){
      setSearchTerm(text)
    }
  }
//bug: when we search term and then click on surprise, state still holds the search term and thus searching againg same
//     term doesnot return us anything since state is same
  const handleRandomMeal = () => {
      setSearchTerm('')
      setText('')
      fetchRandomMeal()
  }

  return (
    <header className='search-container'>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='type favourite meal' value={text} onChange={handleChange} className='form-input' />
        <button type='submit' className='btn'>Search</button>
        <button type='button' className='btn btn-hipster' onClick={handleRandomMeal}>Surprise me!</button>
      </form>
    </header>
  )
}

export default Search