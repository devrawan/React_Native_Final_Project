import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  Platform,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Snackbar from 'react-native-snackbar';
import MyStatusBar from '../../components/MyStatusBar';
import {useNavigation} from '@react-navigation/native';
import FeatherIc from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {images} from '../../constants/index';
import {useTranslation} from 'react-i18next';
import HomCardA from '../../components/HomCardA';
import HomCardE from '../../components/HomCardE';
import AntIc from 'react-native-vector-icons/AntDesign';

const screenWidth = Dimensions.get('window').width;

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const DetailScreen = ({route}) => {
  const { itm } = route.params;
  const navigation = useNavigation();
  const {t, i18n} = useTranslation();
  const data = [
    {
      id: 0,
      image_thumbnail: 'https://xcobon.com/uploads/1673087084_492788596.png',
      name: `${t('Amazon products at 10% off')}`,
      start_at: `${t('10/15/2022 with an expiring date')}`,
      body:"Lisandra Wiley Amazon products sdmazon products ghmazon products  "
    },
    {
      id: 1,
      image_thumbnail: 'https://xcobon.com/uploads/1673087084_492788596.png',
      name: `${t('Amazon products at 10% off')}`,
      start_at: `${t('10/15/2022 with an expiring date')}`,
      body:"Lisandra Wiley Amazon products sdmazon products ghmazon products  "
    },
    {
      id: 2,
      image_thumbnail: 'https://xcobon.com/uploads/1673087084_492788596.png',
      name: `${t('Amazon products at 10% off')}`,
      start_at: `${t('10/15/2022 with an expiring date')}`,
      body:"Lisandra Wiley Amazon products sdmazon products ghmazon products  "
    },
    {
      id: 3,
      image_thumbnail: 'https://xcobon.com/uploads/1673087084_492788596.png',
      name: `${t('Amazon products at 10% off')}`,
      start_at: `${t('10/15/2022 with an expiring date')}`,
      body:"Lisandra Wiley Amazon products sdmazon products ghmazon products  "
    },
  ];
  const navToDet = item => {
    console.log(item);
    navigation.navigate('DetailScreen',{itm:item});
  };

  const HedScreenComp = () => {
    return (
      <>
      
<View style={{  
  flex:1,
  width: '95%',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    borderColor: '#D8D8D8',
    padding: 10,
    borderRadius: 20,
    borderWidth: 2,
    alignSelf: 'center',
    height: 150,
    paddingHorizontal: 18,
    marginBottom: 15,}}>
<View style={{
  
  borderRadius: 7,
  width:'20%', height: '21%',backgroundColor:'#ECECEC',flexDirection:'row',justifyContent:'center',alignItems:'center'
    }}>
<Text
              style={{color: '#636363', fontWeight: '700', textAlign: 'left'}}>
              {t('Off')}
            </Text>
</View>

<Image 
 source={{uri:itm.image_thumbnail}}
style={{width:"60%"}}
 resizeMode={'contain'}

/>
{itm.is_favourite == true ?
<TouchableOpacity style={{width:'20%',flexDirection:'row',justifyContent:'flex-end'}}>
<AntIc name="heart" size={20} color={'red'} />
</TouchableOpacity>:<TouchableOpacity style={{width:'20%',flexDirection:'row',justifyContent:'flex-end'}}>
<AntIc name="hearto" size={20} color={'#656565'} />
</TouchableOpacity>}
</View>
        <View style={styles.view2Sty}>
          <View>
            <Text
              style={{
                alignSelf: 'flex-start',
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize:16,fontWeight:'700'
              }}>
              {/* {t('Amazon products at 10% off')} */}
              {itm.name}
            </Text>
          </View>
          <TouchableOpacity style={styles.view3Style } onPress={()=>{
  Clipboard.setString(itm.coupon == undefined ? "" :itm.coupon);
  Snackbar.show({
text: 'Copied to clipboard',
duration: Snackbar.LENGTH_LONG,
action: {
text: 'OK',
textColor: '#D54078',

},
});
}}>

<View 

style={{backgroundColor:'#29B1E5',paddingHorizontal:5,paddingVertical:3,borderRadius:10,marginHorizontal:4,alignSelf:'flex-start',width:20}}>
  <FontAwesome5  name='copy' color={'white'}/>
</View>
            <Text style={{color: '#636363', fontSize: 14, paddingHorizontal:10, fontWeight: 'bold',minwidth:40}}>
             {itm.coupon}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{width: '95%', alignSelf: 'center', marginBottom: 30,paddingHorizontal:5}}>
          <Text style={{color: '#7B7C7E', textAlign: 'left'}}>
            {itm.body}
            {/* {t('DetText')} */}
          </Text>
          <Text style={{color: '#7B7C7E', textAlign: 'left'}}>
            {t('with an expiring date')} {itm.start_at}
          </Text>
        </View>
      

        <View style={styles.view5Style}>
          <Text style={{fontSize: 18, fontWeight: '700', textAlign: 'left',color:'#000000'}}>
            {t('Related Coupons')}
          </Text>
        </View>
      </>
    );
  };

  return (
    <View style={styles.containerr}>
      <MyStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View style={styles.appBar}>
        <TouchableOpacity
      style={{width:'20%',height:'100%',alignSelf:'flex-start',justifyContent:'center',alignItems:'center'}}
          onPress={() => {
            navigation.goBack();
          }}>
          <AntIc
            name={i18n.language === 'en' ? 'arrowleft' : 'arrowright'}
            size={22}
          />
        </TouchableOpacity>
        <View style={{width:'80%',height:'100%',justifyContent: 'center', alignItems: 'center',alignSelf:'center'}}>
          <Text
            style={{fontSize: 18, color:'black', fontFamily: 'Dubai-Bold', fontWeight: '500'}}>
            {t('Details')}
          </Text>
        </View>
        <View
      style={{width:'20%',height:'100%',alignSelf:'flex-start',justifyContent:'center',alignItems:'center'}}
         >
         
        </View>
      </View>

      {i18n.language === 'en' ? (
        <View style={{flex: 1}}>
          <FlatList
          showsVerticalScrollIndicator={false}
            ListHeaderComponent={<HedScreenComp />}
            horizontal={false}
            data={data}
            keyExtractor={item => item.id}
            renderItem={({item}) => <HomCardE onpres={navToDet} item={item} />}
          />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            horizontal={false}
            ListHeaderComponent={<HedScreenComp />}
            data={data}
            keyExtractor={item => item.id}
            renderItem={({item}) => <HomCardA onpres={navToDet} item={item} />}
          />
        </View>
      )}
    </View>
  );
};

export default DetailScreen;
const styles = StyleSheet.create({
  containerr: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  appBar: {
    width:'100%',
    backgroundColor: '#FFFFFF',
    height: APPBAR_HEIGHT,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
   
    marginBottom: 12,
  },

  imgBack: {
    width: '97%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#D8D8D8',
    padding: 10,
    borderRadius: 20,
    borderWidth: 2,
    alignSelf: 'center',
    height: 150,
    paddingHorizontal: 18,
    marginBottom: 15,
    
  },
  vieStyl: {
    
    height: '21%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#ECECEC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  view2Sty: {
    width: '90%',
    marginBottom: 15,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  view3Style: {
    flexDirection:'row',
    backgroundColor: '#ECECEC',
    minWidth: 72,
    borderRadius: 7,
    paddingHorizontal: 3,
    paddingVertical: 5,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  view4Style: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 25,
    paddingStart: 5,
  },
  view5Style: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 5,
  },
});
