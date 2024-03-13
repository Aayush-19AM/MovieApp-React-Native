import { View, Text, TouchableOpacity, Dimensions, Platform, Image } from 'react-native'
import React, { useState } from 'react'
import { ScrollView, SafeAreaView } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useEffect } from 'react'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'

import MovieList from '../components/movieList'
import Cast from '../components/cast'
import { styles } from '../theme'
import { LinearGradient } from 'expo-linear-gradient'
import Loading from './loading'
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../api/moviesdb'


var { width, height } = Dimensions.get('window')

const ios = Platform.OS === 'ios'
const TopMargin = ios ? '' : "mt-3"
const movieName = "Ant-Man and the Wasp:Quantumania"

export default function MovieScreen() {
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [isFavourite, toggleFavourite] = useState(false)
    const [cast, setCast] = useState([])
    const [similarMovies, setSimilarMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [movie, setMovie] = useState({})


    useEffect(() => {
        //   fetching API from the dataset
        //   console.log("Item id: ",item.id)
        setLoading(true)
        getMovieDetails(item.id)
        getMovieCredits(item.id)
        getSimilarMovies(item.id)
    }, [item])

    const getMovieDetails = async id => {
        const data = await fetchMovieDetails(id)
        // console.log("got movie details: ",data)
        if (data) setMovie(data)
        setLoading(false)
    }

    const getMovieCredits = async id => {
        const data = await fetchMovieCredits(id)
        // console.log("data; ",data)
        if (data && data.cast) setCast(data.cast);

        setLoading(false)
    }

    const getSimilarMovies = async id => {
        const data = await fetchSimilarMovies(id)
        // console.log("Similar",data)
        if (data && data.results) setSimilarMovies(data.results);

    }

    return (
        <ScrollView className="flex-1 bg-neutral-900">

            {/* back button and movie poster */}

            <View className="w-full">
                <SafeAreaView className={"absoulte justify-between flex-row w-full z-20 px-4 items-center" + TopMargin}>
                    {/* Backbutton */}
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ ...styles.background, position: 'absolute', top: ios ? 50 : 20, left: 20, borderRadius: 10 }}
                        // style={styles.background} 
                        className="rounded-xl p-1"

                    >
                        <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                    </TouchableOpacity>

                    {/* HeartICon */}
                    <TouchableOpacity
                        onPress={() => toggleFavourite(!isFavourite)}
                        style={{ position: 'absolute', top: ios ? 50 : 20, right: 20, borderRadius: 10 }}
                        className="rounded-xl p-1">
                        <HeartIcon color={isFavourite ? "red" : "white"} size="35" strokeWidth={2.5} />
                    </TouchableOpacity>
                </SafeAreaView>

                {
                    loading ? (
                        <Loading />
                    ) :
                /* Image on backbutton and heart icon */(
                            <View className="relative" style={{ width, height: height * 0.55, position: "relative" }}>
                                <Image
                                    // source={require('../assets/antman.jpg')}
                                    source={{ uri: image500(movie?.poster_path || fallbackMoviePoster) }}
                                    style={{ width: '100%', height: '100%' }}
                                />
                                <LinearGradient
                                    colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                                    style={{ position: 'absolute', width: '100%', height: '100%', bottom: 0 }}
                                    start={{ x: 0.5, y: 0 }}
                                    end={{ x: 0.5, y: 1 }}
                                    className="absolute bottom-0"
                                />
                            </View>
                        )
                }


            </View>

            {/* Movie Details */}
            <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
                {/* Title */}
                <Text className="text-white text-center text-3xl font-bold tracking-wider">
                    {movie?.title}
                </Text>

                {/* Status ,release,runtime */}
                {movie?.id ? (
                    <Text className="text-neutral-400 font-semibold text-base text-center">
                        {movie?.status} * {movie?.release_date?.split('-')[0]} * {movie?.runtime} min
                    </Text>
                ) :
                    null
                }



                {/* genres */}
                <View className="flex-row justify-center mx-4 space-x-2">
                    {
                        movie?.genres?.map((genre, index) => {
                            let showdot = index + 1 != movie.genres.length
                            return (
                                <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                                    {genre?.name} {showdot ? "*" : null}
                                </Text>
                            )
                        })
                    }

                    {/* <Text className="text-neutral-400 font-semibold text-base text-center"> 
    Thrill *
    </Text>
    <Text className="text-neutral-400 font-semibold text-base text-center"> 
    {movie?.genres?.name}
    </Text> */}
                </View>

                {/* description */}
                <Text className="text-neutral-400 tracking-wide mx-4">
                    {movie?.overview}
                </Text>
            </View>

            {/* cast */}
            {cast.length>0 && <Cast navigation={navigation} cast={cast} />}


            {/* Similar Movies */}
{/* Similar Movies */}
{similarMovies.length>0 && <MovieList title="Similar Movies" hideSeeAll data={similarMovies}></MovieList>
}
        </ScrollView>
        
    )
}