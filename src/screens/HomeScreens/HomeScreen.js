import React, {useState} from 'react';
import {images} from '../../constants/index';
import {NavigationContainer} from '@react-navigation/native';
import FeatherIc from 'react-native-vector-icons/Feather';
import FontAwesomeIc from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import AntIc from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
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
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;




const HomeScreen = () => {

  const [isModalVisible, setModalVisible] = useState(false);
  const {width, height} = useWindowDimensions();
  const navigation = useNavigation();
  const categs = [
    {
      id: 0,
      name: 'all',
      img: '',
    },
    {
      id: 1,
      name: 'sport',
      img: '',
    },
    {
      id: 2,
      name: 'Home',
      img: '',
    },
    {
      id: 3,
      name: 'Gifts',
      img: '',
    },
    {
      id: 4,
      name: 'Electronics',
      img: '',
    },
    {
      id: 5,
      name: 'Fashion',
      img: '',
    },
    {
      id: 6,
      name: 'Food',
      img: '',
    },
  ];
  const data = [
    {
      id: 0,
      img: '',
      text: 'Amazon products at 10% off',
      date: '10/15/2022 with an expiring date',
    },
    {
      id: 1,
      img: '',
      text: 'Amazon products at 10% off',
      date: '10/15/2022 with an expiring date',
    },
    {
      id: 2,
      img: '',
      text: 'Amazon products at 10% off',
      date: '10/15/2022 with an expiring date',
    },
    {
      id: 3,
      img: '',
      text: 'Amazon products at 10% off',
      date: '10/15/2022 with an expiring date',
    },
  ];
  const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, {backgroundColor}]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const WrapperComponent = () => (
    <View>
      <Modal isVisible={true}>
        <View style={{flex: 1}}>
          <Text>I am the modal content!</Text>
        </View>
      </Modal>
    </View>
  );

  return (
    <View style={styles.container}>
      <MyStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View style={styles.appBar}>
        <TouchableOpacity style={{width: '20%'}}>
          <FeatherIc name={'search'} size={20} />
        </TouchableOpacity>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{fontSize: 18, fontFamily: 'Dubai-Bold', fontWeight: '500'}}>
            Main
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
          onPress={toggleModal}
            style={{alignSelf: 'flex-start', paddingHorizontal: 5}}>
            <FontAwesomeIc name={'filter'} size={20} color={'black'} />
          </TouchableOpacity>
          <Modal isVisible={isModalVisible} animationOutTiming={500} >
           
        <View style={{ width:350,height:360,backgroundColor:'white',alignSelf:'center',borderRadius:16,paddingHorizontal:20,paddingVertical:25}}>
         
        <View style={{alignItems:'center'}}>
              <Text style={{fontSize:18,fontWeight:'700',fontFamily:'Dubai-Bold',color:'#000000',marginBottom:12}}>Place</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',marginBottom:22}}>
            <TouchableOpacity  style={{width:90,height:37,borderRadius:20,backgroundColor:'#D54078',alignItems:'center',justifyContent:'center',marginEnd:5}}>
  <Text style={{fontSize:18,fontWeight:'700',fontFamily:'Dubai-Bold',color:'white'}}>All </Text>
</TouchableOpacity>
<TouchableOpacity style={{width:90,height:37,borderRadius:20,backgroundColor:'#EEEEEE',alignItems:'center',justifyContent:'center',marginEnd:5}}>
<Image source={images.flag1} style={{width:25,height:25}} resizeMode={'contain'}/>
</TouchableOpacity>
<TouchableOpacity style={{width:90,height:37,borderRadius:20,backgroundColor:'#EEEEEE',alignItems:'center',justifyContent:'center',marginEnd:5}}>
<Image source={images.flag2} style={{width:25,height:25}} resizeMode={'contain'}/>
</TouchableOpacity>
            </View>
            <View style={{alignItems:'center'}}>
              <Text style={{fontSize:18,fontWeight:'700',fontFamily:'Dubai-Bold',color:'#000000',marginBottom:12}}>Type</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',marginBottom:22,flexWrap:'wrap',width:'100%',justifyContent:'center'}}>
            <TouchableOpacity  style={{width:90,height:37,borderRadius:20,backgroundColor:'#D54078',alignItems:'center',justifyContent:'center',marginEnd:5,marginBottom:10}}>
  <Text style={{fontSize:18,fontWeight:'700',fontFamily:'Dubai-Bold',color:'white'}}>All </Text>
</TouchableOpacity>
<TouchableOpacity style={{width:90,height:37,borderRadius:20,backgroundColor:'#EEEEEE',alignItems:'center',justifyContent:'center',marginEnd:5,flexDirection:'row'}}>
{/* <Image source={images.flag1} style={{width:25,height:25}} resizeMode={'contain'}/> */}
<Text style={{fontSize:18,fontWeight:'700',fontFamily:'Dubai-Bold',color:'#000000'}}>Gifts </Text>

</TouchableOpacity>
<TouchableOpacity style={{width:90,height:37,borderRadius:20,backgroundColor:'#EEEEEE',alignItems:'center',justifyContent:'center',marginEnd:5}}>
{/* <Image source={images.flag2} style={{width:25,height:25}} resizeMode={'contain'}/> */}
<Text style={{fontSize:18,fontWeight:'700',fontFamily:'Dubai-Bold',color:'#000000'}}>Children </Text>

</TouchableOpacity>

            </View>
<TouchableOpacity onPress={toggleModal} style={{width:140,height:40,borderRadius:20,backgroundColor:'#29B1E5',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
  <Text style={{fontSize:18,fontWeight:'700',fontFamily:'Dubai-Bold',color:'white'}}>Apply </Text>
</TouchableOpacity>
<TouchableOpacity onPress={toggleModal} style={{width:140,height:20,borderRadius:20,alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
  <Text style={{fontSize:18,fontWeight:'700',fontFamily:'Dubai-Bold',color:'#29B1E5'}}>Cancel</Text>
</TouchableOpacity>
          {/* <Button title="Hide modal" onPress={toggleModal} /> */}
        </View>
      </Modal>

          <TouchableOpacity
            style={{alignSelf: 'flex-end', paddingHorizontal: 5}}>
            <FeatherIc name={'more-vertical'} size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          height: 60,
          backgroundColor: '#FFFFFF',
          width: width,
          marginBottom: 18,
          shadowOffset: {height: 8},
          shadowOpacity: 0.2,
          shadowRadius: 5,
          elevation: 9,
          shadowColor: 'gray',
        }}>
        <FlatList
          style={{}}
          contentContainerStyle={{
            backgroundColor: '#FFFFFF',
            paddingStart: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          centerContent={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={categs}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                key={item.id}
                style={{
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: '#E8E8E8',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 80,
                  height: 40,
                  paddingHorizontal: 20,
                  backgroundColor: `${item.id == 0 ? '#D54078' : 'white'}`,
                  // backgroundColor: 'white',
                  borderRadius: 12,
                  marginEnd: 7,
                }}>
                <Text
                  style={{
                    color: `${item.id == 0 ? 'white' : '#000000'}`,
                    fontSize: 14,
                    fontWeight: '500',
                    fontFamily: 'Dubai-Bold',
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <ScrollView horizontal={false} style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('DetailScreen');
          }}
          activeOpacity={0.3}
          style={{
            width: '95%',

            // shadowOffset: {  height: 3 },
            // shadowOpacity:  0.2,
            // shadowRadius: 5,
            // elevation: 9,
            // shadowColor:'gray',
            shadowOffset: {width: 1, height: 3},
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 9,
            shadowColor: 'gray',

            marginBottom: 10,
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
              paddingStart: 8,
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
                <AntIc name="hearto" size={18} color={'#656565'} />
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
                }}>
                10/15/2022 with an expiring date
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('DetailScreen');
          }}
          activeOpacity={0.3}
          style={{
            width: '95%',

            shadowOffset: {width: 1, height: 3},
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 9,
            shadowColor: 'gray',
            marginBottom: 10,
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
              paddingStart: 8,
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
                <AntIc name="heart" size={18} color={'red'} />
              </TouchableOpacity>
              <Image
                source={images.bacg}
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
                }}>
                10/15/2022 with an expiring date
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('DetailScreen');
          }}
          activeOpacity={0.3}
          style={{
            width: '95%',

            shadowOffset: {width: 1, height: 3},
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 9,
            shadowColor: 'gray',
            marginBottom: 10,
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
              paddingStart: 8,
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
                <AntIc name="heart" size={18} color={'red'} />
              </TouchableOpacity>
              <Image
                source={images.bacg}
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
                }}>
                10/15/2022 with an expiring date
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
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
    justifyContent: 'space-between',
  },
  content: {
    backgroundColor: '#FFFFFF',
    //  backgroundColor:'white'
    // backgroundColor: '#f1f1f1',
  },
});
