import { useEffect, useState } from "react";
import { Image } from "expo-image";
import {
  View,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  Text,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Animated from "react-native-reanimated";
import { ResizeMode, Video } from "expo-av";

const CameoLogo = require("./assets/cameo.png");
const AnimatedImage = Animated.createAnimatedComponent(Image);
const Stack = createNativeStackNavigator();
const DATA = [
  {
    id: "madamadam",
    name: "Madam Adam",
    video: require("./assets/madamadam.mp4"),
    image: require("./assets/madamadam.png"),
    color: "#B23125",
  },
  {
    id: "joshradnor",
    name: "Josh Radnor",
    video: require("./assets/joshradnor.mp4"),
    image: require("./assets/joshradnor.png"),
    color: "#584B37",
  },
  {
    id: "erinandrews28",
    name: "Erin Andrews",
    video: require("./assets/erinandrews28.mp4"),
    image: require("./assets/erinandrews28.png"),
    color: "#252958",
  },
];

function HomeScreen({ navigation }) {
  return (
    <View style={s.container}>
      <Text
        style={{
          fontSize: 32,
          paddingHorizontal: 24,
          paddingTop: 24,
          fontWeight: 900,
        }}
      >
        Featured Today!
      </Text>
      <FlatList
        data={DATA}
        horizontal
        renderItem={({ item, index }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Details", { index })}
            style={{ width: 240, height: 427, margin: 12 }}
          >
            <View
              style={{
                width: "80%",
                height: "90%",
                marginTop: "10%",
                marginLeft: "5%",
                borderRadius: 20,
                backgroundColor: item.color,
              }}
            />
            <AnimatedImage
              source={item.image}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
              }}
              sharedTransitionTag={item.id}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function DetailsScreen({ navigation, route }) {
  const { width, height } = useWindowDimensions();
  const { index } = route.params;
  const [isVisible, setIsVisible] = useState(true);
  const item = DATA[index];

  return (
    <View style={{ width, height }}>
      <Video
        style={{ width, height, zIndex: 1 }}
        source={item.video}
        isLooping
        shouldPlay
        resizeMode={ResizeMode.COVER}
        isMuted
        onPlaybackStatusUpdate={(status) => {
          if (isVisible && status.isLoaded && status.isPlaying) {
            setIsVisible(false);
          }
        }}
      />
      <AnimatedImage
        source={item.image}
        style={{
          width,
          height,
          position: "absolute",
          zIndex: isVisible ? 2 : -1,
        }}
        sharedTransitionTag={item.id}
        resizeMode={ResizeMode.COVER}
      />
    </View>
  );
}

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: "#fabada" }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    width: 350,
    height: 275,
  },
});
