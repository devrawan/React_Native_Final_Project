import React, { useState, useEffect } from 'react';
import { images } from '../../constants/index';
// import { NavigationContainer } from '@react-navigation/native';
// import FeatherIc from 'react-native-vector-icons/Feather';
import FontAwesomeIc from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
// import AntIc from 'react-native-vector-icons/AntDesign';
import { useTranslation } from 'react-i18next';
// import Modal from 'react-native-modal';
// import Snackbar from 'react-native-snackbar';
// import { timeout } from '../../../App';
import { initializeApp } from '@react-native-firebase/app';
import { useIsFocused } from '@react-navigation/native';
import { getUniqueId } from 'react-native-device-info';
import messaging, { firebase } from '@react-native-firebase/messaging';

import {
  StyleSheet,
  Button,
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
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import HomCardE from '../../components/HomCardE';
import HomCardA from '../../components/HomCardA';
import WrapperComponent from './ModalFilter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import MyStatusBar from '../../components/MyStatusBar';
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

// const cancelTokenSource = instance.CancelToken.source();
// var cancelTokenSource2 = instance.CancelToken.source();

export var deviceId = "";
export var fcmToken = "";

const HomeScreen = () => {
  const isFocused = useIsFocused();
  const { t, i18n } = useTranslation();

  const [isModalVisible, setModalVisible] = useState(false);
  const [categrs, setCategrs] = useState([
    {
      id: 0,
      name: (i18n.language == undefined ? "en" : i18n.language) ? 'All' : 'الكل',
      image: 'bSett'
    }
  ]);

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(0);

  const [pageC, setPageC] = useState(1);
  const [nextCatg, setNextCath] = useState();
  const [currentIdCatg, setCurIdCatg] = useState(null);
  const [coupons, setCoups] = useState([]);
  const [pageCop, setPageCop] = useState(1);
  const [nextCop, setNextCop] = useState(true);
  const { width, height } = useWindowDimensions();
  const [isLoad, setIsLoad] = useState(true);
  const [isLoadCatg, setIsLoadCatg] = useState(true);
  const [overrideCopounPage, setOverrideCopounPage] = useState(false);
  const navigation = useNavigation();


  async function requestUserPermission() {

    try {

      if (firebase.apps.length == 0) {
        const app = await initializeApp({
          appId: '1:368594238603:ios:c77836caefc2c04028e88e',
          apiKey: 'AIzaSyCVexBz9LQO4yIIFt15VPIgPnXh484GEJs',
          messagingSenderId: '368594238603',
          projectId: 'xcobon-cbd5a',
          authDomain: "",
          databaseURL: "",
          storageBucket: "",
        });
      }

    } catch (error) { }


    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  }

  useEffect(() => {

    function onMessageReceived(message) {
    }
    const setup = async () => {

      

      try {
        deviceId = await getUniqueId();
        console.log("deviceId: ", deviceId);
      } catch (error) {
        deviceId = "kr-" + Math.random();
        console.log("getUniqueId: ", error)
      }


      try {
        // await axios.post(
        //   `https://xcobon.com/api/update_device_key`,
        //   {
        //     'deviceKey': deviceId,
        //     'device_key': deviceId,
        //     'fcm-token': ""
        //   },
        //   {
        //     headers: {
        //       'deviceKey': deviceId,
        //       'Content-Type': 'application/json',
        //       'accept': '*/*',
        //       'language': 'en'
        //     }
        //   }

        // )
      } catch (error) {

      }

      try {
        await requestUserPermission();
        messaging().onMessage(onMessageReceived);
        messaging().setBackgroundMessageHandler(onMessageReceived);
      } catch (error) {
        console.log("requestUserPermission error: ", error)
      }

      if ('test' == 'test') {
        messaging().getAPNSToken().then((apns) => {
          console.log("apns: ", apns)
          messaging().setAPNSToken('1234', 'prod').then(() => {
            messaging().getToken()
              .then((mFcmToken) => {
                console.log("mFCM TOKEN: ", mFcmToken);
                fcmToken = mFcmToken;
              });
          });
        });
      }

    }
    setup();
  }, []);


  useEffect(() => {
    setTimeout(async () => {

      var isRegisterView = await AsyncStorage.getItem('done_register2');
      console.log("isRegisterView: ", isRegisterView)
      if (isRegisterView !== "true") {
        // await AsyncStorage.setItem('done_register2', "true");
        navigation.navigate('RegisterScreen');
      }
      console.log('1PageC Chandgedd ....');
      if (pageC == 0 || deviceId == '') {
        console.log("1PageC Chandgedd  Ignored First Ti")
        return;
      } else {
        try {
          let countries = await axios.get('https://xcobon.com/api/countries',
            {

              headers: {
                'deviceKey': deviceId,
                'fcm-token': fcmToken,
                language: i18n.language == undefined ? "en" : i18n.language,
              },
            },
          )
          setCountries(countries.data.data);
          console.log("countries ", countries.data)
        } catch (error) {
          console.log("countries errpr", error)

        }

        var path = `https://xcobon.com/api/categories?page=${pageC}&per_page=100`;
        console.log("kareem path: ", path);

        axios.get(
          path,
          {

            headers: {
              'deviceKey': deviceId,
              'fcm-token': fcmToken,
              language: i18n.language == undefined ? "en" : i18n.language,
            },
          },
        )
          .then((data) => {
            console.log("Kareem PageC Chandgedd Data");
            // console.log(data);
            preapareCategroes(data);

          }).catch((error) => {

            console.log("Kareem PageC Chandgedd Error");
            console.log(error);
            if (error.response != undefined && error.response.status != undefined && error.response.status == 403) {
              setNextCath(error.response.data.data.pagination.has_next);
              setCategrs(error.response.data.data.content);
              setIsLoadCatg(false);
              return;
            }

          });
      }




    }, 100);
  }, [pageC]);

  const preapareCategroes = (response) => {

    var categors = response.data;
    setNextCath(categors.data.pagination.has_next);


    var ids = categrs.map(item => item.id);
    var items2 = categors.data.content.filter(item => {
      var isEqual = ids.includes(item.id);
      return !isEqual;
    });
    var reuslt = [...categrs, ...items2];
    setCategrs(reuslt);
    setIsLoadCatg(false);

    fetchfirstCatg(reuslt);
    // if (isFirstTime){
    //   console.log("Fetch First Category Coupon 1")
    // }else{
    //   console.log("Fetch First Category Coupon  2")
    //   fetchfirstCatg();

    // }
  }

  useEffect(() => {
    const loadCps = async () => {

      var itms = await getCoupons();
      console.log("loadCps ");
      console.log(itms);

      var ids = coupons.map((item) => item.id);
      var items2 = itms.filter((item) => {
        var isEqual = ids.includes(item.id);
        return !isEqual;
      });
      setCoups([...coupons, ...items2]);
      setIsLoad(false)
      return "";
    };

    if (overrideCopounPage == false) {
      if (currentIdCatg != undefined && currentIdCatg != null) {
        loadCps()
      }
    }
    else {
      console.log("overrideCopounPage: ", overrideCopounPage)
    }
  }, [pageCop])


  useEffect(() => {
    const loadCps = async () => {

      setOverrideCopounPage(true);
      setPageCop(1);
      setCoups([]);
      setIsLoad(true)

      var itms = await getCoupons();

      // console.log("loadCps ");
      // console.log(itms);
      // var ids = coupons.map((item) => item.id);
      // var items2 = itms.filter((item) => {
      //   var isEqual = ids.includes(item.id);
      //   return !isEqual;
      // });
      setCoups(itms);
      setIsLoad(false)
      setOverrideCopounPage(false);

    };

    if (currentIdCatg != undefined && currentIdCatg != null) {
      loadCps()
    }
  }, [currentIdCatg])

  // useEffect(() => {

  //   if (deviceId == null || deviceId == undefined || deviceId == '') {
  //     console.log("deviceID is nulll ");
  //     return;
  //   }


  //   console.log("################## getCoupons Country ID ", selectedCountry)
  //   var country_query = !(selectedCountry == undefined || selectedCountry == 0) ? `&countryId=${selectedCountry}` : ``;
  //   var category_query = !(currentIdCatg == undefined || currentIdCatg == null || currentIdCatg == 0) ? `&category_id=${currentIdCatg}` : ``;

  //   var path = `https://xcobon.com/api/coupons?page=${pageC}${category_query}${country_query}&per_page=3`;

  //   console.log(path)
  //   if (currentIdCatg == null) {
  //     console.log("Kareem  getCoupons First Time Ignore ");
  //     return;
  //   }
  //   axios.get(
  //     path,
  //     {
  //       // cancelToken: cancelTokenSource2.token,
  //       headers: {
  //         'deviceKey': deviceId,
  //         'fcm-token': fcmToken,
  //         language: i18n.language == undefined ? "en" : i18n.language,
  //       },
  //     },
  //   ).then(async (response) => {
  //     console.log("response:  ", response.data)
  //     console.log("response.data.data.pagination.has_next: " , response.data.data.pagination.has_next);
  //     setNextCop(response.data.data.pagination.has_next);
  //     setCoups(response.data.data.content);
  //     setIsLoad(false);
  //   }).catch((response) => {
  //     console.log("status error: ");
  //     console.log(response);

  //     if (response.response != undefined && response.response.status != undefined && response.response.status == 403) {
  //       console.log(response.response);
  //       setNextCop(response.response.data.data.pagination.has_next);
  //       setCoups(response.response.data.data.content);
  //       setIsLoad(false);
  //       return;
  //     }
  //     console.log("getCoupons Error " + response.response.status);
  //     console.log(response);
  //     console.log(response.response);
  //     console.log(response.response.data);

  //     setIsLoad(false);
  //   });


  // }, [currentIdCatg]);


  const fetchfirstCatg = (categrs2) => {
    if (categrs2 != undefined && categrs2.length > 0) {
      setCurIdCatg(categrs2[0].id);
    } else {
      console.log('no categrs');
    }
  };



  const getCoupons = async () => {

    console.log("################## getCoupons Country ID ", selectedCountry)
    console.log("################## getCoupons Category ID ", currentIdCatg)

    var country_query = !(selectedCountry == undefined || selectedCountry == 0) ? `&countryId=${selectedCountry}` : ``;
    var category_query = !(currentIdCatg == undefined || currentIdCatg == 0) ? `&category_id=${currentIdCatg}` : ``;

    var path = `https://xcobon.com/api/coupons?page=${pageCop}${category_query}${country_query}&per_page=10#${Math.random()}`;

    console.log('getCoupons path: ', path);
    try {
      var response = await axios.get(
        path,
        {
          // cancelToken: cancelTokenSource.token,
          headers: {
            deviceKey: deviceId,
            'fcm-token': fcmToken,
            language: i18n.language == undefined ? "en" : i18n.language,
          },
        },
      );
      console.log("getCoupons path: response ", response.data);
      setNextCop(response.data.data.pagination.has_next);
      return response.data.data.content;
    } catch (err) {
      // setPageCop(1);
      // setCoups([]);
      console.log("status error: 2", err);
      console.log("status error: 2", err.response.data);
      console.log("status error: 2", err.response.status);

      // if (err.response.status == 403) {
      //   console.log("status error: 2333", err.response.data);

      //   if (err.response.data.data != undefined) {
      //     setNextCop(err.response.data.data.pagination.has_next);
      //     return err.response.data.data.content;
      //   }
      // }
      return [];
    }
  };

  const navToDet = item => {
    console.log(item)
    navigation.navigate('DetailScreen', { itm: item });
  };


  const handLike = (copon) => {

    var isFav = copon.is_favourite;
    console.log("fav 222", copon.id,);
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
          // const result = response.data.data.coupons[0].is_favourite;

          copon.is_favourite = !isFav;
          const lst = [...coupons];
          // lst.forEach((item) => {
          //   if (item.id == copon.id) {
          //     item.is_favourite = result;
          //   }

          // });

          setCoups(lst);
          // console.log(response.data);
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



  // const MyStatusBar = ({ backgroundColor, ...props }) => (
  //   <StatusBar showHideTransition={false} backgroundColor={backgroundColor} {...props} />

  // );
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={[styles.statusBar, { flex: 1, backgroundColor: "white" }]}>
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? 0 : 0
      }} >
        <>
          <MyStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

          <View style={styles.container}>

            <View style={[styles.appBar]}>
              <TouchableOpacity
                style={{ width: '20%', height: '100%', alignSelf: 'flex-start', justifyContent: 'center', alignItems: 'center' }}
                onPress={() => {

                }}>
              </TouchableOpacity>
              <View style={{ width: '80%', height: '100%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    fontFamily: 'Dubai-Bold',
                    fontWeight: '500'
                  }}>
                  {t('Coupons')}
                </Text>
              </View>
              <TouchableOpacity
                onPress={toggleModal}
                style={{ width: '20%', height: '100%', alignSelf: 'flex-start', justifyContent: 'center', alignItems: 'center' }}
              >
                <FontAwesomeIc name={'filter'} size={20} color={'black'} />
              </TouchableOpacity>
            </View>

            {isModalVisible ?
              <WrapperComponent
                countries={countries}
                isVisible={isModalVisible}
                selectedCountry={selectedCountry}
                handleFilter={(place, ds) => {
                  var currentCat = currentIdCatg;
                  setCoups(null);
                  setCoups([]);

                  setCurIdCatg(-1);
                  toggleModal()
                  console.log("currentCat: ", currentCat);

                  setIsLoad(true);
                  setSelectedCountry(place);

                  setTimeout(() => {
                    setCurIdCatg(currentCat)
                  }, 1);

                  // console.log("Home Screen ", place, ds);

                }}
                toggleModal={toggleModal}
              /> : <></>}




            <View
              style={{
                height: 60,
                backgroundColor: '#ffffff',
                width: width,
                marginBottom: 6,

              }}>

              {isLoadCatg ? <View style={{
                height: 40
              }}>
                <ActivityIndicator />
              </View> :

                <FlatList
                  contentContainerStyle={styles.flatctg}
                  centerContent={true}
                  horizontal={true}

                  showsHorizontalScrollIndicator={false}
                  data={categrs}
                  onEndReached={() => {
                    console.log("onEndReached onEndReached onEndReached ", nextCatg)

                    if (nextCatg == true) {
                      console.log('donnne 77');
                      setPageC(pageC + 1);
                    } else {
                      console.log('donnne');
                    }
                  }}
                  onEndReachedThreshold={0.5}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        onPress={
                          () => {
                            if (currentIdCatg !== item.id) {


                              setOverrideCopounPage(true);
                              setPageCop(1);
                              setCoups([]);
                              setIsLoad(true)
                              // setPageCop(1);
                              // setCoups([])
                              // setIsLoad(true);

                              // setTimeout(()=>{
                              setCurIdCatg(item.id)
                              // },10);
                            }
                          }
                        }

                        key={item.id}
                        style={{
                          flexDirection: 'row',
                          borderWidth: 1,
                          borderColor: '#E8E8E8',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minWidth: 80,
                          height: 40,
                          paddingHorizontal: 7,
                          backgroundColor: `${item.id == currentIdCatg ? '#D54078' : 'white'
                            }`,
                          borderRadius: 12,
                          marginEnd: 7,
                        }}>
                        <Image
                          source={item.id == 0
                            ? require('../../assets/images/ic_total_items.png')
                            : { uri: `${item.image_thumbnail}` }}
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: 12,
                            marginEnd: 6,
                            backgroundColor: item.id == 0 ? '#fff' : '#ECECEC',
                          }}
                          resizeMode={'contain'}
                        />
                        <Text
                          style={{
                            color: `${item.id == currentIdCatg ? 'white' : '#000000'
                              }`,
                            fontSize: 14,
                            fontWeight: '500',
                            fontFamily: 'Dubai-Bold',
                          }}>
                          {item.id == 0 ? t('All') : item.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />}

            </View>


            {isLoad
              ?
              (
                <View style={{
                  height: '100%',
                  flex: 1,
                  width: '100%',
                  flexDirection: 'column',
                  backgroundColor: '#f7f7f7',
                  justifyContent: 'center', alignContent: 'center',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <ActivityIndicator color={'#D54078'} />
                </View>
              )
              :
              (
                <>
                  {i18n.language === 'en'
                    ?
                    <View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
                      {coupons == undefined || coupons.length == 0 ? (

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

                            {t('No available coupons for this category')}
                          </Text>
                        </View>

                      ) : (

                        <View style={{ height: '100%', flex: 1,
                          paddingBottom: Platform.OS === 'ios' ? 0: 20, 
                         flexDirection: 'column' }}>
                          <FlatList
                            horizontal={false}
                            contentContainerStyle={{ paddingTop: 15 }}
                            data={coupons}
                            onEndReached={() => {
                              console.log("en onEndReached onEndReached onEndReached ", nextCatg)
                              if (nextCop == true) {
                                setPageCop(pageCop + 1)
                              }

                            }}
                            onEndReachedThreshold={0.5}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                              <HomCardE onpres={navToDet} item={item} key={item.id} handleLike={() => handLike(item)} />
                            )}
                          />
                        </View>
                      )}
                    </View>
                    :
                    <View style={{ flex: 1 }}>
                      {coupons == undefined || coupons.length == 0 ? (
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

                            {t('No available coupons for this category')}
                          </Text>
                        </View>
                      ) : (
                        <FlatList
                          horizontal={false}
                          data={coupons}
                          onEndReached={() => {
                            console.log("ar onEndReached onEndReached onEndReached ")

                            if (nextCop == true) {
                              setPageCop(pageCop + 1)
                            }

                          }}
                          onEndReachedThreshold={0.5}
                          keyExtractor={item => item.id}
                          renderItem={({ item }) => (
                            <HomCardA onpres={navToDet} item={item} key={item.id} handleLike={() => handLike(item)} />
                          )}
                        />
                      )}
                    </View>}

                </>
              )}
          </View>
        </>

      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    height: APPBAR_HEIGHT,
    paddingHorizontal: 20,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
  content: {
    backgroundColor: '#FFFFFF',
  },
  // modal styles
  parView: {
    width: 350,
    height: 360,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  fView: {
    alignItems: 'center',
  },
  placText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Dubai-Bold',
    color: '#000000',
    marginBottom: 12,
  },
  wrpView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },
  touchTxt: {
    width: 90,
    height: 37,
    borderRadius: 20,
    backgroundColor: '#D54078',
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: 5,
  },
  touchTxtStyle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Dubai-Bold',
    color: 'white',
  },
  touchImg: {
    width: 90,
    height: 37,
    borderRadius: 20,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: 5,
  },
  touchImg2: {
    width: 90,
    height: 37,
    borderRadius: 20,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: 5,
  },
  typeTxt: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Dubai-Bold',
    color: '#000000',
    marginBottom: 12,
  },
  itmsView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'center',
  },
  alView: {
    width: 90,
    height: 37,
    borderRadius: 20,
    backgroundColor: '#D54078',
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: 5,
    marginBottom: 10,
  },
  it1View: {
    width: 90,
    height: 37,
    borderRadius: 20,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: 5,
    flexDirection: 'row',
  },
  it2View: {
    width: 90,
    height: 37,
    borderRadius: 20,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: 5,
  },
  bTxt1: {
    width: 140,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#29B1E5',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  bTxt2: {
    width: 140,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  // catgView: {
  //   height: 60,
  //   backgroundColor: '#FFFFFF',
  //   width: width,
  //   marginBottom: 18,

  //   shadowRadius: 5,
  //   elevation: 9,

  // },
  flatctg: {
    // paddingTop:5,
    backgroundColor: '#FFF',
    paddingStart: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    height: '100%'
  },
});
