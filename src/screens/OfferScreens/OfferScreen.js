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
const OfferScreen = () => {
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
off:'20% off',
sar:'SAR20'
  }]

const navToDet=(item)=>{
  console.log(item);
  navigation.navigate('DetScreen');
}




  return (
    <View style={styles.container}>
      <MyStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View style={[styles.appBar,{width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'center'}]}>
     
<View style={{width:'95%'}}>
<Text style={{alignSelf:'center',fontSize:18,fontFamily:'Dubai-Bold',fontWeight:'500'}}>Offers</Text> 
</View>
          <TouchableOpacity style={{alignSelf:'flex-end',height:'100%',justifyContent:'center'}}>
            <FeatherIc name={'more-vertical'} size={20}  />
          </TouchableOpacity>
     
      </View>


      <View
        style={{
          height: 60,
          backgroundColor: '#FFFFFF',
          width: width,
          marginBottom: 18,
          shadowOffset: {  height: 8 },
          shadowOpacity:  0.2,
          shadowRadius: 5,
          elevation: 9,
          shadowColor:'gray'


        }}>
        <FlatList
          style={{}}
          contentContainerStyle={{
            backgroundColor: '#FFFFFF',
            paddingStart: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          centerContent={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={categs}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                key={item.id}
                style={{
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: '#E8E8E8',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 80,
                  height: 40,
                  paddingHorizontal: 20,
                  backgroundColor:`${item.id==0 ?'#D54078':'white'}`,
                  // backgroundColor: 'white',
                  borderRadius: 12,
                  marginEnd: 7,
                }}>
                <Text style={{color: `${item.id==0 ?'white':'#000000'}`, fontSize: 14,fontWeight:'500',fontFamily:'Dubai-Bold'}}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
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

export default OfferScreen;
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