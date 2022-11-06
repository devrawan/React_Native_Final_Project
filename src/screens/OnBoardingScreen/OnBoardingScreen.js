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
import OnBoardingViews from './component/OnBoardingViews';
const OnBoarding =()=>{
    const {navigate} = useNavigation()
    return(
   <View style={{paddingHorizontal: 20,justifyContent:'space-evenly', flex:1 , backgroundColor: 'white'}}>

      <View style={styles.container}>
    <Swiper  autoplay autoplayTimeout={5} >
      <OnBoardingViews Img={require('../../../assets/images/Rectangle18.png')} Title={'First to know'} description={'All news in one place, be the first to know last news'} />
      <OnBoardingViews Img={require('../../../assets/images/Rectangle18.png')} Title={'First to know'} description={'All news in one place, be the first to know last news'} />
      <OnBoardingViews Img={require('../../../assets/images/Rectangle18.png')} Title={'First to know'} description={'All news in one place, be the first to know last news'} />
      <OnBoardingViews Img={require('../../../assets/images/Rectangle18.png')} Title={'First to know'} description={'All news in one place, be the first to know last news'} />
  
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
 
  button: {
    backgroundColor: Color.button,
  },
  
  
  textContainer:{
    marginTop: 40
  } 
})
