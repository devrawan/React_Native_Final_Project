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
import {useTranslation} from 'react-i18next';

const OfferCard = ({item,handleLike,onpres}) => {
  const {t, i18n} = useTranslation();

  return(

  <TouchableOpacity
  key={item.id}
  onPress={()=>onpres(item)}
    activeOpacity={0.3}
    style={styles.cardView}>
    <View style={styles.wrapperView}>
      <View style={styles.startView}>
      {/* {item.is_favourite == true ?<TouchableOpacity
          onPress={()=>handleLike(item)}
          style={{alignSelf: 'flex-end',width:20,}}>
          <AntIc name="heart" size={18} color={'red'} />
        </TouchableOpacity> :  <TouchableOpacity
       onPress={()=>handleLike(item)}
          style={{alignSelf: 'flex-end'}}>
          <AntIc name="hearto" size={18} color={'#656565'} />
        </TouchableOpacity>
} */}
        <Image
           source={{uri:item.image_thumbnail}}
        // source={item.image_thumbnail}
         style={styles.imView} />
      </View>

     
     <View style={styles.endView}>
      
       {item.value !=null ? 
        <View style={styles.wView}>
          <View style={styles.lView}>
            <Text style={{color: '#636363',fontSize: 12,fontWeight:'700',fontFamily:'Dubai-Bold'}}>{item.value}%{t('Off')}</Text>
          </View>
          <View style={styles.rView}>
            <Text style={{color: '#FFFFFF',fontSize: 12,fontWeight:'700',fontFamily:'Dubai-Bold'}}>
              {item.value} {t('R.S')}
              </Text>
          </View>
        </View>
        :<></> } 
      




        <Text style={{color: '#000000', fontSize: 16,fontWeight:'500',fontFamily:'Dubai-Bold',textAlign:'left'}}>
          {item.name}
        </Text>
        <Text style={{fontSize: 12,fontWeight:'400',fontFamily:'Dubai-Regular', color: '#7A7A7A',textAlign:'left'}}> {t('with an expiring date')} {item.start_at}</Text>
      </View>
      
      
  
    </View>



  </TouchableOpacity>
)}
export default OfferCard;

const styles = StyleSheet.create({
  cardView: {

    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 9,
    shadowColor: 'gray',
    backgroundColor: 'white',
    borderColor: '#ECECEC',
    borderRadius: 12,
    paddingStart: 5,

    marginBottom: 12,
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    // borderBottomColor:'pink'
    marginVertical:4,



    paddingVertical:3,
    // height:'80%'
  },
  wrapperView: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
// backgroundColor:'red',
    width: '100%',
    paddingVertical:5
    // height: 110,
  },
  startView: {
    width: 90,
    //  height: 90,
    borderRadius: 15,
    borderColor: '#DCDCDC',
    borderWidth: 1,
    padding: 5,
  },
  icView: {
    alignSelf: 'flex-end',
    marginEnd: 3
  },
  imView: {
    width: '100%',
    height: 70,
    alignSelf: 'flex-start',
    resizeMode: 'center',
    
  },
  endView: {
    width: '70%',
    paddingStart: 8,
    // height: '90%',
    paddingVertical:10,
    justifyContent: 'center',
  },
  wView: {
    flexDirection: 'row',
    width: 140,
    height: 25,
    // marginBottom: 7,
  },
  lView: {
    backgroundColor: '#ECECEC',
    width: '50%',
    // height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rView: {
    backgroundColor: '#29B1E5',
    width: '50%',
    // height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomEndRadius: 12,
    borderTopEndRadius: 12,
  },
});
