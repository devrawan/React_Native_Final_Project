import React, {useState, useEffect, useContext} from 'react';
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  Image,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import IcAnt from 'react-native-vector-icons/AntDesign';
import {TextInput} from 'react-native-gesture-handler';
import IcFound from 'react-native-vector-icons/Foundation';
import Ic from 'react-native-vector-icons/Fontisto';
import SmallCard from '../../components/SmallCard/SmallCard';
import axios from 'axios';
import AppContext from '../../context/AppContext';
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
var tmp = [];
const Homes = () => {
  const navigation = useNavigation();
  const {width, height} = useWindowDimensions();
  const [id, setId] = useState('0');
  const [type, setType] = useState('General');
  const [articles, setArticles] = useState([]);
  const [CatArtical, setCatArtical] = useState([]);
  const [handleSave, setHandleSave] = useState(false);
  const [num, setNum] = useState(1);
  const {userCollection, savArray, setCollections, setSaveArray} =
    useContext(AppContext);

  useEffect(() => {
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?category=general&country=us&apiKey=6724769e8ed144c68f489955a55ddb0d`,
      )
      .then(function (response) {
        setArticles(response.data.articles);
        setCatArtical(response.data.articles);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const fetchData = (categoryName, country, pageSize) => {
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?category=${categoryName}&country=${country}&pageSize=${pageSize}&apiKey=6724769e8ed144c68f489955a55ddb0d`,
      )
      .then(function (response) {
        // console.log(response.data.articles);
        setCatArtical(response.data.articles);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        key={Math.random()}
        onPress={() => {
          setId(item.id);
          setType(item.name);
          fetchData(item.name, 'us', '10');
        }}
        style={[
          styles.boxStyle,
          {backgroundColor: item.id == id ? '#475AD7' : '#F3F4F6'},
        ]}>
        <Text
          style={[
            styles.txtBoxStyle,
            {color: item.id == id ? 'white' : '#7C82A1', lineHeight: 28},
          ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderItem2 = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          //  tmp.push(item);
          //  setSaveArray(tmp);
          navigation.navigate('Details', {item: item});
        }}
        activeOpacity={0.6}>
        <ImageBackground
          source={{uri: item.urlToImage}}
          style={styles.itemBack}
          imageStyle={styles.renderItem2_Img}>
          <TouchableOpacity style={styles.endIcon}>
            {/* <Ic name="bookmark" size={25} color={handleSave ? '#475AD7' :'#475AD7'}></Ic> */}
          </TouchableOpacity>

          <View>
            <View style={styles.contentFirstRow}>
              <Text style={styles.txtFirstRow}>
                {item.author == null
                  ? 'Zachary B. Wolf'
                  : `${item.author}`.substring(0, 20)}
              </Text>
            </View>

            <View style={styles.contentSecondRow}>
              <Text style={styles.txtSRow}>
                {item.title == null
                  ? 'Pope Francis thrills small Gulf Catholic community with big Mass'
                  : `${item.title}`.substring(0, 60)}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  const HeaderView=()=>{
    return(
      <>
    
      <View style={[styles.flatView, {width: width}]}>
      <FlatList
        data={category}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
      />
    </View>

    <View style={styles.flatView2}>
      <FlatList
        data={CatArtical}
        renderItem={renderItem2}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        // onEndReached={onEnd}
      />
    </View>
    <View style={styles.footerTitle}>
      <Text style={{fontSize: 20}}>Recommended for you</Text>
      <Text>See All</Text>
    </View>
    </>
    )
  }
  const renderItem3 = ({item}) => {
    return <SmallCard item={item} />;
  };
  return (
    <SafeAreaView style={[styles.cont, {width: width}]}>
      <View style={styles.titleView}>
        <Text style={styles.titleStyle}>Browse</Text>
      </View>
      <View style={styles.descView}>
        <Text style={styles.desTitle}>Discover things of this world</Text>
      </View>
      <View style={styles.searchView}>
        <TouchableOpacity style={styles.searchIcnView}>
          <IcAnt name="search1" size={25} color="#7C82A1" />
        </TouchableOpacity>
        <TextInput style={styles.txtInputStyle} />
        <TouchableOpacity style={styles.microIcnView}>
          <IcFound name="microphone" size={28} color="#7C82A1" />
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.renderItem3Flat}
        ListHeaderComponent={HeaderView}
        data={articles}
        renderItem={renderItem3}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) =>
          Math.floor(Math.random() * 1000) + index * 0.12 + 0.098
        }
     
      />
    </SafeAreaView>
  );
};
export default Homes;
const styles = StyleSheet.create({
  renderItem2_Img: {
    borderRadius: 12,
    opacity: 0.79,
  },
  endIcon: {
    width: '95%',
    alignItems: 'flex-end',
  },
  contentFirstRow: {
    width: '100%',
    alignSelf: 'center',
    paddingVertical: 5,
  },
  txtFirstRow: {
    color: '#F3F4F6',
    fontWeight: 'bold',
  },
  contentSecondRow: {
    width: '100%',
    alignSelf: 'center',
    paddingVertical: 5,
    height: 80,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  txtSRow: {
    color: 'white',
    lineHeight: 18,
  },
  cont: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleView: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 8,
  },
  titleStyle: {
    fontSize: 24,
  },
  descView: {
    width: '100%',
    paddingHorizontal: 20,
  },
  desTitle: {
    fontSize: 16,
    color: '#7C82A1',
  },
  searchView: {
    flexDirection: 'row',
    borderRadius: 12,
    marginTop: 32,
    alignSelf: 'center',
    width: '90%',
    height: 55,
    backgroundColor: '#F3F4F6',
   
  },
  searchIcnView: {
    alignSelf: 'center',
    marginStart: 8,
  },
  txtInputStyle: {
    width: '80%',
    paddingHorizontal: 10,
  },
  microIcnView: {
    alignSelf: 'center',
    marginStart: 8,
  },
  boxStyle: {
    width: 90,
    height: 36,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginEnd: 15,
    paddingHorizontal: 5,
  },
  txtBoxStyle: {
    fontSize: 12,
    color: '#7C82A1',
  },
  flatView: {
    marginStart: '5%',
    paddingVertical: 10,
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
  },
  flatView2: {
    marginTop: 5,
    marginStart: '5%',

    flexDirection: 'row',

    paddingVertical: 10,
  },
  itemBack: {
    width: 230,
    height: 230,
    borderRadius: 20,
    marginEnd: 12,
    paddingHorizontal: 18,
    paddingVertical: 15,
    paddingBottom: 6,
    justifyContent: 'space-between',
  },
  footerTitle: {
    marginTop: 20,
    // paddingVertical:10,
    width: '88%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  renderItem3Flat: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  renderItem2Img: {
    borderRadius: 12,
    opacity: 0.79,
  },
});
