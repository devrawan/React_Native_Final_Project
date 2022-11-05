import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {useNavigation} from '@react-navigation/native';
import Button from '../../components/Button/Button';
import { Color } from '../../utils';

const OnBoardingData = ()=>{
  return (
    <View>
    <Image style={styles.Images} source={require('../../../assets/images/Rectangle18.png')} />
  <View style={styles.textContainer}>
    <Text style={styles.headerTxt}>
    First to know
    </Text>
    <Text style={styles.descriptionTxt}>
    All news in one place, be the first to know last news
    </Text>
  </View>
  
    </View>
  );
}
const OnBoarding =()=>{
    const {navigate} = useNavigation()
    return(
   <View style={{paddingHorizontal: 20,justifyContent:'space-evenly', flex:1 , backgroundColor: 'white'}}>

      <View style={styles.container}>
    <Swiper  autoplay autoplayTimeout={5} >
      <OnBoardingData />
      <OnBoardingData />
      <OnBoardingData />
  
    </Swiper>
      </View>
      <Button style={styles.button} onPress={()=>navigate('SignIn')} label={'Next'} LabelStyle={styles.label} />
   </View>
    
    )
}
export default OnBoarding;

const styles= StyleSheet.create({
  container:{
    marginTop:100,
    marginHorizontal: 20,
    height: 550,
    borderRadius: 12,
    overflow: 'hidden',
    
  },
  Images: {
    width: '100%',
    height:'70%',
    borderRadius: 12
    // backgroundColor: 'blue'
  },
  button: {
    backgroundColor: Color.button,
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
  textContainer:{
    marginTop: 40
  } 
})
