import { View,Dimensions } from 'react-native'

const Container = ({ child }) => {
    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;
    return (
        <View
            style={{
                display:"flex",
                flexDirection :"column",
                alignItems : "center",
                justifyContent : "space-around",
                backgroundColor : "red",
                flex : 1,
                height : 800,
            }}
        >{child}</View>
    )
}

export default Container