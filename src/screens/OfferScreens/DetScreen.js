import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Platform,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import MyStatusBar from '../../components/MyStatusBar';
import {useNavigation} from '@react-navigation/native';
import FeatherIc from 'react-native-vector-icons/Feather';
import FontAwesomeIc from 'react-native-vector-icons/FontAwesome';
import {images} from '../../constants/index';
import AntIc from 'react-native-vector-icons/AntDesign';

const screenWidth = Dimensions.get('window').width;

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const DetScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.containerr}>
      <MyStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View style={styles.appBar}>
        <TouchableOpacity
          style={{width: '20%'}}
          onPress={() => navigation.goBack()}>
          <AntIc name={'arrowleft'} size={20} />
        </TouchableOpacity>
        <View
          style={{
           
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{fontSize: 18, fontFamily: 'Dubai-Bold', fontWeight: '500'}}>
            Offer Details
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '15%',
            // backgroundColor:'red'
          }}>
          <TouchableOpacity
            style={{alignSelf: 'flex-start', paddingHorizontal: 5}}>
            <FontAwesomeIc name={'filter'} size={20} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{alignSelf: 'flex-end', paddingHorizontal: 5}}>
            <FeatherIc name={'more-vertical'} size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <ImageBackground
          source={images.abc}
          style={{
            width: '97%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderColor: '#D8D8D8',
            padding: 10,
            borderRadius: 20,
            borderWidth: 2,
            // marginHorizontal: 20,
            alignSelf: 'center',
            height: 150,
            paddingHorizontal: 18,
            marginBottom: 15,
          }}
          resizeMode={'contain'}>
          <TouchableOpacity style={{alignSelf: 'flex-start'}}>
            <AntIc name="heart" size={20} color={'red'} />
          </TouchableOpacity>

          <View
            style={{
              alignSelf: 'flex-start',
              width: 80,
              height: '21%',
              paddingHorizontal: 10,
              paddingVertical: 5,
              backgroundColor: '#ECECEC',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#636363', fontWeight: '700'}}>20% off</Text>
          </View>
        </ImageBackground>

        <View
          style={{
            width: '90%',
            marginBottom: 15,
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text
              style={{
                alignSelf: 'flex-start',
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              Amazon Saudi Arabia 10% off
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#ECECEC',
              minWidth: 72,
              borderRadius: 7,
              paddingHorizontal: 10,
              paddingVertical: 5,
              alignSelf: 'flex-end',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#636363', fontSize: 16, fontWeight: 'bold'}}>
              COUP10
            </Text>
          </View>
        </View>
        <View style={{width: '90%', alignSelf: 'center', marginBottom: 7}}>
          <Text style={{color: '#7B7C7E'}}>
            Amazon Saudi Arabia is a store that sells all items, clothes and
            electrical appliances
          </Text>
        </View>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            marginBottom: 25,
            paddingStart: 5,
          }}>
          <Text style={{color: '#7B7C7E'}}>Ends on 15/10/2022</Text>
        </View>

        <View style={{width: '90%', alignSelf: 'center', marginBottom: 5}}>
          <Text style={{fontSize: 18, fontWeight: '700'}}>Related Offers</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('DetScreen');
          }}
          activeOpacity={0.3}
          style={{
            width: '95%',
            shadowOffset: {width: 1, height: 3},
            shadowOpacity: 0.4,
            shadowRadius: 5,
            elevation: 9,
            shadowColor: 'gray',
            // borderWidth:1,
            borderColor: '#ECECEC',
            borderRadius: 12,
            paddingStart: 5,
            backgroundColor: 'white',
            marginBottom: 15,
            alignSelf: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              alignSelf: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              // paddingStart:8,
              width: '100%',
              height: 110,
            }}>
            <View
              style={{
                width: 90,
                height: 90,
                borderRadius: 15,
                borderColor: '#DCDCDC',
                borderWidth: 1,
                padding: 5,
              }}>
              <TouchableOpacity
                style={{alignSelf: 'flex-end', marginEnd: 3, height: '22%'}}>
                <AntIc name="hearto" size={18} color={'gray'} />
              </TouchableOpacity>
              <Image
                source={images.STC}
                style={{
                  width: '100%',
                  height: '70%',
                  alignSelf: 'flex-start',
                  resizeMode: 'stretch',
                }}
              />
            </View>

            <View style={{paddingStart: 8}}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 16,
                  fontWeight: '500',
                  fontFamily: 'Dubai-Bold',
                }}>
                Amazon products at 10% off
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  fontFamily: 'Dubai-Regular',
                  color: '#7A7A7A',
                  color: '#7A7A7A',
                }}>
                10/15/2022 with an expiring date
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
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
    backgroundColor: '#FFFFFF',
    height: APPBAR_HEIGHT,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
});
