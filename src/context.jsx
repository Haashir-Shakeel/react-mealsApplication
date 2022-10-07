import React from "react";
import { useContext, useEffect, useState } from "react";
import axios from 'axios'

export const AppContext = React.createContext()


export const AppProvider = ({children}) => {

    const [meals, setMeals] = useState([])


    const randomMealsUrl = 'https://www.themealdb.com/api/json/v1/1/random.php#'
    const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=a#'

    const fetchMeal =async (url) => {
        try{
            const {data} = await axios(url)
            setMeals(data.meals) //destructuring data from respons
        }catch(error){
            console.log(error.response)
        }
    
    }

    useEffect(()=>{
        fetchMeal(allMealsUrl)
    },[])
    return (
        <AppContext.Provider value={{ meals }}>
            {children}
        </AppContext.Provider>
    )
}


export const useGlobalContext = () => {
    return useContext(AppContext)
}