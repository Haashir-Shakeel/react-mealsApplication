import React from "react";
import { useContext, useEffect, useState } from "react";
import axios from 'axios'

export const AppContext = React.createContext()

// api urls
const randomMealsUrl = 'https://www.themealdb.com/api/json/v1/1/random.php#'
const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='


//getting favourites from LocalStorange
const getFavouritesFromLocalStorage = () => {
    let favourites = localStorage.getItem('favourites')

    if (favourites){
        favourites = JSON.parse(favourites)
    }
    else{
        favourites = []
    }
    
    return favourites
}


export const AppProvider = ({children}) => {

    //state variables

    const [loading, setLoading] = useState(false)
    const [meals, setMeals] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const [showModal, setShowModal] = useState(false)

    const [selectedMeal, setSelectedMeal] = useState(null)

    // getting favourites array from localStorage
    const [favourites, setFavourites] = useState(getFavouritesFromLocalStorage())




    

    //fetchMeal

    const fetchMeal =async (url) => {
        //setting lodading to true while data is being fetched
        setLoading(true)

        //fetching data
        try{
            //destructuring data from response
            const {data} = await axios(url)
            //if meals exist
            if (data.meals){
                setMeals(data.meals)
            //else if meals array is empty(doesnot meet search criteria) we have a check in Meals Array
            // if meals length is less than 1 we display message
            }else{
                setMeals([])
            }
             
        }catch(error){
            console.log(error.response)
        }

        //setting loading to false once data is fetched
        setLoading(false)
    }

    //fetchRandomMeal

    const fetchRandomMeal = () =>{
        fetchMeal(randomMealsUrl)
        // setSearchTerm('')
    }

    //selectMeal

    //select meal when to be called from Favourites should look into Favourites array instead of meals
    // because when we are on surprise meal, array mightnot contain that favourite item or search criteria 
    // returns empty or different array
    const selectMeal = (idMeal, favouriteMeal) => {
        let meal
        //if item is favourite find from favourites array
        if (favouriteMeal){
            meal = favourites.find((meal)=>meal.idMeal === idMeal)
        }
        //if not calling from favourite, find from meals array
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
        // checking if meal already exist in favourites
        const alreadyFavourite = favourites.find((meal)=> meal.idMeal === idMeal)
        if (alreadyFavourite) return
        // if not already favourite then new favourite
        const newFavourite = meals.find((meal)=> meal.idMeal === idMeal)
        const updatedFavourites = [...favourites, newFavourite]
        setFavourites(updatedFavourites)
        //updating localStorage
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites))
        
    }

    //removefavourite
    const removeFromFavourites = (idMeal) => {
        const updatedFavourites = favourites.filter((meal)=> meal.idMeal !== idMeal)
        setFavourites(updatedFavourites)
        //updating localStorage
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites))
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

// useGlobal context, instead of first importing useContext and AppContext and then settinf useContext(AppContext)
export const useGlobalContext = () => {
    return useContext(AppContext)
}