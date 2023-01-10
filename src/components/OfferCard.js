import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View,
} from 'react-native';
import AntIc from 'react-native-vector-icons/AntDesign';
import {images} from '../constants/index';

const OfferCard = ({item,onpres}) => (
  <TouchableOpacity
  onPress={()=>onpres(item)}
    activeOpacity={0.3}
    style={styles.cardView}>
    <View style={styles.wrapperView}>
      <View style={styles.startView}>
        <TouchableOpacity style={styles.icView}>
          <AntIc name="hearto" size={18} color={'#656565'} />
        </TouchableOpacity>
        <Image source={images.STC} style={styles.imView} />
      </View>

     
     <View style={styles.endView}>
       {(item.off !=null && item.sar !=null) ?<View style={styles.wView}>
          <View style={styles.lView}>
            <Text style={{color: '#636363',fontSize: 12,fontWeight:'700',fontFamily:'Dubai-Bold'}}>{item.off}</Text>
          </View>
          <View style={styles.rView}>
            <Text style={{color: '#FFFFFF',fontSize: 12,fontWeight:'700',fontFamily:'Dubai-Bold'}}>
              {item.sar}
              </Text>
          </View>
        </View>:<></>}
        <Text style={{color: '#000000', fontSize: 16,fontWeight:'500',fontFamily:'Dubai-Bold'}}>
          {item.txt}
        </Text>
        <Text style={{fontSize: 12,fontWeight:'400',fontFamily:'Dubai-Regular', color: '#7A7A7A'}}>{item.dat}</Text>
      </View>
      
      
    </View>
  </TouchableOpacity>
);
export default OfferCard;

const styles = StyleSheet.create({
  cardView: {
    width: '95%',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 9,
    shadowColor: 'gray',
    backgroundColor: 'white',
    borderColor: '#ECECEC',
    borderRadius: 12,
    paddingStart: 5,
  
    marginBottom: 15,
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  wrapperView: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',

    width: '100%',
    height: 110,
  },
  startView: {
    width: 90,
                  height: 90,
    borderRadius: 15,
    borderColor: '#DCDCDC',
    borderWidth: 1,
    padding: 5,
  },
  icView: {
    alignSelf: 'flex-end',
    marginEnd: 3,
    height: '22%',
  },
  imView: {
    width: '100%',
    height: '70%',
    alignSelf: 'flex-start',
    resizeMode: 'stretch',
  },
  endView: {
    width: '70%',
    paddingStart: 8,
    height: '90%',
    justifyContent: 'center',
  },
  wView: {
    flexDirection: 'row',
    width: 140,
    height: 25,
    marginBottom: 7,
  },
  lView: {
    backgroundColor: '#ECECEC',
    width: '50%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rView: {
    backgroundColor: '#29B1E5',
    width: '50%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomEndRadius: 12,
    borderTopEndRadius: 12,
  },
});
