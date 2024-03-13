import { Image, Platform, Text, View, SafeAreaView, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React, { useState,useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { styles } from '../theme'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { useNavigation,useRoute } from '@react-navigation/native'
import MovieList from '../components/movieList'
import { fallbackPersonImage,  fetchPersonDetails, fetchPersonMovies, image500 } from '../api/moviesdb'

var { width, height } = Dimensions.get('window')

const ios = Platform.OS === 'ios'
const verticalMargin = ios ? " " : "my-3"
export default function PersonScreen() {
    const {params:item} =useRoute();
    const navigation = useNavigation();

    const [isFavourite, toggleFavourite] = useState(false)
    // const [personMovies, setpersonMovies] = useState([1,2,3,4,5])
    const [loading,setLoading]=useState(false)
    const [personDetails,setPersonDetails]=useState({})
    const [personMovie,setPersonMovie]=useState([])

    useEffect(() => {
      setLoading(true)
    // console.log("Personnn",item)
      getPersonDetails(item.id)
      getPersonMovies(item.id)
    }, [item])
    
    const getPersonDetails=async id=>{
        const data=await fetchPersonDetails(id)
        // console.log("Person data :  ",data)
        if(data) setPersonDetails(data)
        setLoading(false)
    }

    const getPersonMovies=async id=>{
        const data=await fetchPersonMovies(id)
        // // console.log("Movies of Person:      ",data)
        // // data.cast is necessary to fetch personmovies
        if(data && data.cast) setPersonMovie(data.cast)
        // // setLoading(false)


//         setLoading(true);
//   try {
//     const data = await fetchPersonMovies(id);
//     if (data && data.cast) {
//       setPersonMovie(data.cast);
//     }
//   } catch (error) {
//     console.error("Error fetching person movies:", error);
//     // Handle error gracefully, such as displaying an error message
//   } finally {
//     setLoading(false);
//   }

    }

    return (

        <ScrollView className="flex-1 bg-neutral-900">

            {/* // Backbutton and heart icon */}
            
                <SafeAreaView className={" justify-between flex-row w-full z-20 px-4 items-center" + verticalMargin}>
                    {/* Backbutton */}
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        // style={{ ...styles.background, position: 'absolute', top: ios ? 50 : 20, left: 20, borderRadius: 10 }}
                        style={{...styles.background}} 
                        className="rounded-xl p-1 mt-5"
                    >
                        <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                    </TouchableOpacity>

                    {/* HeartICon */}
                    <TouchableOpacity
                        onPress={() => toggleFavourite(!isFavourite)}
                        // style={{ position: 'absolute', top: ios ? 50 : 20, right: 20, borderRadius: 10 }}
                        className="rounded-xl p-1 mt-5">
                        <HeartIcon color={isFavourite ? "red" : "white"} size="35" strokeWidth={2.5} />
                    </TouchableOpacity>
                </SafeAreaView>

                {/* Person Details*/}
                <View>
                <View className="flex-row justify-center" 
                style={{
                    shadowColor:'gray',
                    shadowRadius:40,
                    shadowOffset:{width:0,height:5},
                    shadowOpacity:1,
                    // elevation:5
                }}
                >
                    <View className="items-center rounded-full overflow-hidden h-72 w-72 border border-neutral-500">
                        <Image 
                    source={{ uri: image500(personDetails?.profile_path) || fallbackPersonImage }}
                        // source={require('../assets/profile.jpg')}
                            style={{ height: height * 0.43, width: width * 0.74 }}
                        />
                    </View>

                    </View>
                    <View className="mt-6">
                        <Text className="text-3xl text-white font-bold text-center">
                    {personDetails?.name}
                       </Text>
                       <Text className="text-base text-neutral-400 text-center">
                    {personDetails?.place_of_birth}
                       </Text>
                    </View>

                    {/* description */}

                    <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
<View className="border-r-2 border-r-neutral-400 px-2 items-center">
    <Text className="text-white font-semibold">Gender</Text>
    <Text className="text-neutral-300 text-sm">{personDetails?.gender==1 ? "Female":"Male"}</Text>
</View>
<View className="border-r-2 border-r-neutral-400 px-2 items-center">
    <Text className="text-white font-semibold">Birthday</Text>
    <Text className="text-neutral-300 text-sm">{personDetails?.birthday}</Text>
</View>
<View className="border-r-2 border-r-neutral-400 px-2 items-center">
    <Text className="text-white font-semibold">Known for</Text>
    <Text className="text-neutral-300 text-sm">{personDetails?.known_for_department}</Text>
</View>
<View className="border-r- border-r-neutral-400 px-2 items-center">
    <Text className="text-white font-semibold">Popularity</Text>
    <Text className="text-neutral-300 text-sm">{personDetails?.popularity?.toFixed(1)} %</Text>
</View>
                  </View>

                  
<View className="my-6 mx-4 space-y-2">
<Text className="text-white text-lg">Biography</Text>
<Text className="text-neutral-400 tracking-wide">
    {/* {personDetails?.biography?personDetails?.biography.slice(0,500)+"...":personDetails?.biography} */}
    {personDetails?.biography || "N/A"}
</Text>
</View>

{/* movies */}
<MovieList title="Movies" hideSeeAll data={personMovie}/>
                </View>
        </ScrollView>
    )
}