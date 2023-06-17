import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import FeatherIc from 'react-native-vector-icons/Feather';
import FontAwesomeIc from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import AntIc from 'react-native-vector-icons/AntDesign';
import MyStatusBar from '../../components/MyStatusBar';
import { images } from '../../constants/index';
import OfferCard from '../../components/OfferCard';
import { useTranslation } from 'react-i18next';
// import axios from 'axios';
import { deviceId, fcmToken } from '../../../src/screens/HomeScreens/HomeScreen';

import HomCardE from '../../components/HomCardE';
import HomCardA from '../../components/HomCardA';
import { useIsFocused } from '@react-navigation/native';
import instance from '../../axios_helper';

import {
  StyleSheet,
  Platform,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  FlatList,
} from 'react-native';
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const FavoriteScreen = () => {


  const isFocused = useIsFocused();

  const navigation = useNavigation();
  const { t, i18n } = useTranslation();

  const [offersCop, setOffersCop] = useState([]);
  const [favPage, setFavPage] = useState(1);
  const [nextOffCop, setNextOffCop] = useState();
  const [isLoad, setIsLoad] = useState(true);



  const handLike = (copon) => {

    console.log("fav 222 ");
    console.log(copon);
    console.log(offersCop);
    try {
      var isFav = copon.is_favourite;

      const path = `https://xcobon.com/api/favourites?coupon_id=${copon.id}`;
      console.log(path);
      const formData = new FormData();
      instance({
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

          copon.is_favourite = !isFav;
          const lst = [...offersCop];
          // lst.forEach((item) => {
          //   if (item.id == copon.id) {
          //     item.is_favourite = result;
          //   }

          // });
          setOffersCop(lst);
          console.log(response.data.data.coupons[0]);

          loadPage();
        })
        .catch(response => {
          console.log("Fav Error ")
          console.log(response);
        })


    } catch (err) {
      console.log(" Fav Error")
      console.log(err);
    }

  }

  function loadPage() {
    console.log("deviceID: ", deviceId);
    setNextOffCop(false);
    setOffersCop([]);
    setIsLoad(true);
    instance
      .get(`https://xcobon.com/api/favourites?page=${favPage}`, {
        // cancelToken: cancelTokenSource2.token,
        headers: {
          deviceKey: deviceId,
          'fcm-token': fcmToken,
          language: i18n.language == undefined ? 'en' : i18n.language,
        },
      })
      .then(response => {
        console.log('ffffffff' + response.data);
        setNextOffCop(response.data.data.pagination.has_next);
        setOffersCop(response.data.data.content);
        setIsLoad(false);
      })
      .catch(response => {
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
  };
  useEffect(() => {
    loadPage();
  }, [isFocused]);

  const navToDet = item => {
    console.log(item);
    navigation.navigate('DetailScreen', { itm: item });
  };

  return (
    <View style={styles.container}>
      <MyStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View
        style={[
          styles.appBar,
          {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
            height: APPBAR_HEIGHT,
            paddingHorizontal: 20,
            backgroundColor: '#FFFFFF',
          },
        ]}>
        <View style={styles.cont2}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 18,
              color: 'black',
              fontFamily: 'Dubai-Bold',
              fontWeight: '500',
            }}>
            {t('Favorite')}
          </Text>
        </View>
      </View>


      {isLoad ? (
        <ActivityIndicator color={'#D54078'} />
      ) : (
        <>
          <View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
            {offersCop == undefined || offersCop.length == 0 ? (

              <View style={{
                height: '100%',
                flexDirection: 'column',
                justifyContent: 'center', alignContent: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}>


                <Image style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignItems: 'center',
                  width: 100,
                  height: 100,
                  justifyContent: 'center',
                  alignContent: 'center'

                }} source={images.no_copouns} ></Image>
                <Text
                  style={{
                    alignItems: 'center',
                    color: '#D54078',
                    marginTop: 20,
                    alignSelf: 'center',
                    fontSize: 18,
                    fontWeight: '500',
                    fontFamily: 'Dubai-Bold',
                    // marginTop:4
                  }}>
                {t('No available copupons')}

                </Text>
              </View>
            ) : (
              <FlatList
                contentContainerStyle={{ paddingTop: 15 }}
                showsVerticalScrollIndicator={false}
                horizontal={false}
                data={offersCop}
                onEndReached={() => {
                  if (nextOffCop == true) {
                    console.log(' fetch data');
                    setFavPage(favPage + 1);
                  }
                }}
                onEndReachedThreshold={0.5}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                  if (i18n.language === 'en') {
                    return <HomCardE
                      onpres={navToDet}
                      item={item}
                      key={item.id}
                      handleLike={() => handLike(item)}
                    />;
                  } else {
                    return <HomCardA
                      onpres={navToDet}
                      item={item}
                      key={item.id}
                      handleLike={() => handLike(item)}
                    />;
                  }
                }}
              />
            )}
          </View>
        </>
      )}
    </View>
  );
};


export default FavoriteScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  statusBar: {
    // height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: '#FFFFFF',
    // height: APPBAR_HEIGHT,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#FFFFFF',
  },
  cont2: {
    alignSelf: 'center',
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
