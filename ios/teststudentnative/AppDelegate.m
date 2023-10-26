#import <FBSDKCoreKit/FBSDKCoreKit.h> // <- Add This Import
#import <React/RCTLinkingManager.h> // <- Add This Import
- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  if ([[FBSDKApplicationDelegate sharedInstance] application:app openURL:url options:options]) {
    return YES;
  }
  if ([RCTLinkingManager application:app openURL:url options:options]) {
    return YES;
  }
  return NO;
}