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
import axios from 'axios';
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

const OfferScreen = () => {
  const [offers, setOffers] = useState([]);
  const [pageCop, setPageCop] = useState(1);
  const [nextCop, setNextCop] = useState();
  const [isLoad, setIsLoad] = useState(true);

  const navigation = useNavigation();
  const {t, i18n} = useTranslation();

  useEffect(() => {
    axios
      .get(`https://xcobon.com/api/offers?page=${pageCop}`, {
        // cancelToken: cancelTokenSource2.token,
        headers: {
          language: i18n.language == undefined ? 'en' : i18n.language,
        },
      })
      .then(response => {
        setNextCop(response.data.data.pagination.has_next);
        setOffers(response.data.data.content);
        setIsLoad(false);
      })
      .catch(response => {
        console.log('getOffers Error ' + response);

        // if (response.response.status == 403){
        if (
          response != undefined &&
          response.response != undefined &&
          response.response.status != undefined &&
          response.response.status == 403
        ) {
          setNextCop(response.response.data.data.pagination.has_next);
          setOffers(response.response.data.data.content);
          setIsLoad(false);
          return;
        }
        setIsLoad(false);
      });
  }, [pageCop]);
  const navToDet = item => {
    console.log(item);
    navigation.navigate('DetScreen', {itm: item});
  };

  const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, {backgroundColor}]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );

  return (
    <>
      <View style={styles.container}>
        <MyStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

        <View style={styles.appBar}>
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Dubai-Bold',
                fontWeight: '500',
                color: 'black',
              }}>
              {t('Offers')}
            </Text>
          </View>
        </View>

        {isLoad ? (
          <ActivityIndicator color={'#D54078'} />
        ) : (
          <>
            <View style={{flex: 1, backgroundColor: '#f7f7f7'}}>
              {offers == undefined || offers.length == 0 ? (
                <Text
                  style={{
                    color: '#D54078',
                    alignSelf: 'center',
                    fontSize: 18,
                    fontWeight: '500',
                    fontFamily: 'Dubai-Bold',
                    // marginTop:4
                  }}>
                  {t('No available offer for this category')}
                </Text>
              ) : (
                <FlatList
                  contentContainerStyle={{paddingTop: 15}}
                  showsVerticalScrollIndicator={false}
                  horizontal={false}
                  data={offers}
                  onEndReached={() => {
                    if (nextCop == true) {
                      console.log(' fetch data');
                      setPageCop(pageCop + 1);
                    }
                  }}
                  onEndReachedThreshold={0.5}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => (
                    <OfferCard
                      onpres={navToDet}
                      item={item}
                      key={item.id}
                      // handleLike={() => handLike(item)}
                    />
                  )}
                />
              )}
            </View>
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
