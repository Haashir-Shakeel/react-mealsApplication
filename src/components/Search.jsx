import React from 'react'
import { useState } from 'react'
import { useGlobalContext } from '../context'

const Search = () => {

  const {setSearchTerm} = useGlobalContext()
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

  return (
    <header className='search-container'>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='type favourite meal' value={text} onChange={handleChange} className='form-input' />
        <button type='submit' className='btn'>Search</button>
        <button type='button' className='btn btn-hipster'>Surprise me!</button>
      </form>
    </header>
  )
}

export default Search