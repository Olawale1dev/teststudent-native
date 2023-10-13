import React, {Component} from 'react';
import {View,BackHandler,Platform, ActivityIndicator,Button,Text,Platform,ScrollView,RefreshControl, FlatList, ScrollViewBase} from 'react-native';
import {WebView} from 'react-native-webview';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import { InterstitialAdManager,BannerView, AdSettings } from 'react-native-fbads';
import * as FacebookAds from 'expo-ads-facebook';


//import { RefreshableListView } from 'react-native-refreshable-listview';

export default class App extends Component {
  constructor(props) {
    super(props);
  this.state = {
      refreshing: false,
      loading: true,
      error: null,
      isloaded:false
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
    
    InterstitialAdManager = () =>{ InterstitialAdManager.showAd(1041068427219804_1041068463886467)
    .then((didClick) => {})
    .catch((error) => {});
   
 }

 InterstitialAdManager= () => {InterstitialAdManager.preloadAd('1041068427219804_1041068463886467')
 .then((didClick) => {})
 .catch((error) => {});
 InterstitialAdManager.showPreloadedAd('1041068427219804_1041068463886467');
 }

 componentDidMount() {
  // Set the placement ID for your banner ad
  AdSettings.setPlacementId('1041068427219804_1041068467219800');
}
// Will show it if already loaded, or wait for it to load and show it.
    
    */

    
        
    /*
      
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
  getPlacementId = (bannerId) => {
   let placementId;
   if(bannerId){
    placementId = Platform.OS === "ios" ? "1041068427219804_1041134240546556" : "1041068427219804_1041068467219800"
   }else{
    placementId = Platform.OS === "ios" ? "1041068427219804_1041134410546539" : "1041068427219804_1041068463886467"
   }
   if (__DEV__){
    return`IMG_16_9_APP_INSTALL#${placementId}`;
   }
   return placementId;
  }

  showInterstitial = () => {
    FacebookAds.InterstitialAdManager.showAd(interstitialId)
    .then(didClick => console.og(didClick))
    .catch(error => console.log(error));
  }

  getBannerAd = () => {
    if(isloaded){
      return(
        <FacebookAds.BannerAd placementId='large' 
        onPress={() => console.log("click")}
        onError={error => console.log(error.nativeEvent)}/>
      );
    }
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
    const { refreshing, loading,isloaded } = this.state;
    const bannerId = getPlacementId(true);
    const InterstitialId = getPlacementId(false);
    FacebookAds.AdSettings.requestPermissionsAsync().then(permissions => {
      let canTrack = permissions=== "granted";
      FacebookAds.AdSettings.setAdvertiserTrackingEnabled(canTrack);
      setIsloaded(true);

    })

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justtifyContent: 'center',
      },
      content: {
        flex: 1,
        alignItems: 'center',
        justtifyContent: 'center',
      },
      adView: {
        alignItems: 'flex-start'
      }
    }
      
      )

    return (
      
      

      <View style={{flex:1} } >
       <view style={style.content}>
       <Button title='Show Interstitial' onPress={showInterstitial}></Button>
       </view>
       <View style= {style.adView}>{this.getBannerAd}</View>
        
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
        <Button onPress={this._activate} title=" Click to Activate awake" />
        <BannerView type="standard" />
        
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