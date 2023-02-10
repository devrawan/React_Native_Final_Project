import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import FeatherIc from 'react-native-vector-icons/Feather';
import FontAwesomeIc from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import AntIc from 'react-native-vector-icons/AntDesign';
import MyStatusBar from '../../components/MyStatusBar';
import {images} from '../../constants/index';
import {getDeviceId} from 'react-native-device-info';
import {useTranslation} from 'react-i18next';
import OfferCard from '../../components/OfferCard';
import axios from 'axios';

import {
  StyleSheet,
  AppRegistry,
  Platform,
  SafeAreaView,
  ActivityIndicator,
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
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const OfferScreen = () => {
const [isModalVisible, setModalVisible] = useState(false);
const [categrs, setCategrs] = useState([]);
const [pageC, setPageC] = useState(0);
const [nextCatg, setNextCath] = useState();
const [currentIdCatg, setCurIdCatg] = useState(null);
// const [coupons, setCoups] = useState([]);
const [offers, setOffers] = useState([]);
const [pageCop, setPageCop] = useState(1);
const [nextCop, setNextCop] = useState();
const {width, height} = useWindowDimensions();
const [isLoad, setIsLoad] = useState(true);
const [isLoadCatg, setIsLoadCatg] = useState(true);
// true
const navigation = useNavigation();
const {t, i18n} = useTranslation();

useEffect(()=>{
  console.log("Page Started");
    setPageC(1);

    return () => {
      console.log("Kareem By !!!");
      // cancelTokenSource.cancel();

      
     }
  }, []);

useEffect(() => {
  console.log('1PageC Chandgedd ....');
  if (pageC == 0){
    console.log("1PageC Chandgedd  Ignored First Ti")
    return;
  }
  var path = `https://xcobon.com/api/categories?page=${pageC}`;
  console.log("kareem path: " , path);
  axios.get(
    path,
    {

      headers: {
        language: i18n.language == undefined ? "en" : i18n.language,
      },
    },
  )
  .then((data)=>{
    console.log("Kareem PageC Chandgedd Data");
    // console.log(data);
    preapareCategroes(data);
    
  }).catch((error)=>{
    console.log("Kareem PageC Chandgedd Error");

    if (error.response.status == 403){
      setNextCop(error.response.data.data.pagination.has_next);
      setOffers(error.response.data.data.content);
      setIsLoad(false);
      return;
    }
    console.log(error);
    console.log(error);
  });
}, [pageC]);

const preapareCategroes = (response) => {
  var isFirstTime = categors == undefined || categors.length == 0;
  var categors = response.data;


  setNextCath(categors.data.pagination.has_next);
 

  var ids = categrs.map(item => item.id);
  var items2 = categors.data.content.filter(item => {
    var isEqual = ids.includes(item.id);
    return !isEqual;
  });
  var reuslt = [...categrs, ...items2];
  setCategrs(reuslt);
  setIsLoadCatg(false);

  fetchfirstCatg(reuslt);
}



useEffect(()=>{
  const loadCps = async () => {
  var itms = await getCoupons();
  console.log("loadCps ");
  console.log(itms);
   var ids = offers.map((item) => item.id);
      var items2 = itms.filter ( (item) => {
        var isEqual = ids.includes(item.id);
        return !isEqual;
      } );
      setOffers([...offers, ...items2]);
      setIsLoad(false)
      return "";
    };
    loadCps()
    
},[pageCop])

useEffect(  () =>  {

  try{
  cancelTokenSource2.cancel();
  console.log("getOffers cancel success ");
  }catch (err){
    console.log("getOffers cancel error ");
  }

  cancelTokenSource2 = axios.CancelToken.source();
//  console.log(`https://xcobon.com/api/coupons?page=${pageCop}&category_id=${currentIdCatg}`)
  if (currentIdCatg == null){
    console.log("Kareem  getOffers First Time Ignore ");
    return;
  }
      axios.get(
        // `https://xcobon.com/api/coupons?page=${pageCop}&category_id=${currentIdCatg}`,
        `https://xcobon.com/api/offers?page=${pageCop}&category_id=${currentIdCatg}`,
        {
          cancelToken: cancelTokenSource2.token,
          headers: {
            language: i18n.language == undefined ? "en" : i18n.language,
          },
        },
      ).then((response)=>{
        setNextCop(response.data.data.pagination.has_next);
        setOffers(response.data.data.content);
        setIsLoad(false);
      }).catch((response) => { 
        console.log("getOffers Error " + response.response.status);

        if (response.response.status == 403){
          setNextCop(response.response.data.data.pagination.has_next);
          setOffers(response.response.data.data.content);
          setIsLoad(false);
          return;
        }
          console.log(response);
          console.log(response.response);
          console.log(response.response.data);

          setIsLoad(false);
      });
}, [currentIdCatg]);


const fetchfirstCatg = (categrs2) => {
  if (categrs2 != undefined && categrs2.length > 0) {
    setCurIdCatg(categrs2[0].id);
  } else {
    console.log('no categrs');
  }
};



const getCoupons = async () => {
    try{
      var response = await axios.get(
       // `https://xcobon.com/api/coupons?page=${pageCop}&category_id=${currentIdCatg}`,
       `https://xcobon.com/api/offers?page=${pageCop}&category_id=${currentIdCatg}`,        {
          cancelToken: cancelTokenSource.token,
          headers: {
           
            language: i18n.language == undefined ? "en" : i18n.language,
          },
        },
      );
      setNextCop(response.data.data.pagination.has_next);
      return response.data.data.content;
    }catch(err) {
      console.log("Kareem Error " , err)

        if (err.response.status == 403){
          setNextCop(response.data.data.pagination.has_next);
          return response.data.data.content;
        }
        console.log("Kareem Error " , err.response.status)

        console.log(err);
        console.log(err.response);
        console.log(err.response.data);
        
      }
};

const navToDet = item => {
  console.log(item);
  navigation.navigate('DetScreen',{itm:item});
};


const handLike =(copon)=>{

console.log("fav 222", copon.id);
console.log(copon);
try{

  const path = `https://xcobon.com/api/favourites?coupon_id=${copon.id}`;
  console.log(path);
  const formData = new FormData();
  axios({
    method: "post",
    url: `https://xcobon.com/api/favourites?coupon_id=${copon.id}`,
    data: formData,
    
    headers: {
       // deviceKey: '23',
       deviceKey:getDeviceId(),
              'Content-Type' : 'multipart/form-data',
              'accept' : '*/*',
              'language': i18n.language == undefined ? "en" : i18n.language,}
          
  })
  .then(response => {
    const result =  response.data.data.offers[0].is_favourite;

    const lst = [...offers];
    lst.forEach((item)=>{
      if (item.id == copon.id){
        item.is_favourite = result;
      }

    });
    setOffers(lst);
    console.log(response);
  })
  .catch(response => {
    console.log("Fav Error ")
    console.log(response);
  })


}catch(err) {
    console.log(" Fav Error")
    console.log(err);
  }
  
}


const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);


return (
  <>
    <View style={styles.container}>
      <MyStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
     
<View style={styles.appBar}>
    
      <View style={{width:'100%',height:'100%',justifyContent: 'center', alignItems: 'center',alignSelf:'center'}}>
        <Text
          style={{fontSize: 18, fontFamily: 'Dubai-Bold', fontWeight: '500',color:'black'}}>
          {t('Offer')}
        </Text>
      </View>
     
    </View>
      <View
        style={{
          height: 60,
          backgroundColor: '#FFFFFF',
          width: width,
          marginBottom: 6,
          // shadowOffset: {height: 8},
          // shadowOpacity: 0.2,
          // shadowRadius: 5,
          // elevation: 9,
          // shadowColor: 'gray',
        }}>

          {isLoadCatg ?  <ActivityIndicator/>:<FlatList
          contentContainerStyle={styles.flatctg}
          centerContent={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={categrs}
          onEndReached={() => {
            if (nextCatg == true) {
              console.log('donnne 77');
              setPageC(pageC + 1);
            } else {
              console.log('donnne');
            }
          }}
          onEndReachedThreshold={0.5}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={
                  () => setCurIdCatg(item.id)
                  // await viewCopns();
                }
                // onPress={()=>viewCopns(item.id)}
                key={item.id}
                style={{
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: '#E8E8E8',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 80,
                  height: 40,
                  paddingHorizontal: 7,
                  backgroundColor: `${
                    item.id == currentIdCatg ? '#D54078' : 'white'
                  }`,
                  borderRadius: 12,
                  marginEnd: 7,
                }}>
                <Image
                  source={{uri: `${item.image_thumbnail}`}}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    marginEnd: 6,
                    backgroundColor: '#ECECEC',
                  }}
                  resizeMode={'contain'}
                />
                <Text
                  style={{
                    color: `${
                      item.id == currentIdCatg ? 'white' : '#000000'
                    }`,
                    fontSize: 14,
                    fontWeight: '500',
                    fontFamily: 'Dubai-Bold',
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />}
        







      </View>

      {isLoad ? (
        <ActivityIndicator color={'#D54078'} />
      ) : (
<>

<View style={{flex: 1,backgroundColor:'#f7f7f7'}}>
          {offers == undefined || offers.length == 0 ? (
          <Text  style={{
              color: '#D54078',
              alignSelf: 'center',
              fontSize: 18,
              fontWeight: '500',
              fontFamily: 'Dubai-Bold',
              // marginTop:4
              }}
              >
            
          {t('No available offer for this category')}
            </Text>
          ) : (
            <FlatList
            contentContainerStyle={{paddingTop:15}}
            showsVerticalScrollIndicator={false}
              horizontal={false}
              data={offers}
               onEndReached={() => {
                if(nextCop==true){
                  setPageCop(pageCop + 1)

                }

              }}
              onEndReachedThreshold={0.5}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <OfferCard onpres={navToDet} item={item} key={item.id}  handleLike={()=>handLike(item)} />
              )}
            />
          )}
        </View> 

</>

       




      )}
    </View>
  </>
);













 };











export default OfferScreen;
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
  },
  content: {
    backgroundColor: '#FFFFFF',
  },

  flatctg: {
    backgroundColor: '#fff',
    paddingStart: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    height: '100%'
  },
});
