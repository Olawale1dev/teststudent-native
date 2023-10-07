import React, {Component} from 'react';
import {View,BackHandler,Platform, ActivityIndicator,Button,Text,ScrollView,RefreshControl, FlatList, ScrollViewBase} from 'react-native';
import {WebView} from 'react-native-webview';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
//import { RefreshableListView } from 'react-native-refreshable-listview';

export default class App extends Component {
  constructor(props) {
    super(props);
  this.state = {
      refreshing: false,
      loading: true,
      error: null,
    };
    
  }
  onRefresh = () => {
    this.setState({ refreshing: true });
    // You can perform any additional logic here, like reloading the page.
    // For example, you can use the `reload` method of the WebView component.
    // this.webViewRef.reload(); // Make sure to use a ref to access the WebView component.
    setTimeout(() => this.setState({ refreshing: false }), 10000); // Simulate refreshing for 1 second.
  };

  /*const App = () => {
    const [refreshing, setRefreshing] = React.useState(false);*/
  
    /*onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);
    
    
    */

        
    /*
      <Button onPress={this._activate} title=" Click to Activate awake" />
        <Button onPress={this._deactivate} title="Click to Deactivate awake" />
    onRefresh = () => {
          this.setState({ refreshing: true });
      
          // Simulate a reload by waiting for 2 seconds (replace with your actual reload logic)
          setTimeout(() => {
            // Once the data is updated or reloaded, set refreshing to false
            this.setState({ refreshing: false });
          }, 2000);
        };

         <ScrollViewt>
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }</ScrollView>
       */
        onLoadStart = () => {
          this.setState({ loading: true });
        };
      
        onLoadEnd = () => {
          this.setState({ loading: false });
        };
        componentDidMount() {
          // do stuff while splash screen is shown
          if (Platform.os==='android')
            // After having done stuff (such as async tasks) hide the splash screen
            SplashScreen.hide();
        }

  webView = {
    canGoBack: false,
    ref: null,
  }

  onAndroidBackPress = () => {
    if (this.webView.canGoBack && this.webView.ref) {
      this.webView.ref.goBack();
      return true;
    }
    return false;
  }
  _activate = () => {
    activateKeepAwakeAsync();
    alert('Activated!');
  };

  _deactivate = () => {
    deactivateKeepAwake();
    alert('Deactivated!');
  };
  componentDidMount() {
    activateKeepAwakeAsync();
  }

  UNSAFE_componentWillMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress');
    }
  }

  render() {
    const { uri } = this.props;
    const { refreshing, loading } = this.state;
    return (
      
      

      <View style={{flex:1} } >
       <View
         refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
       />
        
        
        <WebView
          ref={(webView) => { this.webView.ref = webView; }}
         
          onLoadStart={this.onLoadStart}
          onLoadEnd={this.onLoadEnd}
          
          onNavigationStateChange={(navState) => { this.webView.canGoBack = navState.canGoBack; }}
          automaticallyAdjustContentInsets={false}
          source={{uri: 'http://teststudent.com.ng/'}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          style={{marginTop: 25}}
        />
        
      
        {loading && <ActivityIndicator size="large" />} 
       
        
    </View>
    
    );
    
  }
  
}


/*import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/