import {SafeAreaView, Text,View,TextInput,TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image, Dimensions} from 'react-native'
import React,{useCallback, useState} from 'react'
import {useNavigation} from '@react-navigation/native'
import {XMarkIcon} from 'react-native-heroicons/solid'
import Loading from './loading'
import debounce from 'lodash/debounce';
import { fallbackMoviePoster, image185, searchMovies } from '../api/moviesdb'

// import {XMarkIcon} from 'react-native-heroicons/outline'

const movieName="Antman and the Wasp:Quantumania"
var { width, height } = Dimensions.get('window')

export default function SearchScreen() {

    const navigation=useNavigation();
    const [results, setResults] = useState([1,2,3,4])
    const [loading,setLoading]=useState(false)

    const handleSearch=value=>{
            // console.log('alue', value)
            if (value && value.length>2) {
                setLoading(true)
                // these are all the api parameters
                searchMovies({
                    query:value,
                    include_adult:"false",
                    language:"en-US",
                    page:"1"
                }).then(data=>{
                    setLoading(false)
                    console.log('Got Movies:  ',data)
                    if(data && data.results) setResults(data.results)
                })
            }else{
                setLoading(false)
                setResults([])
            }

    }

    // search only gets triggered once so we pass useCallback debounce so there is no repetative ans 4 miliseconds
    const handleTextDebounce=useCallback(debounce(handleSearch,400),[])

    return(
        <SafeAreaView  className="flex-1 bg-neutral-700">
            <View className="mx-3 mb-3 mt-4 flex-row justify-between items-center border border-neutral-400  rounded-full">
        <TextInput 
        onChangeText={handleTextDebounce}
        placeholder='Search Movies'
        placeholderTextColor={'lightgray'}
        className='pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider'
        />
        <TouchableOpacity 
        className="rounded-full p-3 m-1 bg-neutral-400"
        onPress={()=>navigation.navigate('Home')}
        >
<XMarkIcon  size={25} color={'white'}/>
        </TouchableOpacity>
           </View>


           {/* Results on search*/}
           {/* if results have value value then show the scrollview */}
          {
          loading?
          (<Loading/>):

          results.length>0?(
            <ScrollView  
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal:15}}
             className="space-y-3"
            >
             {/* Showing Movies */}
    <Text className="text-white font-semibold ml-1"> Results ({results.length})</Text>
    <View className="flex-row justify-between flex-wrap">
     {
         results.map((item,index)=>{
             return(
                 <TouchableWithoutFeedback
                 key={index}
                 onPress={()=>navigation.push("Movie",item)}
                 >
                     <View className="space-y-2 mb-4">
                 <Image className="rounded-3xl"
                source={{uri:image185(item?.poster_path) || fallbackMoviePoster}}
                //  source={require('../assets/ironman.jpg')}
                 style={{width:width*0.4,height:height*0.3}}
                 />
                 <Text className="text-neutral-400 ml-1">
                     {item?.title.length>20?item?.title.slice(0,20)+'...':item?.title}    
                 </Text>
                     </View>
                 </TouchableWithoutFeedback>
             )
         })
    }
</View>
        </ScrollView>
    ):(
        <View className="flex-row justify-center">
<Image source={require('../assets/nomovies.jpeg')}

className="h-96 w-92 mt-40"/>
        </View>
    )
}

          
        </SafeAreaView>
    )
}