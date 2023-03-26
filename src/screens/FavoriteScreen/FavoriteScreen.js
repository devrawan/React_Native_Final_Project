import React, { useEffect ,useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import FeatherIc from 'react-native-vector-icons/Feather';
import FontAwesomeIc from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import AntIc from 'react-native-vector-icons/AntDesign';
import MyStatusBar from '../../components/MyStatusBar';
import {images} from '../../constants/index';
import OfferCard from '../../components/OfferCard';
import {useTranslation} from 'react-i18next';
import axios from 'axios';

import {
  StyleSheet,
  Platform,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
} from 'react-native';
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const FavoriteScreen = () => {
  const {width, height} = useWindowDimensions();
  const navigation = useNavigation();
  const {t, i18n} = useTranslation();
 const [favPage,setFavPage]=useState(0);
 const [favItms, setFavItms] = useState([]);

//  useEffect(()=>{
//   console.log("Page Started");
//     setFavPage(1);
// }, []);

// useEffect(() => {
//   console.log('1PageC Chandgeddd ....');
//   if (favPage == 0){
//     console.log("1PageC Chandgedd  Ignored First Ti")
//     return;
//   }
//   var path = `https://xcobon.com/api/favourites?page=${favPage}`;

//   console.log("kareem path: " , path);

//   axios.get(
//     path,
//     {
//       headers: {
//         language: i18n.language == undefined ? "en" : i18n.language,
//       },
//     },
//   )
//   .then((data)=>{
//     console.log(" PageC Chandgedd Data");
//     console.log(data);
//     preapareCategroes(data);
    
//   }).catch((error)=>{
//     console.log(" PageC Chandgedd Error");
//     console.log(error);
//   });
// }, [favPage]);

// const preapareCategroes = (response) => {
//   var categors = response.data;


//   setNextCath(categors.data.pagination.has_next);
//   var isFirstTime = categors.length;

//   var ids = favItms.map(item => item.id);
//   var items2 = categors.data.content.filter(item => {
//     var isEqual = ids.includes(item.id);
//     return !isEqual;
//   });
//   setCategrs([...favItms, ...items2]);
//   setIsLoadCatg(false);

//   if (isFirstTime){
//     console.log("Fetch First Category Coupon ")
//     fetchfirstCatg();
//   }

  
// }





  const offers = [
    {
      id: 0,
      image_thumbnail:'https://www.w3schools.com/images/w3schools_green.jpg',
      name: `${t('Amazon products all product ')}`,
      start_at: `${t('10/15/2022')}`,
      value: 3,
   
    },
    {
      id: 6,
      image_thumbnail:'https://www.w3schools.com/images/w3schools_green.jpg',
      name: `${t('Amazon products all product')}`,
      start_at: `${t('10/15/2022')}`,
      value: null,
    
    },
    {
      id: 1,
      image_thumbnail:'https://www.w3schools.com/images/w3schools_green.jpg',
      name: `${t('Amazon products all product')}`,
      start_at: `${t('10/15/2022')}`,
      value: 0,
    
    },
    {
      id: 2,
      image_thumbnail:'https://www.w3schools.com/images/w3schools_green.jpg',
      name: `${t('Amazon products all product')}`,
      start_at: `${t('10/15/2022')}`,
      value: 40,
  
    },
   
    {
      id: 4,
      image_thumbnail:'https://www.w3schools.com/images/w3schools_green.jpg',
      name: `${t('Amazon products all product')}`,
      start_at: `${t('10/15/2022')}`,
      value: null,
    
    },
    {
      id: 3,
      image_thumbnail:'https://www.w3schools.com/images/w3schools_green.jpg',
      name: `${t('Amazon products all product')}`,
      start_at: `${t('10/15/2022')}`,
      value: 55,
      
    },
    {
      id: 5,
      image_thumbnail:'https://www.w3schools.com/images/w3schools_green.jpg',
      name: `${t('Amazon products all product')}`,
      start_at: `${t('10/15/2022')}`,
      value: null,
    
    },
  ];
  const navToDet = item => {
    console.log(item);
    navigation.navigate('Offer', {screen: 'DetScreen'});
  };

  return (
    <View style={styles.container}>
      <MyStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View
        style={[
          styles.appBar,
          {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
            height: APPBAR_HEIGHT,
            paddingHorizontal: 20,
            backgroundColor:'#FFFFFF'
          },
        ]}>

        <View style={styles.cont2}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 18,
              color: 'black',
              fontFamily: 'Dubai-Bold',
              fontWeight: '500',
            }}>
            {t('Favorite')}
          </Text>
        </View>
      </View>

      <View style={{flex: 1,backgroundColor:'#f7f7f7',}}>
        <FlatList
        contentContainerStyle={{paddingTop:15}}
        showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          horizontal={false}
          data={offers}
    
          keyExtractor={item => item.id}
          renderItem={({item}) => <OfferCard onpres = {()=>{

          }} item={item} />}
        />
      </View>
    </View>
  );
};

export default FavoriteScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  statusBar: {
    // height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: '#FFFFFF',
    // height: APPBAR_HEIGHT,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#FFFFFF',
  },
  cont2: {
    alignSelf: 'center',
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
