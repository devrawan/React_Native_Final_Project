import React from 'react';
import { images } from '../constants/index';
import AntIc from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { StyleSheet, StatusBar, Image, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
const HomCardE = ({ item, onpres, handleLike }) => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  return (
    <TouchableOpacity
      key={item.id}
      onPress={() => onpres(item)}
      activeOpacity={0.3}
      style={{

        margin: 10,
        width: '95%',
        backgroundColor: 'white',
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 3,

        elevation: 9,
        shadowColor: 'gray',
        borderRadius: 15,
        paddingStart: 3,
        alignSelf: 'center',
        alignContent: 'center',
        alignItems: 'center',

      }}>
      <ImageBackground
        resizeMode="stretch"
        source={images.ImageMainItemBGLtr}
        style={{
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          // paddingStart: 8,
          width: '100%',



          height: 110,
        }}>
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 15,
            borderColor: '#DCDCDC',
            borderWidth: 1,
            padding: 5,
            // marginStart:3
          }}>
          {item.is_favourite == true ? <TouchableOpacity
            onPress={() => {
              handleLike(item)
            }
            }
            style={{ alignSelf: 'flex-end', width: 20, }}>
            <AntIc name="heart" size={18} color={'red'} />
          </TouchableOpacity> : <TouchableOpacity
            onPress={() => handleLike(item)}
            style={{ alignSelf: 'flex-end' }}>
            <AntIc name="hearto" size={18} color={'#656565'} />
          </TouchableOpacity>
          }


          <Image
            // source={images.STC}
            source={{ uri: item.image_thumbnail }}
            style={{
              width: 70,
              height: 60,
              alignSelf: 'center',

              borderRadius: 10
              //  marginBottom:-5
            }}

          />
        </View>

        <View style={{ paddingStart: 8, width: '65%' }}>
          <Text
            style={{
              color: '#000000',
              fontSize: 16,
              fontWeight: '500',
              fontFamily: 'Dubai-Bold',
              textAlign: 'left'
            }}>
            {item.name}

          </Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: '400',
              fontFamily: 'Dubai-Regular',
              color: '#7A7A7A',
              textAlign: 'left'
            }}>
            {t('with an expiring date')} {item.start_at}
            {/* {item.coupon} */}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>



  )
}
export default HomCardE;

const styles = StyleSheet.create({
  warpView: {
    width: '100%', height: 70, backgroundColor: 'red',
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 9,
    shadowColor: 'gray',
    backgroundColor: 'white',
    marginBottom: 1,
    flexDirection: 'row'
    , alignItems: 'center',
    paddingHorizontal: 20
  },
  imView: {
    width: 20, height: 20, marginEnd: 10
  }


});
