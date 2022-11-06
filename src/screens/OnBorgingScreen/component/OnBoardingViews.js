import { Image, StyleSheet, Text, View } from 'react-native';

const OnBoardingViews = ({Img , Title, description})=>{
    return (
      <View>
      <Image style={styles.Images} source={Img} />
    <View style={styles.textContainer}>
      <Text style={styles.headerTxt}>
      {Title}
      </Text>
      <Text style={styles.descriptionTxt}>
      {description}
      </Text>
    </View>
    
      </View>
    );
  }
  export default OnBoardingViews;

  const styles = StyleSheet.create({
    Images: {
        width: '100%',
        height:'70%',
        borderRadius: 12
        // backgroundColor: 'blue'
      },
    headerTxt:{
        fontSize: 24,
        fontWeight:'900',
        alignSelf:'center'
      },
    descriptionTxt: {
        fontSize: 16,
        fontWeight:'400',
        alignSelf:'center'
      },
  })