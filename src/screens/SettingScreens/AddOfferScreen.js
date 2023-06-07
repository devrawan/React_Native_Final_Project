import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, TextInput, Button, ActivityIndicator, View, TouchableOpacity, Alert, StatusBar, Platform, ScrollView } from 'react-native'
import FeatherIc from 'react-native-vector-icons/Feather';
import FontAwesomeIc from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import AntIc from 'react-native-vector-icons/AntDesign';
import MyStatusBar from '../../components/MyStatusBar';
// import axios from 'axios';
import instance from '../../axios_helper';
import { WebView } from 'react-native-webview';
import { images } from '../../constants/index';
import { useTranslation } from 'react-i18next';
import { deviceId, fcmToken } from '../../../App';
import axios from 'axios';
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;



const AddOfferScreen = () => {
    const navigation = useNavigation();
    const { t, i18n } = useTranslation();

    const [nameEn, setNameEn] = useState('');
    const [nameAr, setNameAr] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [priceValue, setPriceValue] = useState('0');
    const [selectedOption, setSelectedOption] = useState('option1');
    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({});

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    useEffect(() => {

    }, []);

    function getCurrentDay() {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });

        return formattedDate;
    }

    function getNextWeak() {
        const currentDate = new Date();
        const nextWeekDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000); // Add 7 days (in milliseconds)

        const formattedDate = nextWeekDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
        return formattedDate;
    }

    const saveOffer = () => {




        var hasErrors = false;
        var mErrors = {};
        if (nameAr.trim() == '') {
            hasErrors = true;
            mErrors['name_ar'] = true;
        } else {
            mErrors['name_ar'] = false;
        }

        if (nameEn.trim() == '') {
            hasErrors = true;
            mErrors['name_en'] = true;
        } else {
            mErrors['name_en'] = false;
        }

        if (startDate.trim() == '') {
            hasErrors = true;
            mErrors['start_date'] = true;
        } else {
            mErrors['start_date'] = false;
        }

        if (endDate.trim() == '') {
            hasErrors = true;
            mErrors['end_date'] = true;
        } else {
            mErrors['end_date'] = false;
        }


        if (priceValue.trim() == '') {
            hasErrors = true;
            mErrors['price_value'] = true;
        } else {
            mErrors['price_value'] = false;
        }

        setErrors(mErrors);
        if (hasErrors) {
            return;
        }


        setLoading(true);
        var body = {
            'name_ar': nameAr,
            'name_en': nameEn,
            'start_at': startDate,
            'end_at': endDate,
            'type': selectedOption == 'option1' ? 0 : 1,
            'value': parseInt(priceValue)
        }

        console.log(JSON.stringify(body));


        axios.post(
            `https://xcobon.com/api/offers`,
            body,
            {
                headers: {
                    'deviceKey': deviceId,
                    'fcm-token': fcmToken,
                    'Content-Type': 'application/json',
                    'accept': '*/*',

                    'language': i18n.language == undefined ? "en" : i18n.language,
                }
            }

        )
            .then(response => {

                console.log("response : " , response);
                navigation.pop();
                alert('Success')

            })
            .catch(error => {
                console.log("error ",error);
                setLoading(false);
                alert(`${error.response.data.message}`)

            })
    };


    return (
        <View style={styles.container}>
            <MyStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />


            <View style={styles.appBar}>
                <TouchableOpacity
                    style={{ width: '20%', height: '100%', alignSelf: 'flex-start', justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => {
                        navigation.goBack();
                    }}>
                    <AntIc
                        name={i18n.language === 'en' ? 'arrowleft' : 'arrowright'}
                        size={22}
                    />
                </TouchableOpacity>
                <View style={{ width: '80%', height: '100%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                    <Text
                        style={{ fontSize: 18, color: 'black', fontFamily: 'Dubai-Bold', fontWeight: '500' }}>
                        {t('Add New Offer')}
                    </Text>
                </View>

                <View style={{ width: '20%', height: '100%', alignSelf: 'flex-start', justifyContent: 'center', alignItems: 'center' }} >

                </View>
            </View>

            <ScrollView>
                <View style={{ flex: 1, padding: 20 }}>

                    <View style={errors['name_en'] ? styles.shaddoBoxError : styles.shaddoBox}>

                        <TextInput
                            style={{
                                borderRadius: 10,
                                elevation: 2,
                                backgroundColor: "white",
                                width: '100%',
                                placeholderTextColor: 'black',
                                padding: 12,
                            }}
                            value={nameEn}
                            onChangeText={(val) => {
                                var currentErrors = Object.assign({}, errors);
                                currentErrors['name_en'] = false;
                                setErrors(currentErrors);
                                setNameEn(val);
                            }}
                            placeholderTextColor="gray" 
                            placeholder={t('Name English')} />
                    </View>

                    <View style={errors['name_ar'] ? styles.shaddoBoxError : styles.shaddoBox}>

                        <TextInput
                            style={{
                                borderRadius: 10,
                                elevation: 2,
                                backgroundColor: "white",
                                padding: 12,
                                width: '100%',
                            }}
                            value={nameAr}
                            onChangeText={(val) => {
                                var currentErrors = Object.assign({}, errors);
                                currentErrors['name_ar'] = false;
                                setErrors(currentErrors);
                                setNameAr(val)
                            }}
                            placeholderTextColor="gray" 
                            placeholder={t('Name Arabic')} />
                    </View>

                    <View style={errors['start_date'] ? styles.shaddoBoxError : styles.shaddoBox}>

                        <TextInput
                            style={{
                                borderRadius: 10,
                                elevation: 2,
                                width: '100%',
                                backgroundColor: "white",
                                padding: 12,
                                width: '100%',
                            }}
                            value={startDate}
                            keyboardType='numbers-and-punctuation'

                            placeholderTextColor="gray" 
                            onChangeText={(val) => {
                                var currentErrors = Object.assign({}, errors);
                                currentErrors['start_date'] = false;
                                setErrors(currentErrors);
                                setStartDate(val);
                            }}
                            placeholder={t('Start Date:  07/07/2023')} />
                    </View>

                    <View style={errors['end_date'] ? styles.shaddoBoxError : styles.shaddoBox}>

                        <TextInput
                            style={{
                                borderRadius: 10,
                                elevation: 2,
                                backgroundColor: "white",
                                padding: 12,
                                width: '100%',
                            }}
                            value={endDate}
                            keyboardType='numbers-and-punctuation'

                            placeholderTextColor="gray" 
                            onChangeText={(val) => {
                                var currentErrors = Object.assign({}, errors);
                                currentErrors['end_date'] = false;
                                setErrors(currentErrors);
                                setEndDate(val)
                            }}
                            placeholder={t('End Date:  14/07/2023')} />
                    </View>





                    <View style={errors['price_value'] ? styles.shaddoBoxError : styles.shaddoBox}>

                        <TextInput
                            multiline={true}
                            inputMode='decimal'
                            style={{
                                verticalAlign: 'top',
                                textAlignVertical: 'top',
                                borderRadius: 10,
                                elevation: 2,
                                width: '100%',
                                backgroundColor: "white",
                                padding: 12,
                            }}
                            keyboardType='numeric'

                            placeholderTextColor="gray" 
                            value={priceValue}
                            onChangeText={(val) => {
                                var currentErrors = Object.assign({}, errors);
                                currentErrors['price_value'] = false;
                                setErrors(currentErrors);
                                setPriceValue(val)
                            }}
                            placeholder={t('Value')} />
                    </View>

                    <View style={{ justifyContent: 'flex-start', marginTop: 20, }}>


                        <View style={[styles.box, { paddingVertical: 0, margin: 0, }]} >
                            <TouchableOpacity
                                style={[styles.radioButton, selectedOption === 'option1' && styles.selected]}
                                onPress={() => handleOptionSelect('option1')}
                            >
                                <Text style={[styles.radioText, selectedOption === 'option1' && styles.selected]}>Percentage</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.radioButton, selectedOption === 'option2' && styles.selected]}
                                onPress={() => handleOptionSelect('option2')}
                            >
                                <Text style={[styles.radioText, selectedOption === 'option2' && styles.selected]}>Fixed</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={{ marginTop: 40 }}>

                        <TouchableOpacity
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: 12,
                                backgroundColor: loading ? '#89979D' : '#29B1E5',
                                borderRadius: 30,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            onPress={() => saveOffer()}
                            underlayColor='#fff'>
                            <Text style={{ color: '#fff', fontSize: 22 }}>{t('Add')}</Text>
                        </TouchableOpacity>

                    </View>

                </View>
            </ScrollView>
        </View>
    );
};

export default AddOfferScreen;
const styles = StyleSheet.create({
    box: {
        shadowRadius: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 0,
        marginTop: 5,
        borderRadius: 5,
    },
    shaddoBox: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        flexDirection: 'row',
        elevation: 1, // for Android
        backgroundColor: '#fff',
        padding: 0,
        marginTop: 20,
        borderRadius: 5,
    },
    shaddoBoxError: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        borderColor: 'red',
        borderWidth: 1,
        elevation: 1, // for Android
        backgroundColor: '#fff',
        padding: 0,
        marginTop: 20,
        borderRadius: 5,
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
    appBar: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        height: APPBAR_HEIGHT,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        marginBottom: 12,

    },
    content: {
        backgroundColor: '#FFFFFF'

    },



    radio_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        paddingHorizontal: 10,

        paddingVertical: 10,
        borderWidth: 1,

        borderRadius: 20,
        borderColor: '#ccc',
        marginRight: 10,
    },
    selected: {
        backgroundColor: '#D54078',
        color: 'white'
    },
    radioText: {
        paddingHorizontal: 10,
        color: '#333',
    },
});