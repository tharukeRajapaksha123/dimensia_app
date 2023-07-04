import { TouchableOpacity,Text } from "react-native";

const Button = ({onPressed,text,style})=>{
    return (
        <TouchableOpacity
            style={style}
            onPress={onPressed}
        >
            <Text
                style={{
                    color : "white"
                }}
            >
                {text}
            </Text>
        </TouchableOpacity>
    )
}


export default Button;