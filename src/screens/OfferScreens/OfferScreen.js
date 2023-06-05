import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import FeatherIc from 'react-native-vector-icons/Feather';
import FontAwesomeIc from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import AntIc from 'react-native-vector-icons/AntDesign';
import MyStatusBar from '../../components/MyStatusBar';
import {images} from '../../constants/index';
import {getDeviceId} from 'react-native-device-info';
import {useTranslation} from 'react-i18next';
import OfferCard from '../../components/OfferCard';
// import axios from 'axios';
import instance from '../../axios_helper';
import {deviceId} from '../../../App';
import {
  StyleSheet,
  AppRegistry,
  Platform,
  SafeAreaView,
  ActivityIndicator,
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
} from 'react-native';
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

// const cancelTokenSource = instance.CancelToken.source();
// var cancelTokenSource2 = instance.CancelToken.source();


const OfferScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [categrs, setCategrs] = useState([
    {
      id: 0,
      name: 'All',
      image: 'bSett'
    }
  ]);
  const [pageC, setPageC] = useState(0);
  const [nextCatg, setNextCath] = useState();
  const [currentIdCatg, setCurIdCatg] = useState(null);
  const [coupons, setCoups] = useState([]);
  const [pageCop, setPageCop] = useState(1);
  const [nextCop, setNextCop] = useState();
  const { width, height } = useWindowDimensions();
  const [isLoad, setIsLoad] = useState(true);
  const [isLoadCatg, setIsLoadCatg] = useState(true);
  // const [pClick, setPClick] = useState(0);
  // const[tClick,setTClick]= useState(0);
  // true
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    console.log("Page Started");
    setPageC(1);

    return () => {
      console.log("Kareem By !!!");
      // cancelTokenSource.cancel();


    }
  }, []);

  useEffect(() => {
    console.log('1PageC Chandgedd ....');
    if (pageC == 0) {
      console.log("1PageC Chandgedd  Ignored First Ti")
      return;
    }
    var path = `https://xcobon.com/api/categories?page=${pageC}`;

    console.log("kareem path: ", path);

    instance.get(
      path,
      {

        headers: {
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
          setNextCop(error.response.data.data.pagination.has_next);
          setCoups(error.response.data.data.content);
          setIsLoad(false);
          return;
        }

      });
  }, [pageC]);

  const preapareCategroes = (response) => {


    var isFirstTime = categors == undefined || categors.length == 0;

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

    if (currentIdCatg != undefined && currentIdCatg != null) {
      loadCps()
    }


  }, [pageCop])

  useEffect(() => {

    var path = `https://xcobon.com/api/offers?page=${pageCop}&category_id=${currentIdCatg}`;
    try {
      // cancelTokenSource2.cancel();

      console.log("getCoupons cancel success ");
    } catch (err) {
      console.log("getCoupons cancel error ");
    }

    // cancelTokenSource2 = instance.CancelToken.source();

    console.log(path)
    if (currentIdCatg == null) {
      console.log("Kareem  getCoupons First Time Ignore ");
      return;
    }
    instance.get(
      path,
      {
        // cancelToken: cancelTokenSource2.token,
        headers: {
          // deviceKey: '23',
          deviceKey: deviceId,
          language: i18n.language == undefined ? "en" : i18n.language,
        },
      },
    ).then(async (response) => {
      console.log("response: " , response.data);
      setNextCop(response.data.data.pagination.has_next);
      setCoups(response.data.data.content);
      setIsLoad(false);
    }).catch((response) => {
      console.log("status error: ");
      console.log(response);

      if (response.response != undefined && response.response.status != undefined && response.response.status == 403) {
        console.log(response.response);
        setNextCop(response.response.data.data.pagination.has_next);
        setCoups(response.response.data.data.content);
        setIsLoad(false);
        return;
      }
      console.log("getCoupons Error " + response.response.status);
      console.log(response);
      console.log(response.response);
      console.log(response.response.data);

      setIsLoad(false);
    });

  }, [currentIdCatg]);


  const handlPlc = (idd) => {
    setPClick(idd)
  }
  const handleType = (idd) => {
    setTClick(idd)
  }


  const fetchfirstCatg = (categrs2) => {
    if (categrs2 != undefined && categrs2.length > 0) {
      setCurIdCatg(categrs2[0].id);
    } else {
      console.log('no categrs');
    }
  };



  const getCoupons = async () => {

    var path = `https://xcobon.com/api/coupons?page=${pageCop}&category_id=${currentIdCatg}`;
    console.log('getCoupons path: ', path);
    try {
      var response = await instance.get(
        path,
        {
          // cancelToken: cancelTokenSource.token,
          headers: {
            // deviceKey: '23',
            deviceKey: deviceId,
            language: i18n.language == undefined ? "en" : i18n.language,
          },
        },
      );
      setNextCop(response.data.data.pagination.has_next);
      return response.data.data.content;
    } catch (err) {
      console.log("status error: 2");
      if (err.response.status == 403) {
        if (response.data.data != undefined) {
          setNextCop(response.data.data.pagination.has_next);
          return response.data.data.content;
        }
      }
      return [];
    }
  };

  const navToDet = item => {
    console.log(item)
    navigation.navigate('DetailScreen', { itm: item });
  };


  const handLike = (copon) => {

    console.log("fav 222", copon.id);
    console.log(copon);
    try {

      const path = `https://xcobon.com/api/favourites?coupon_id=${copon.id}`;
      console.log(path);
      const formData = new FormData();
      instance({
        method: "post",
        url: `https://xcobon.com/api/favourites?coupon_id=${copon.id}`,
        data: formData,

        headers: {
          // 'deviceKey': '23',

          'deviceKey': deviceId,
          'Content-Type': 'multipart/form-data',
          'accept': '*/*',
          'language': i18n.language == undefined ? "en" : i18n.language,
        }

      })
        .then(response => {
          const result = response.data.data.coupons[0].is_favourite;

          const lst = [...coupons];
          lst.forEach((item) => {
            if (item.id == copon.id) {
              item.is_favourite = result;
            }

          });
          setCoups(lst);
          console.log(response);
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



  

  const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  // const WrapperComponent = () => (
  //   <WrapperComponent>

  //   </WrapperComponent>
  // );

  return (
    <>
      <View style={styles.container}>
        <MyStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

        <View style={styles.appBar}>

          <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                fontFamily: 'Dubai-Bold',
                fontWeight: '500'
              }}>
              {t('Offers')}
            </Text>
          </View>

        </View>

        {isModalVisible ?
          <WrapperComponent
            isVisible={isModalVisible}
            handleFilter={(place, ds) => {
              console.log("Home Screen ", place, ds);
              toggleModal()
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

          {isLoadCatg ? <ActivityIndicator /> :

            <FlatList
              contentContainerStyle={styles.flatctg}
              centerContent={true}
              horizontal={true}

              showsHorizontalScrollIndicator={false}
              data={categrs}
              onEndReached={() => {
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
                          setCoups([])
                          setIsLoad(true);
                          setCurIdCatg(item.id)
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
                      source={ item.id == 0 
                            ? require('../../assets/images/ic_total_items.png') 
                            : { uri: `${item.image_thumbnail}` } }
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        marginEnd: 6,
                        backgroundColor:   item.id == 0  ? '#fff' :'#ECECEC',
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
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />}








        </View>


        {isLoad ? (
          <ActivityIndicator color={'#D54078'} />
        ) : (
          <>
            {i18n.language === 'en' ? <View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
              {coupons == undefined || coupons.length == 0 ? (
                <Text
                  style={{
                    color: '#D54078',
                    alignSelf: 'center',
                    fontSize: 18,
                    fontWeight: '500',
                    fontFamily: 'Dubai-Bold',
                    // marginTop:4
                  }}>

                  {t('No available coupons for this category')}
                </Text>
              ) : (
                <FlatList
                  horizontal={false}
                  contentContainerStyle={{ paddingTop: 15 }}
                  data={coupons}
                  onEndReached={() => {
                    if (nextCop == true) {
                      setPageCop(pageCop + 1)

                    }

                  }}
                  onEndReachedThreshold={0.5}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => ( 
                    <OfferCard handleLike={handLike} item={item} onpres={()=>{
                      navigation.navigate('DetScreen', {itm: item});
                    }} key={item.id} />
                   )}
                />
              )}
            </View> :
              <View style={{ flex: 1 }}>
                {coupons == undefined || coupons.length == 0 ? (
                  <Text
                    style={{
                      color: '#D54078',
                      alignSelf: 'center',
                      fontSize: 18,
                      fontWeight: '500',
                      fontFamily: 'Dubai-Bold',
                    }}>

                    {t('No available coupons for this category')}
                  </Text>
                ) : (
                  <FlatList
                    horizontal={false}
                    data={coupons}
                    onEndReached={() => {
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
  );
};

export default OfferScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#FFFFFF',
  },

  flatctg: {
    backgroundColor: '#fff',
    paddingStart: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    height: '100%',
  },
});
