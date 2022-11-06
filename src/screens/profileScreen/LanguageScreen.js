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
} from 'react-native';
import Ic from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import SettingBox from '../../components/SettingBox/SettingBox';
import CheckIcon from 'react-native-vector-icons/AntDesign';
const category = [
  {id: '0', name: 'General'},
  {id: '1', name: 'Entertainment'},
  {id: '2', name: 'Business'},
  {id: '3', name: 'Health'},
  {id: '4', name: 'Science'},
  {id: '5', name: 'Sports'},
  {id: '6', name: 'Technology'},
  {id: '7', name: 'Technology'},
];
const LanguageScreen = () => {
  const {width, height} = useWindowDimensions();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1, width: width, backgroundColor: 'white'}}>
      <View
        style={{
          marginBottom: 40,
          width: '92%',
          alignSelf: 'center',
          flexDirection: 'row',
          marginTop: 15,
          justifyContent: 'center',
        }}>
        <Ic
          style={{alignSelf: 'center'}}
          name="arrow-back"
          size={25}
          color={'#7C82A1'}
          onPress={() => navigation.navigate('MainProf')}
        />
        <View style={{alignSelf: 'center', alignItems: 'center', width: '90%'}}>
          <Text style={{fontSize: 24}}>Language</Text>
        </View>
      </View>

      <SettingBox name="English" color={'#F3F4F6'} txt={'#666C8E'} />
      <SettingBox
        name="Turkish"
        color={'#475AD7'}
        txt={'#FFFFFF'}
        icon={<CheckIcon name="check" size={20} color={'white'} />}
      />
      <SettingBox name="German" color={'#F3F4F6'} txt={'#666C8E'} />
      <SettingBox name="Spanish" color={'#F3F4F6'} txt={'#666C8E'} />
    </SafeAreaView>
  );
};

export default LanguageScreen;
