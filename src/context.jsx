import React from "react";
import { useContext, useEffect, useState } from "react";
import axios from 'axios'

export const AppContext = React.createContext()


export const AppProvider = ({children}) => {

    const [loading, setLoading] = useState(false)
    const [meals, setMeals] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const [showModal, setShowModal] = useState(false)

    const [selectedMeal, setSelectedMeal] = useState(null)

    const [favourites, setFavourites] = useState([])


    const randomMealsUrl = 'https://www.themealdb.com/api/json/v1/1/random.php#'
    const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='

    

    //fetchMeal

    const fetchMeal =async (url) => {
        setLoading(true)
        try{
            const {data} = await axios(url)
            if (data.meals){
                setMeals(data.meals)
            }else{
                setMeals([])
            }
             //destructuring data from respons
        }catch(error){
            console.log(error.response)
        }
        setLoading(false)
    }

    //fetchRandomMeal

    const fetchRandomMeal = () =>{
        fetchMeal(randomMealsUrl)
        // setSearchTerm('')
    }

    //selectMeal

    //select meal when to be called from Favourites should look into Favourites array instead of meals
    // because when we are on surprise meal, array mightnot contain that favourite item 
    const selectMeal = (idMeal, favouriteMeal) => {
        let meal
        if (favouriteMeal){
            meal = favourites.find((meal)=>meal.idMeal === idMeal)
        }
        else{
            meal = meals.find((meal)=>meal.idMeal === idMeal)
        }
        
        setSelectedMeal(meal)
        setShowModal(true)

    }

    //close modal

    const closeModal = () => {
        setShowModal(false)
    }

    //favourites

    //addfavourite:

    const addToFavourites = (idMeal) => {
        const alreadyFavourite = favourites.find((meal)=> meal.idMeal === idMeal)
        if (alreadyFavourite) return
        const newFavourite = meals.find((meal)=> meal.idMeal === idMeal)
        const updatedFavourites = [...favourites, newFavourite]
        setFavourites(updatedFavourites)
        
    }

    //removefavourite
    const removeFromFavourites = (idMeal) => {
        const updatedFavourites = favourites.filter((meal)=> meal.idMeal !== idMeal)
        setFavourites(updatedFavourites)
    }


//bug: when we set SetSearchTerm to empty still it makes request as a empty searchterm when we do Surprise because we 
//     have searchTerm as dependency is useEffect.

//solution: first time app loads fetch all meals, after make a check whether we have search term then do search otherwise
//          return 
    useEffect(()=>{
        fetchMeal(allMealsUrl)
    },[])

    useEffect(()=>{
        if (!searchTerm) return

        fetchMeal(`${allMealsUrl}${searchTerm}`)
    },[searchTerm])


    return (
        <AppContext.Provider value={{ loading, meals, setSearchTerm, fetchRandomMeal ,
         showModal, selectMeal, selectedMeal, closeModal, favourites, addToFavourites, removeFromFavourites,}}>
            {children}
        </AppContext.Provider>
    )
}


export const useGlobalContext = () => {
    return useContext(AppContext)
}