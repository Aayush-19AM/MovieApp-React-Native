import {View,Text, Platform, TouchableOpacity} from 'react-native'
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar,ScrollView } from 'react-native';
import {styles} from '../theme'
import {Bars3CenterLeftIcon,MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import { useState } from 'react';
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';
import MovieScreen from '../screens/MovieScreen'
import {useNavigation} from '@react-navigation/native'
import Loading from './loading';
import { fetchTrendingMovies,fetchTopRatedMovies,fetchUpcomingMovies } from '../api/moviesdb';
import { useEffect } from 'react';

const ios=Platform.OS==='ios';

export default function HomeScreen(){

    const [trending, setTrending] = useState([])
    const [upcoming, setupcoming] = useState([])
    const [topRated, setTopRated] = useState([])
    const [loading,setLoading]=useState(true)

const navigation=useNavigation();

useEffect(() => {
  getTrendingMovies();
  getUpcomingMovies();
  getTopRatedMovies();
}, [])

const getTrendingMovies=async()=>{
    const data=await fetchTrendingMovies()
    // console.log("Got trending movies",data)

    if (data && data.results) {
        setTrending(data.results)
    }
   setLoading(false)
}

const getUpcomingMovies=async()=>{
    const data=await fetchUpcomingMovies()
    // console.log("Got upcoming movies",data)

    if (data && data.results) {
        setupcoming(data.results)
    }
}

const getTopRatedMovies=async()=>{
    const data=await fetchTopRatedMovies()
    // console.log("Got top rated movies",data)

    if (data && data.results) {
        setTopRated(data.results)
    }
}



    return(
        <View className="flex-1 bg-neutral-800 mt-0">
            {/* Search bar and logo */}
            <SafeAreaView className={ios?"-mb-2":"mb-3"}>
                <StatusBar style="light"/>
                <View className="flex-row justify-between items-center mx-4">
<Bars3CenterLeftIcon size={30} strokeWidth={2} color="white"/>
<Text className='text-white text-3xl font-bold'>
    <Text style={styles.text}>M</Text>ovies</Text>

    <TouchableOpacity onPress={()=>navigation.navigate('SearchScreen')}>
        <MagnifyingGlassIcon size={30} strokeWidth={2} color="white"/>
    </TouchableOpacity>
                </View>

               
            </SafeAreaView>


{
    loading?(
        <Loading/>
    ):(
        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom:10}}
        >
{/* Trending Movies Carousal */}    
{trending.length>0 && <TrendingMovies data={trending}/>}


{/* Upcoming movies row */}
<MovieList  title="Upcoming Movies" data={upcoming}/>

{/* TopRated Movies */}
<MovieList title="Top Rated Movies" data={topRated}/>
        </ScrollView>
    )
}

        </View>
    )
}   