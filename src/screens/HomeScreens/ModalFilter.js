import Modal from 'react-native-modal';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

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
import { images } from '../../constants/index';

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

// طول ما البروبس ما تغيرت ما بتتاثر الهوم سكرين

const WrapperComponent = (props) => {
  //  ازا تغيرت الستيت الةاخلية بترندر بس هادا الكومبونت مرة تانية وما بترندر الهوم لانو البروبس الي جاية ما تاثرت
  const { isVisible, toggleModal, handleFilter , countries ,selectedCountry } = props;

  const [isModalVisible, setModalVisible] = useState(false);
  const [pClick, setPClick] = useState(0);
  const { t, i18n } = useTranslation();
  const [TClick, setTClick] = useState(0);

  const handlPlc = idd => {
    setPClick(idd);
  };

  const handleType = idd => {
    setTClick(idd)
  }

  useEffect(()=>{
    setPClick(selectedCountry);
  }, []);

  return (
    <>
      <Modal isVisible={isVisible}>
        <View style={styles.parView}>
          <View style={styles.fView}>
            <Text style={styles.placText}>{t('Place')}</Text>
          </View>
          <View style={styles.wrpView}>

            <FlatList
              horizontal={false}
              style={{height: 180}}
              data={countries}
              renderItem={(item) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      handlPlc(item.item.id);
                    }}
                    style={[
                      styles.touchTxt,
                      {  marginVertical: 4, padding: 10, backgroundColor: pClick == item.item.id ? '#D54078' : '#EEEEEE' },
                    ]}>

                    <View style={{
                      alignContent:'center',
                      justifyContent:'center',
                      alignItems:'center',
                      alignSelf:'center',
                      
                      
                      flexDirection: 'row' , paddingHorizontal: 50
                      }}>
                    <Image
                      source={{uri: item.item.flag_url}}
                      style={{width: 25, height: 25, 
                        
                        marginHorizontal: 20}}
                      resizeMode={'contain'}
                    />
                    <Text
                      style={[
                        styles.touchTxtStyle,
                        { 
                           color: pClick == item.item.id ? 'white' : 'black' },
                      ]}>
                      {item.item.name}
                    </Text>
                    </View>
                    
                  </TouchableOpacity>
                );
              }}

            />

          </View>

          {/* <View style={{alignItems: 'center'}}>
            <Text style={styles.typeTxt}>{t('Type')}</Text>
          </View> */}

          {/* <View style={styles.itmsView}>
            <TouchableOpacity
            onPress={()=>{handleType(0)}}
            style={[styles.alView,  {backgroundColor: TClick == 0 ? '#D54078' : '#EEEEEE'},]}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  fontFamily: 'Dubai-Bold',
                  color: TClick == 0 ? 'white' : 'black'
                }}>
                {t('All')}{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
             onPress={()=>{handleType(1)}}
            style={[styles.it1View,{backgroundColor: TClick == 1 ? '#D54078' : '#EEEEEE'}]}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  fontFamily: 'Dubai-Bold',
                  color: TClick == 1 ? 'white' : 'black'

                }}>
                {t('Gifts')}{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
             onPress={()=>{handleType(2)}}
            style={[styles.it2View,{backgroundColor: TClick == 2 ? '#D54078' : '#EEEEEE'}]}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  fontFamily: 'Dubai-Bold',
                  color: TClick == 2 ? 'white' : 'black'

                }}>
                {t('Children')}{' '}
              </Text>
            </TouchableOpacity>
          </View> */}


          <TouchableOpacity onPress={() => {
            handleFilter(pClick, "all2")

          }} style={styles.bTxt1}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                fontFamily: 'Dubai-Bold',
                color: 'white',
              }}>
              {t('Apply')}{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal} style={styles.bTxt2}>
            <Text
              style={{
                marginTop: 4,
                fontSize: 18,
                fontWeight: '700',
                fontFamily: 'Dubai-Bold',
                color: '#29B1E5',
              }}>
              {t('Cancel')}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default WrapperComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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

    marginBottom: 4,
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
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#D54078',
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: 5,
  },
  touchTxtStyle: {
    fontSize: 18,
    fontWeight: '700',
    width: '100%',

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
    backgroundColor: '#fff',
    paddingStart: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    height: '100%',
  },
});
