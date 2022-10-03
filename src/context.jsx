import React from "react";
import { useContext, useEffect } from "react";
import axios from 'axios'

export const AppContext = React.createContext()


export const AppProvider = ({children}) => {

    const randomMealsUrl = 'https://www.themealdb.com/api/json/v1/1/random.php#'
    const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=a#'

    const fetchMeal =async (url) => {
        try{
            const {data} = await axios(url) //destructuring data from respons
    console.log(data)
        }catch(error){
            console.log(error.response)
        }
    
    }

    useEffect(()=>{
        fetchMeal(allMealsUrl)
    },[])
    return (
        <AppContext.Provider value="hello">
            {children}
        </AppContext.Provider>
    )
}


export const useGlobalContext = () => {
    return useContext(AppContext)
}