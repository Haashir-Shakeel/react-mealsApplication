import React from "react";
import { useContext, useEffect, useState } from "react";
import axios from 'axios'

export const AppContext = React.createContext()


export const AppProvider = ({children}) => {

    const [loading, setLoading] = useState(false)
    const [meals, setMeals] = useState([])
    const [searchTerm, setSearchTerm] = useState('')


    const randomMealsUrl = 'https://www.themealdb.com/api/json/v1/1/random.php#'
    const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='

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

    useEffect(()=>{
        fetchMeal(`${allMealsUrl}${searchTerm}`)
    },[searchTerm])
    return (
        <AppContext.Provider value={{ loading, meals, setSearchTerm }}>
            {children}
        </AppContext.Provider>
    )
}


export const useGlobalContext = () => {
    return useContext(AppContext)
}