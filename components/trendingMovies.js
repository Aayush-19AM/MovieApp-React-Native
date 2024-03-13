
import {Dimensions, Text,TouchableWithoutFeedback,View,Image} from 'react-native'
import { styles } from '../theme'
import React from 'react'
import Carousel from 'react-native-snap-carousel'
import {useNavigation} from     '@react-navigation/native'
import { image500 } from '../api/moviesdb'


var {width,height}=Dimensions.get('window')

export default function TrendingMovies({data}){


    const navigation=useNavigation()
    const handleClick=(item)=>{
        navigation.navigate('Movie',item)
    }

    return(
        <View className="mb-5">
            <Text className="text-white mb-5 mx-4 text-xl">
                Trending Movies
            </Text> 
            <Carousel 
            data={data}
            renderItem={({item})=> <MovieCard item={item} handleClick={handleClick}/>}
            firstItem={1}
            inactiveSlideOpacity={0.60}
            sliderWidth={width}
            itemWidth={width*0.62}
            slideStyle={{display:"flex" ,alignItems:"center"}}
            />
        </View>
    )
}

const MovieCard=({item,handleClick})=>{
    // console.log('item.poster_path: ',item.poster_path)
    return(
        <TouchableWithoutFeedback onPress={()=>handleClick(item)}>
            <Image 
            // source={require('../assets/ironman.jpg')}
            source={{uri:image500(item.poster_path)}}
            style={{
                width:width*0.6,
                height:height*0.4
            }}
            className="rounded-3xl"
            />
        </TouchableWithoutFeedback>
    )
}