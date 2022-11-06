import React ,{useContext,useState}from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AppContext from '../../context/AppContext';
import Ic from 'react-native-vector-icons/Ionicons';
import Icc from 'react-native-vector-icons/Fontisto';
import IcShare from 'react-native-vector-icons/MaterialCommunityIcons';
var tmp =[];

const Details = props => {
  const {width, height} = useWindowDimensions();
  const navigation = useNavigation();
const[itemSave,setItemSave]=useState(false)
  const {userCollection, savArray, setCollections, setSaveArray} =
  useContext(AppContext);
  const {item} = props.route.params;
  return (
    <SafeAreaView style={[styles.cont, {width: width}]}>
      <View style={styles.headerView}>
        <Ic
          name="arrow-back"
          size={25}
          color={'#7C82A1'}
          onPress={() => navigation.navigate('HomeC')}
        />
        <View style={styles.iconsView}>
          <IcShare
            name="share-all-outline"
            size={30}
            style={{width: 30, marginEnd: 12}}
            color="#7C82A1"
          />
          <TouchableOpacity onPress={()=>{
            setItemSave((prev)=>!prev)
              //  tmp.push(item);
             setSaveArray([...savArray,item]);
          }
          }>
          <Icc name="favorite" size={22} style={{width: 18}} color={itemSave ? "#475AD7":'#7C82A1'} />
          </TouchableOpacity>
          
        </View>
      </View>

      <Image source={{uri: item.urlToImage}} style={styles.imgStyle} />

      <View style={styles.btnView}>
        <TouchableOpacity style={styles.btnStyle}>
          <Text style={{color: 'white'}}>{item.source.name}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.titleView}>
        <Text style={styles.titleStyle}>{item.title}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.scrolView}>
          <View style={styles.headerVieww}>
            <Image style={styles.autherImg} source={{uri: item.urlToImage}} />

            <View style={styles.rowView}>
              <View style={styles.rowView_1}>
                <Text>{item.auther == null ? 'John Doeie' : item.auther}</Text>
              </View>
              <View>
                <Text style={{color: '#7C82A1'}}>{item.source.name}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.txtStyle}>Results</Text>
          <Text style={styles.contentStyle}>
            {item.title} . {`\n \n`}
            {item.description}
            Leads in individual states may change from one party to another as
            all the votes are counted. Select a state for detailed results, and
            select the Senate, House or Governor tabs to view those races.
            {`\n\n`}For more detailed state results click on the States A-Z
            links at the bottom of this page. Results source: NEP/Edison via
            Reuters. Leads in individual states may change from one party to
            another as all the votes are counted. Select a state for detailed
            results, and select the Senate, House or Governor tabs to view those
            races.
            {`\n`}
            {item.content}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Details;
const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerView: {
    paddingVertical: 10,
    paddingEnd: 10,
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexDirection: 'row',
    width: '90%',
    //  backgroundColor:'pink'
  },
  iconsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgStyle: {
    marginTop: 10,
    width: 350,
    height: 199,
    alignSelf: 'center',
    borderRadius: 16,
  },
  btnView: {
    marginVertical: 8,
    paddingHorizontal: 5,
    marginTop: 20,
    marginHorizontal: 20,
  },
  btnStyle: {
    backgroundColor: '#475AD7',
    borderRadius: 16,
    paddingVertical: 11,
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
  },
  titleView: {
    width: '90%',
    alignSelf: 'center',
    paddingStart: 5,
    paddingEnd: 0,
  },
  titleStyle: {
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 28,
  },
  scrolView: {
    width: '90%',
    alignSelf: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
    paddingBottom: 50,
  },
  headerVieww: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: 0,
    paddingVertical: 10,
  },
  autherImg: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  rowView: {
    width: '80%',
    paddingHorizontal: 10,
  },
  rowView_1: {
    height: 25,
    justifyContent: 'center',
  },
  txtStyle: {
    fontSize: 16,
    marginTop: 13,
  },
  contentStyle: {
    color: '#666C8E',
    fontSize: 16,
    lineHeight: 24,
    paddingTop: 6,
  },
});
