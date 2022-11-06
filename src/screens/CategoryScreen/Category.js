import React, {useState, useContext} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AppContext from '../../context/AppContext';
const Category = () => {
  const {userCollection, setCollections} = useContext(AppContext);
  const {height, width} = useWindowDimensions();
  const navigation = useNavigation();
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.boxStyle,
          {backgroundColor: item.isFav ? '#475AD7' : '#F3F4F6'},
        ]}
        onPress={() => {
          let tempArr = [...userCollection];
          let index = tempArr.findIndex(el => el.id == item.id);
          tempArr[index].isFav = !tempArr[index].isFav;
          setCollections(tempArr);
        }}>
        <Text
          style={[styles.txtBoxStyle, {color: item.isFav ? 'white' : 'black'}]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <SafeAreaView style={[styles.cont, {width: width}]}>
        <View style={styles.titleView}>
          <Text style={styles.txtStyle}>Select your favorite topics</Text>
        </View>
        <View style={styles.desView}>
          <Text style={styles.desStyle}>
            Select some of your favorite topics to let us suggest better news
            for you.
          </Text>
        </View>
        <View style={styles.flatStyle}>
          <FlatList
            centerContent={true}
            data={userCollection}
            renderItem={renderItem}
            numColumns={2}
            keyExtractor={item => item.id}
          />
        </View>
        <TouchableOpacity
          style={styles.btnBox}
          onPress={() => {
            navigation.navigate('Homee');
          }}>
          <Text style={styles.txtBox}>Next</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};
export default Category;
const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleView: {
    marginTop: 10,
    paddingHorizontal: 23,
    paddingBottom: 8,
    paddingTop: 15,
  },
  txtStyle: {
    fontSize: 24,
  },
  desView: {
    paddingHorizontal: 23,
    paddingTop: 5,
    paddingBottom: 10,
  },
  desStyle: {
    fontSize: 16,
    color: '#7C82A1',
  },
  boxStyle: {
    width: 150,
    height: 65,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    marginBottom: 15,
  },
  txtBoxStyle: {
    fontSize: 16,
    color: 'black',
    // color:'#666C8E'
  },
  flatStyle: {
    paddingVertical: 10,
    width: '100%',
    paddingStart: 15,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnBox: {
    width: 338,
    height: 56,
    backgroundColor: '#475AD7',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  txtBox: {
    fontSize: 16,
    color: 'white',
  },
});




// if(type==item.name){
//setArray(oldArray => [...oldArray,newValue] );
//}else{
//setArray(newValue);
//}
//
//
//