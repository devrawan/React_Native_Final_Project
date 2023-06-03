import React, {useState, useEffect} from 'react';
import {images} from '../../constants/index';
import {NavigationContainer} from '@react-navigation/native';
import FeatherIc from 'react-native-vector-icons/Feather';
import FontAwesomeIc from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import AntIc from 'react-native-vector-icons/AntDesign';
import {useTranslation} from 'react-i18next';
import Modal from 'react-native-modal';
import Snackbar from 'react-native-snackbar';
import { deviceId } from '../../../App';

import axios from 'axios';
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
  ActivityIndicator,
} from 'react-native';
import HomCardE from '../../components/HomCardE';
import HomCardA from '../../components/HomCardA';
import WrapperComponent from './ModalFilter';
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const cancelTokenSource = axios.CancelToken.source();
var cancelTokenSource2 = axios.CancelToken.source();


const HomeScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [categrs, setCategrs] = useState([]);
  const [pageC, setPageC] = useState(0);
  const [nextCatg, setNextCath] = useState();
  const [currentIdCatg, setCurIdCatg] = useState(null);
  const [coupons, setCoups] = useState([]);
  const [pageCop, setPageCop] = useState(1);
  const [nextCop, setNextCop] = useState();
  const {width, height} = useWindowDimensions();
  const [isLoad, setIsLoad] = useState(true);
  const [isLoadCatg, setIsLoadCatg] = useState(true);
  // const [pClick, setPClick] = useState(0);
  // const[tClick,setTClick]= useState(0);
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
      console.log(error);
      if (error.response != undefined && error.response.status != undefined && error.response.status == 403){
        setNextCop(error.response.data.data.pagination.has_next);
        setCoups(error.response.data.data.content);
        setIsLoad(false);
        return;
      }
  
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
    // if (isFirstTime){
    //   console.log("Fetch First Category Coupon 1")
    // }else{
    //   console.log("Fetch First Category Coupon  2")
    //   fetchfirstCatg();

    // }
  }

  useEffect(()=>{
    const loadCps = async () => {
    var itms = await getCoupons();
    console.log("loadCps ");
    console.log(itms);
     var ids = coupons.map((item) => item.id);
        var items2 = itms.filter ( (item) => {
          var isEqual = ids.includes(item.id);
          return !isEqual;
        } );
        setCoups([...coupons, ...items2]);
        setIsLoad(false)
        return "";
      };

      if (currentIdCatg != undefined  && currentIdCatg != null ){
        loadCps()
    }

      
  },[pageCop])

  useEffect(  () =>  {

    var path =  `https://xcobon.com/api/coupons?page=${pageCop}&category_id=${currentIdCatg}`;
    try{
    cancelTokenSource2.cancel();

    console.log("getCoupons cancel success ");
    }catch (err){
      console.log("getCoupons cancel error ");
    }

    cancelTokenSource2 = axios.CancelToken.source();

   console.log(path)
    if (currentIdCatg == null){
      console.log("Kareem  getCoupons First Time Ignore ");
      return;
    }
        axios.get(
          path,
          {
            cancelToken: cancelTokenSource2.token,
            headers: {
              // deviceKey: '23',
              deviceKey:deviceId,
              language: i18n.language == undefined ? "en" : i18n.language,
            },
          },
        ).then( async (response)=>  {
          setNextCop(response.data.data.pagination.has_next);
          setCoups(response.data.data.content);
          setIsLoad(false);
        }).catch((response) => { 
          console.log("status error: " );
          console.log(response);

          if (response.response != undefined &&  response.response.status != undefined &&  response.response.status == 403){
            console.log(response.response);
            setNextCop(response.response.data.data.pagination.has_next);
            setCoups(response.response.data.data.content);
            setIsLoad(false);
            return;
          }
            console.log("getCoupons Error " + response.response.status);
            console.log(response);
            console.log(response.response);
            console.log(response.response.data);

            setIsLoad(false);
        });
  
  }, [currentIdCatg]);


const handlPlc = (idd)=>{
setPClick(idd)
}
const handleType = (idd)=>{
  setTClick(idd)
}


  const fetchfirstCatg = (categrs2) => {
    if (categrs2 != undefined && categrs2.length > 0) {
      setCurIdCatg(categrs2[0].id);
    } else {
      console.log('no categrs');
    }
  };
 
 

  const getCoupons = async () => {

      var path = `https://xcobon.com/api/coupons?page=${pageCop}&category_id=${currentIdCatg}`;
      console.log('getCoupons path: ' , path);
      try{
        var response = await axios.get(
          path,
          {
            cancelToken: cancelTokenSource.token,
            headers: {
         // deviceKey: '23',
         deviceKey: deviceId,
              language: i18n.language == undefined ? "en" : i18n.language,
            },
          },
        );
        setNextCop(response.data.data.pagination.has_next);
        return response.data.data.content;
      }catch(err) {
          console.log("status error: 2" );
          if (err.response.status == 403){
            if (response.data.data != undefined){
              setNextCop(response.data.data.pagination.has_next);
              return response.data.data.content;
            }
          }
          return [];
      }
  };

  const navToDet = item => {
    console.log(item)
    navigation.navigate('DetailScreen',{itm:item});
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
        // 'deviceKey': '23',
      
         'deviceKey':deviceId,
                'Content-Type' : 'multipart/form-data',
                'accept' : '*/*',
                'language': i18n.language == undefined ? "en" : i18n.language,}
            
    })
    .then(response => {
      const result =  response.data.data.coupons[0].is_favourite;

      const lst = [...coupons];
      lst.forEach((item)=>{
        if (item.id == copon.id){
          item.is_favourite = result;
        }

      });
      setCoups(lst);
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




  const categs = [
    {
      id: 0,
      name: `${t('All')}`,
      img: '',
    },
  
    
  ];
  const data = [
    {
      id: 0,
      image_thumbnail: '',
      name: `${t('Amazon products at 10% off')}`,
      coupon: `${t('10/15/2022 with an expiring date')}`,
    }
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
  // const WrapperComponent = () => (
  //   <WrapperComponent>

  //   </WrapperComponent>
  // );

  return (
    <>
      <View style={styles.container}>
        <MyStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
       
 <View style={styles.appBar}>
        <TouchableOpacity
      style={{width:'20%',height:'100%',alignSelf:'flex-start',justifyContent:'center',alignItems:'center'}}
          onPress={() => {
     
          }}>
           <FeatherIc name={'search'}  color='black'  size={20} />
        </TouchableOpacity>
        <View style={{width:'80%',height:'100%',justifyContent: 'center', alignItems: 'center',alignSelf:'center'}}>
          <Text
            style={{fontSize: 18, 
              color: 'black',
            fontFamily: 'Dubai-Bold',
             fontWeight: '500'}}>
            {t('Main')}
          </Text>
        </View>
        <TouchableOpacity
        onPress={toggleModal} 
      style={{width:'20%',height:'100%',alignSelf:'flex-start',justifyContent:'center',alignItems:'center'}}
         >
         <FontAwesomeIc name={'filter'} size={20} color={'black'} />
        </TouchableOpacity>
      </View>

{isModalVisible ?  
     <WrapperComponent  
      isVisible={isModalVisible} 
      handleFilter = { (place, ds)=>{
        console.log("Home Screen " ,place, ds);
        toggleModal()
      }}  
      toggleModal = {toggleModal} 
      />:<></> }




        <View
          style={{
            height: 60,
            backgroundColor: '#ffffff',
            width: width,
            marginBottom: 6,
           
         }}>

            {isLoadCatg ?  <ActivityIndicator/>:
            
            <FlatList
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
                  () => {
                    if (currentIdCatg !== item.id){
                      setCoups([])
                      setIsLoad(true);  
                      setCurIdCatg(item.id)
                    }

                  }
                  
                  }
               
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
{i18n.language === 'en'  ?<View style={{flex: 1 ,backgroundColor:'#f7f7f7'}}>
            {coupons == undefined || coupons.length == 0 ? (
              <Text
                style={{
                  color: '#D54078',
                  alignSelf: 'center',
                  fontSize: 18,
                  fontWeight: '500',
                  fontFamily: 'Dubai-Bold',
                  // marginTop:4
                }}>
              
            {t('No available coupons for this category')}
              </Text>
            ) : (
              <FlatList
                horizontal={false}
                contentContainerStyle={{paddingTop:15}}
                data={coupons}
                 onEndReached={() => {
                  if(nextCop==true){
                    setPageCop(pageCop + 1)

                  }

                }}
                onEndReachedThreshold={0.5}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <HomCardE onpres={navToDet} item={item} key={item.id}  handleLike={()=>handLike(item)}/>
                )}
              />
            )}
          </View> :
          <View style={{flex: 1}}>
          {coupons == undefined || coupons.length == 0 ? (
            <Text
              style={{
                color: '#D54078',
                alignSelf: 'center',
                fontSize: 18,
                fontWeight: '500',
                fontFamily: 'Dubai-Bold',
              }}>
            
          {t('No available coupons for this category')}
            </Text>
          ) : (
            <FlatList
              horizontal={false}
              data={coupons}
               onEndReached={() => {
                if(nextCop==true){
                  setPageCop(pageCop + 1)

                }

              }}
              onEndReachedThreshold={0.5}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <HomCardA onpres={navToDet} item={item} key={item.id}  handleLike={()=>handLike(item)}/>
              )}
            />
          )}
        </View> }

</>

         




        )}
      </View>
    </>
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
    width:'100%',
    backgroundColor: '#FFFFFF',
    height: APPBAR_HEIGHT,
    paddingHorizontal: 20,

    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
   
    marginBottom: 4,
  },
  content: {
    backgroundColor: '#FFFFFF',
  },
  // modal styles
  parView: {
    width: 350,
    height: 360,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  fView: {
    alignItems: 'center',
  },
  placText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Dubai-Bold',
    color: '#000000',
    marginBottom: 12,
  },
  wrpView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },
  touchTxt: {
    width: 90,
    height: 37,
    borderRadius: 20,
    backgroundColor: '#D54078',
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: 5,
  },
  touchTxtStyle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Dubai-Bold',
    color: 'white',
  },
  touchImg: {
    width: 90,
    height: 37,
    borderRadius: 20,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: 5,
  },
  touchImg2: {
    width: 90,
    height: 37,
    borderRadius: 20,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: 5,
  },
  typeTxt: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Dubai-Bold',
    color: '#000000',
    marginBottom: 12,
  },
  itmsView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'center',
  },
  alView: {
    width: 90,
    height: 37,
    borderRadius: 20,
    backgroundColor: '#D54078',
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: 5,
    marginBottom: 10,
  },
  it1View: {
    width: 90,
    height: 37,
    borderRadius: 20,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: 5,
    flexDirection: 'row',
  },
  it2View: {
    width: 90,
    height: 37,
    borderRadius: 20,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: 5,
  },
  bTxt1: {
    width: 140,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#29B1E5',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  bTxt2: {
    width: 140,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  // catgView: {
  //   height: 60,
  //   backgroundColor: '#FFFFFF',
  //   width: width,
  //   marginBottom: 18,

  //   shadowRadius: 5,
  //   elevation: 9,

  // },
  flatctg: {
    // paddingTop:5,
    backgroundColor: '#FFF',
    paddingStart: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    height: '100%'
  },
});
