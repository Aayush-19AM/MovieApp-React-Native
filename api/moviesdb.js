import axios from 'axios'
import { apiKey } from '../constants'


//endpoints

const baseURL='https://api.themoviedb.org/3'
const trendingMoviesEndpoint=`${baseURL}/trending/movie/day?api_key=${apiKey}`
const upcomingMoviesEndpoint=`${baseURL}/movie/upcoming?api_key=${apiKey}`
const topRatedMoviesEndpoint=`${baseURL}/movie/top_rated?api_key=${apiKey}`

// dynamic endpoints
const   movieDetailsEndpoint=id=>`${baseURL}/movie/${id}?api_key=${apiKey}`
const   movieCreditsEndpoint=id=>`${baseURL}/movie/${id}/credits?api_key=${apiKey}`
const   similarMoviesEndpoint=id=>`${baseURL}/movie/${id}/similar?api_key=${apiKey}`

// person detalis
const personDetailsEndpont=id=>`${baseURL}/person/${id}?api_key=${apiKey}`
// person Movies api
const personMoviesEndpoint=id=>`${baseURL}/person/${id}/movie_credits?api_key=${apiKey}`

// searchbar
// no need to pass id bcoz it is static endpoint
const searchMoviesEndpoint=`${baseURL}/search/movie?api_key=${apiKey}`



export const image500=path=>path?`https://image.tmdb.org/t/p/w500${path}`:null;
export const image342=path=>path?`https://image.tmdb.org/t/p/w342${path}`:null;
export const image185=path=>path?`https://image.tmdb.org/t/p/w185${path}`:null;

// this must be string always no require used or images passed gives error
export const fallbackMoviePoster='https://www.shutterstock.com/image-vector/man-eating-popcorn-sofa-character-260nw-2053060034.jpg'
export const fallbackPersonImage='https://www.freevector.com/uploads/vector/preview/11622/FreeVector-Stewie-Griffin.jpg'

const apiCall=async(endpoint,params)=>{
    const options={
        method:'GET',
        url:endpoint,
        params:params?params:{}
    }

    try {
        const response=await axios.request(options);
        return response.data;
    } catch (error) {
        console.log("error: ",error)
        return{}
    }
}

export const fetchTrendingMovies=()=>{
    return apiCall(trendingMoviesEndpoint);
}
export const fetchUpcomingMovies=()=>{
    return apiCall(upcomingMoviesEndpoint);
}
export const fetchTopRatedMovies=()=>{
    return apiCall(topRatedMoviesEndpoint);
}

export const fetchMovieDetails=id=>{
    return apiCall(movieDetailsEndpoint(id))
}
export const fetchMovieCredits=id=>{
    return apiCall(movieCreditsEndpoint(id))
}
export const fetchSimilarMovies=id=>{
    return apiCall(similarMoviesEndpoint(id))
}

// person details fn
export const fetchPersonDetails=id=>{
    return apiCall(personDetailsEndpont(id))
}
export const fetchPersonMovies=id=>{
    return apiCall(personMoviesEndpoint(id))
}

// Searching Movies
export const searchMovies=params=>{
    return apiCall(searchMoviesEndpoint,params)
}
