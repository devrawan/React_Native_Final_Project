import React from 'react';
import { StyleSheet,StatusBar, Text, View,SafeAreaView, Alert ,Platform} from 'react-native';
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, {backgroundColor}]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );
  export default MyStatusBar;

const styles = StyleSheet.create({
 
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
 
});
