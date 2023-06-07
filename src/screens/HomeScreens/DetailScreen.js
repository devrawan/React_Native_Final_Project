import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import axios from 'axios';
import Clipboard from '@react-native-clipboard/clipboard';
import Snackbar from 'react-native-snackbar';
import MyStatusBar from '../../components/MyStatusBar';
import { useNavigation } from '@react-navigation/native';
import FeatherIc from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { images } from '../../constants/index';
import { useTranslation } from 'react-i18next';
import HomCardA from '../../components/HomCardA';
import HomCardE from '../../components/HomCardE';
import AntIc from 'react-native-vector-icons/AntDesign';
import { deviceId, fcmToken } from '../../../App';

const screenWidth = Dimensions.get('window').width;

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const DetailScreen = ({ route }) => {
  const { itm, } = route.params;
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();


  const [item, setItem] = useState(itm);

  const [offersCop, setOffersCop] = useState([]);
  const [favPage, setFavPage] = useState(1);
  const [nextOffCop, setNextOffCop] = useState();
  const [isLoad, setIsLoad] = useState(true);

  useEffect(()=>{

    setItem(itm)

  }, []);
  useEffect(() => {
    axios
      .get(`https://xcobon.com/api/coupons?page=${favPage}&category_id=${itm.category}`, {
        // cancelToken: cancelTokenSource2.token,
        headers: {
          deviceKey: deviceId,
          'fcm-token': fcmToken,
          language: i18n.language == undefined ? 'en' : i18n.language,
        },
      })
      .then(response => {
        console.log("response: " , response);

        setNextOffCop(response.data.data.pagination.has_next);
        setOffersCop(response.data.data.content);
        setIsLoad(false);
      })
      .catch(response => {
        console.log("error: " , response);
        
        if (
          response != undefined &&
          response.response != undefined &&
          response.response.status != undefined &&
          response.response.status == 403
        ) {
          setNextOffCop(response.response.data.data.pagination.has_next);
          setOffersCop(response.response.data.data.content);
          setIsLoad(false);
          return;
        }
        setIsLoad(false);
      });
  }, [favPage]);


  const navToDet = item => {

    navigation.navigate('DetailScreen', { itm: item });
  };
  const handLike = (copon) => {

    var isFav = copon.is_favourite;

    try {

      const path = `https://xcobon.com/api/favourites?coupon_id=${copon.id}`;
      console.log(path);
      const formData = new FormData();
      axios({
        method: "post",
        url: `https://xcobon.com/api/favourites?coupon_id=${copon.id}`,
        data: formData,

        headers: {

          'deviceKey': deviceId,
          'fcm-token': fcmToken,
          'Content-Type': 'multipart/form-data',
          'accept': '*/*',
          'language': i18n.language == undefined ? "en" : i18n.language,
        }

      })
        .then(response => {
          // const result =  response.data.data.coupons[0].is_favourite;

          copon.is_favourite = !isFav;
          const lst = [...offersCop];
          // lst.forEach((item)=>{
          //   if (item.id == itm.id){
          //     item.is_favourite = result;
          //   }

          // });
          setOffersCop(lst);
          console.log(response);

          if (itm.id == copon.id){
            item.is_favourite  = !isFav;
            setItem(item);

          }
        })
        .catch(response => {
          console.log("Fav Error 33")
          console.log(response);
        })


    } catch (err) {
      console.log(" Fav Error 22 ")
      console.log(err);
    }

  }
  const HedScreenComp = () => {
    return (
      <>

        <View style={{
          flex: 1,
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
          marginBottom: 15,
        }}>
          <View style={{

            borderRadius: 7,
            width: '20%', height: '21%', backgroundColor: '#ECECEC', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
          }}>
            <Text
              style={{ color: '#636363', fontWeight: '700', textAlign: 'left' }}>
              {t('Off')}
            </Text>
          </View>

          <Image
            source={{ uri: itm.image_thumbnail }}
            style={{ width: "60%" }}
            resizeMode={'contain'}

          />
          {item.is_favourite == true ?
            <TouchableOpacity onPress={()=>{
              handLike(item)
            }} style={{ width: '20%', flexDirection: 'row', justifyContent: 'flex-end' }}>
              <AntIc name="heart" size={20} color={'red'} />
            </TouchableOpacity> : <TouchableOpacity  onPress={()=>{
              handLike(item)
            }} style={{ width: '20%', flexDirection: 'row', justifyContent: 'flex-end' }}>
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
                fontSize: 16, fontWeight: '700'
              }}>
              {/* {t('Amazon products at 10% off')} */}
              {itm.name}
            </Text>
          </View>
          <TouchableOpacity style={styles.view3Style} onPress={() => {
            Clipboard.setString(itm.coupon == undefined ? "" : itm.coupon);
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

              style={{ backgroundColor: '#29B1E5', paddingHorizontal: 5, paddingVertical: 3, borderRadius: 10, marginHorizontal: 4, alignSelf: 'flex-start', width: 20 }}>
              <FontAwesome5 name='copy' color={'white'} />
            </View>
            <Text style={{ color: '#636363', fontSize: 14, paddingHorizontal: 10, fontWeight: 'bold', minwidth: 40 }}>
              {itm.coupon}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: '95%', alignSelf: 'center', marginBottom: 30, paddingHorizontal: 5 }}>
          <Text style={{ color: '#7B7C7E', textAlign: 'left' }}>
            {itm.body}
            {/* {t('DetText')} */}
          </Text>
          <Text style={{ color: '#7B7C7E', textAlign: 'left' }}>
            {t('with an expiring date')} {itm.start_at}
          </Text>
        </View>


        <View style={styles.view5Style}>
          <Text style={{ fontSize: 18, fontWeight: '700', textAlign: 'left', color: '#000000' }}>
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
          style={{ width: '20%', height: '100%', alignSelf: 'flex-start', justifyContent: 'center', alignItems: 'center' }}
          onPress={() => {
            navigation.goBack();
          }}>
          <AntIc
            name={i18n.language === 'en' ? 'arrowleft' : 'arrowright'}
            size={22}
          />
        </TouchableOpacity>
        <View style={{ width: '80%', height: '100%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
          <Text
            style={{ fontSize: 18, color: 'black', fontFamily: 'Dubai-Bold', fontWeight: '500' }}>
            {t('Details')}
          </Text>
        </View>
        <View
          style={{ width: '20%', height: '100%', alignSelf: 'flex-start', justifyContent: 'center', alignItems: 'center' }}
        >

        </View>
      </View>

      {i18n.language === 'en' ? (
        <View style={{ flex: 1 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<HedScreenComp />}
            horizontal={false}
            data={offersCop}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              if (itm.id !== item.id) {
                return (<HomCardE onpres={navToDet} handleLike={() => handLike(item)} item={item} />)
              }
            }}
          />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            horizontal={false}
            ListHeaderComponent={<HedScreenComp />}
            data={offersCop}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              if (itm.id !== item.id) {
                return (<HomCardA onpres={navToDet} handleLike={() => handLike(item)} item={item} />)
              }
            }}
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
    width: '100%',
    backgroundColor: '#FFFFFF',
    height: APPBAR_HEIGHT,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
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
    flexDirection: 'row',
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
