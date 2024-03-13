import {View,Text,TouchableOpacity,ScrollView, TouchableWithoutFeedback,Image, Dimensions} from 'react-native'
import React from 'react';
import { styles } from '../theme';
import {useNavigation} from '@react-navigation/native'
import { fallbackMoviePoster, image185 } from '../api/moviesdb';


var {width,height}=Dimensions.get('window')

export default function MovieList({title,data,hideSeeAll}) {

    let movieName="Ant-man and the Wasp"
    const navigation=useNavigation();
return(
    <View className="m-2 space-y-4" >
        <View className="mx-1 justify-between flex-row items-center">
            <Text className="text-white text-xl">{title}</Text>
            {
                !hideSeeAll && (
            <TouchableOpacity>
                <Text style={styles.text} className="text-lg">See All</Text>
            </TouchableOpacity>
                )
            }
            
        </View>

        {/* Movie row */}
        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal:2}}
        >
        {
            data.map((item,index)=>{
                return(
                    <TouchableWithoutFeedback
                    key={index}
                    onPress={()=>
                            navigation.push('Movie',item)
                    }
                    >
                        <View className="space-y-1 mr-2">
                            <Image 
                            // source={require('../assets/ironman.jpg')}
                            source={{uri:image185(item.poster_path) || fallbackMoviePoster }}
                            className="rounded-3xl ml-2"
                            style={{width:width*0.33,height:height*0.22}}
                            />
                            <Text className="text-neutral-300 ml-1">

                           {item.title.length>14?item.title.slice(0,14)+'...':item.title}
                        </Text>
                        </View>
                        
                    </TouchableWithoutFeedback>
                )
            })
        }
        </ScrollView>

        
    </View>
)
}