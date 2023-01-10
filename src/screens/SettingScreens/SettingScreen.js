import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AntIc from 'react-native-vector-icons/AntDesign';
import MyStatusBar from '../../components/MyStatusBar';
import {images} from '../../constants/index';
import FeatherIc from 'react-native-vector-icons/Feather';
import  ItemLst from '../../components/ItemLst';
import {useNavigation} from '@react-navigation/native';

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
const SettingScreen = () => {
  const navigation = useNavigation();

  const items=[
    {
      id:0,
     tit: 'Main',
    img:images.main,
    scren:'Home'
    },
     {id:1,
      tit:'Favorite', img:images.fav,scren:'Favorite'},
      {id:2,
    tit: 'pay book', img:images.pay},
    {id:3,
      tit: 'blog', img:images.blog},
      {id:4,
        tit: 'change Password', img:images.pass},
        {id:5,
          tit: 'privacy policy', img:images.priv,scren:'PrivacyScreen'},
           {id:6,
            tit: 'call us', img:images.contact,scren:'ContactUsScreen'},
  ]
  const navToPrivcy=(item)=>{
    console.log(item);
    navigation.navigate(item.scren);
  }
  return (
    <View style={styles.container}>
    <MyStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
    <View style={[styles.appBar,{width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'center'}]}>
   
<View style={{width:'95%'}}>
<Text style={{alignSelf:'center',fontSize:18,fontFamily:'Dubai-Bold',fontWeight:'500'}}>Settings</Text> 
</View>
        <TouchableOpacity style={{alignSelf:'flex-end',height:'100%',justifyContent:'center'}}>
          <FeatherIc name={'more-vertical'} size={20}  />
        </TouchableOpacity>
   
    </View>


{/* <View style={{width:'100%',height:'9%',backgroundColor:'red',
  shadowOffset: {width: 1, height: 1},
  shadowOpacity: 0.2,
  shadowRadius: 2,
  elevation: 9,
  shadowColor: 'gray',
  backgroundColor: 'white',
  marginBottom:1,
  flexDirection:'row'
  ,alignItems:'center',
  paddingHorizontal:20
}}>
<Image source={images.main} style={{width:20,height:20,marginEnd:10}} resizeMode={'contain'}/>
<Text style={{fontSize:16,fontWeight:'700'}}>Main</Text>
</View> */}
  
     <FlatList
    
     data={items}
     keyExtractor={(item)=>item.id}
     renderItem={({item})=><ItemLst item={item} onpres={navToPrivcy} />
  
    
    }
     />
    


    </View>

  );
};

export default SettingScreen;
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
    shadowOffset: { height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 9,
    shadowColor: 'gray',
    backgroundColor: 'white',
marginBottom:3


  },
  content: {
    backgroundColor:'#FFFFFF'
 
  },
});