import { View,Text, TouchableOpacity, Image } from "react-native";
import { ScrollView } from "react-native";
import { fallbackPersonImage, image185 } from "../api/moviesdb";

export default function Cast({cast,navigation}) {
let personName="Kenu Reevs"
let CharacterName="John Wick"
    return(
        <View className="my-6">
            <Text className="text-white text-lg mx-4 mb-5">
Top Cast
            </Text>
            <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{padding:15}}
            >
{
    cast && cast.map((person,index)=>{
        return(
            <TouchableOpacity
            key={index}
            className="mr-4 items-center"
            onPress={()=>navigation.navigate('Person',person)}
            >
                <View 
                className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500"
                >
                <Image
                 className="rounded-2xl h-24 w-20"
                source={{uri:image185(person?.profile_path) || fallbackPersonImage}}
                //  source={require('../assets/profile.jpg')}
                />
                </View>
                
                <Text className="text-white mt-1 text-xs">
                    {
                        person?.character.length>10?person?.character.slice(0,10)+"...":person?.character
                    }
                </Text>

                <Text className="text-neutral-400 mt-1 text-xs">
                    {
                        person?.original_name.length>10?person?.original_name.slice(0,10)+"...":person?.original_name
                    }
                </Text>

            </TouchableOpacity>
        )
    })
}
            </ScrollView>
        </View>
    )
}