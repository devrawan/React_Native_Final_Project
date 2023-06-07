import React , {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Dimensions,
  FlatList,
  
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useTranslation} from 'react-i18next';

import MyStatusBar from '../../components/MyStatusBar';
import {useNavigation} from '@react-navigation/native';
import FeatherIc from 'react-native-vector-icons/Feather';
import FontAwesomeIc from 'react-native-vector-icons/FontAwesome';
import {images} from '../../constants/index';
import AntIc from 'react-native-vector-icons/AntDesign';
import OfferCard from '../../components/OfferCard';
import axios from 'axios';
import { deviceId, fcmToken } from '../../../App';

const screenWidth = Dimensions.get('window').width;

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const DetScreen = ({route}) => {
  const { itm } = route.params;
  const [offers, setOffers] = useState([]);
const [pageCop, setPageCop] = useState(1);
const [nextCop, setNextCop] = useState();
const [isLoad, setIsLoad] = useState(true);
  const navigation = useNavigation();
  const {t, i18n} = useTranslation();

  useEffect(  () =>  {
    axios.get(
      `https://xcobon.com/api/offers?page=${pageCop}`,
      {
        // cancelToken: cancelTokenSource2.token,
        headers: {
          language: i18n.language == undefined ? "en" : i18n.language,
          'deviceKey': deviceId,
          'fcm-token': fcmToken,
        },
      },
    ).then((response)=>{
      console.log("curreeent Offer  page" + pageCop)
      setNextCop(response.data.data.pagination.has_next);
      setOffers(response.data.data.content);
      setIsLoad(false);
    }).catch((response) => { 
      console.log("getOffers Error " + response);
      if (response !=undefined &&  response.response != undefined &&  response.response.status != undefined &&  response.response.status == 403){
        setNextCop(response.response.data.data.pagination.has_next);
        setOffers(response.response.data.data.content);
        setIsLoad(false);
        return;
      }
        setIsLoad(false);
    });
}, [pageCop]);
  const navToDet = item => {
    navigation.navigate('DetScreen',{itm:item});
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
               {itm.value}%{t('Off')}
            </Text>
</View>

<Image 
 source={{uri:itm.image_thumbnail}}
style={{width:"60%"}}
 resizeMode={'contain'}

/>
{/* {itm.is_favourite == true ?
<TouchableOpacity style={{width:'20%',flexDirection:'row',justifyContent:'flex-end'}}>
<AntIc name="heart" size={20} color={'red'} />
</TouchableOpacity>:<TouchableOpacity style={{width:'20%',flexDirection:'row',justifyContent:'flex-end'}}>
<AntIc name="hearto" size={20} color={'#656565'} />
</TouchableOpacity>} */}
</View>
        <View style={styles.view2Sty}>
          <View style={{width:'60%',alignItems:'center',justifyContent:'center'}}>
            <Text
              style={{
                color:'black',
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
          <View style={{justifyContent:'center',paddingVertical:10}}>
          <TouchableOpacity style={styles.view3Style}>
            <Text style={{color: 'white', fontSize: 14, fontWeight: 'bold',minwidth:40}}>
          {itm.value} {t('R.S')} 
            </Text>
          </TouchableOpacity>
          </View>
         


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
          <Text style={{fontSize: 18, fontWeight: '700', textAlign: 'left',color:'black'}}>
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
          style={{fontSize: 18, fontFamily: 'Dubai-Bold', fontWeight: '500',color:'black'}}>
          {t('Details')}
        </Text>
      </View>
      <View
    style={{width:'20%',height:'100%',alignSelf:'flex-start',justifyContent:'center',alignItems:'center'}}
       >
       
      </View>
    </View>

  
      <View style={{flex: 1}}>
        <FlatList
        showsVerticalScrollIndicator={false}
          ListHeaderComponent={<HedScreenComp />}
          horizontal={false}
          data={offers}
          keyExtractor={item => item.id}
          renderItem={({item}) => <OfferCard onpres={navToDet} item={item} />}
        />
      </View>
  
  </View>
  );
};

export default DetScreen;
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
    backgroundColor:'#29B1E5',
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


/// 