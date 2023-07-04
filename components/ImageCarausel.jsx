import Carousel from "react-native-snap-carousel";
import { View, Image } from "react-native";
const carouselData = [
  { id: 1, imageSource: require("../images/image_1.jpg") },
  { id: 2, imageSource: require("../images/image_2.jpg") },
  { id: 3, imageSource: require("../images/image_1.jpg") },
  // Add more image data as needed
];

const ImageCarausel = () => {
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          width : 400,
          height : 300
        }}
      >
        <Image
          source={item.imageSource}
          style={{ width: "100%", height: 300 ,borderRadius : 30}}
        />
      </View>
    );
  };
  return (
    <Carousel
      data={carouselData}
      renderItem={renderItem}
      sliderWidth={400}
      itemWidth={400}
      autoplay
      autoplayInterval={5000}
      loop
    />
  );
};

export default ImageCarausel;
