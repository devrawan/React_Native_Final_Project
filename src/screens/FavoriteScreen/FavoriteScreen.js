import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import FeatherIc from 'react-native-vector-icons/Feather';
import FontAwesomeIc from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import AntIc from 'react-native-vector-icons/AntDesign';
import MyStatusBar from '../../components/MyStatusBar';
import {images} from '../../constants/index';
import OfferCard from '../../components/OfferCard';
import {
  StyleSheet,
  AppRegistry,
  Platform,
  SafeAreaView,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Alert,
  useWindowDimensions,
  FlatList,
  Image,
  Pressable,
  ImageBackground
} from 'react-native';
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const FavoriteScreen = () => {
  const {width, height} = useWindowDimensions();
  const navigation = useNavigation();
  const categs = [
    {
      id: 0,
      name: 'all',
      img: '',
    },
    {
      id: 1,
      name: 'sport',
      img: '',
    },
    {
      id: 2,
      name: 'Home',
      img: '',
    },
    {
      id: 3,
      name: 'Gifts',
      img: '',
    },
    {
      id: 4,
      name: 'Electronics',
      img: '',
    },
    {
      id: 5,
      name: 'Fashion',
      img: '',
    },
    {
      id: 6,
      name: 'Food',
      img: '',
    },
  ];

  const offers =[
    {
 id:0,
img:images.STC,
txt:'Amazon products at 10% off',
dat:'10/15/2022 with an expiring date',
off:null,
sar:null
  },
  {
    id:1,
   img:images.STC,
   txt:'Amazon products at 40% off',
   dat:'10/15/2022 with an expiring date',
   off:null,
   sar:null
     },

]
const navToDet=(item)=>{
  console.log(item);
  navigation.navigate('Offer',{screen:'DetScreen'});
}

  return (
    <View style={styles.container}>
      <MyStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View style={[styles.appBar,{width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:15}]}>
    <TouchableOpacity onPress={()=>{navigation.goBack()}}>
     <AntIc name='arrowleft' size={22}/>
      </TouchableOpacity> 
<View>
<Text style={{alignSelf:'center',fontSize:18,fontFamily:'Dubai-Bold',fontWeight:'500'}}>Favorite</Text> 
</View>
          <TouchableOpacity style={{alignSelf:'flex-end',height:'100%',justifyContent:'center'}}>
            <FeatherIc name={'more-vertical'} size={20}  />
          </TouchableOpacity>
     
      </View>

      <View style={{flex:1}}>
     <FlatList
     horizontal={false}
     data={offers}
     keyExtractor={(item)=>item.id}
     renderItem={({item})=><OfferCard onpres={navToDet} item={item}/>
  
    
    }
     />
     </View>











</View>
  );
};

export default FavoriteScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FFFFFF'
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: '#FFFFFF',
    height: APPBAR_HEIGHT,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',




  },
  content: {
    backgroundColor:'#FFFFFF'
 
  },
});