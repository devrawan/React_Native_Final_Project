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
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign'
const OnBording =()=>{
    const navigation = useNavigation()
    return(
    <View style={{marginTop:40}}>
        <Text>on bording page </Text>

       
        <TouchableOpacity onPress={()=>navigation.navigate('BottomTab')}><Text>go to home</Text></TouchableOpacity>
   {/* <Icon name='home'/> */}
    </View>
    )
}
export default OnBording;