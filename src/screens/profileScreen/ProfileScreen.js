import React from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  Image,
} from 'react-native';
import Ic from 'react-native-vector-icons/MaterialIcons';
import SettingBox from '../../components/SettingBox/SettingBox';
import IconLoginOut from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ProfileScreen = ({item}) => {
  const {width, height} = useWindowDimensions();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[styles.cont, {width: width}]}>
      <View style={styles.titleView}>
        <Text style={styles.titleStyle}>Profile</Text>
      </View>
      <View style={styles.headerVieww}>
        <Image
          style={styles.autherImg}
          source={{
            uri: 'https://image.shutterstock.com/image-photo/young-handsome-man-beard-wearing-260nw-1768126784.jpg',
          }}
        />
        <View style={styles.rowView}>
          <View style={styles.rowView_1}>
            <Text style={{fontSize: 16}}>Eren Turkmen</Text>
          </View>
          <View>
            <Text style={{color: '#7C82A1', fontSize: 14}}>
              ertuken@gmail.com
            </Text>
          </View>
        </View>
      </View>

      <SettingBox
        name="Notifications"
        icon={<Ic name="keyboard-arrow-right" size={20} color={'#666C8E'} />}
        goTo=""
      />
      <SettingBox
        name="Language"
        icon={<Ic name="keyboard-arrow-right" size={20} color={'#666C8E'} />}
        goTo="LanguageScreen"
      />
      <SettingBox
        name="Privacy"
        icon={<Ic name="keyboard-arrow-right" size={20} color={'#666C8E'} />}
      />
      <SettingBox
        name="Terms & Conditions"
        icon={<Ic name="keyboard-arrow-right" size={20} color={'#666C8E'} />}
        goTo="Terms"
      />
      <SettingBox
        name="Sign Out"
        icon={<IconLoginOut name="log-out" size={20} color={'#666C8E'} />}
        type="logout"
      />
    </SafeAreaView>
  );
};
export default ProfileScreen;
const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  titleView: {
    width: '100%',
    paddingHorizontal: 22,
    paddingTop: 15,
    paddingBottom: 8,
    marginTop: 15,
    // backgroundColor:'pink'
  },
  titleStyle: {
    fontSize: 24,
  },
  headerVieww: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: 17,
    paddingVertical: 10,
    marginBottom: 30,
    // backgroundColor:'gray'
  },
  autherImg: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
  },
  rowView: {
    justifyContent: 'center',
    width: '80%',
    paddingHorizontal: 15,
  },
  rowView_1: {
    height: 25,
    justifyContent: 'center',
  },
});
