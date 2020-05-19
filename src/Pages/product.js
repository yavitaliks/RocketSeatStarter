import React, { useState } from "react";
import { View, Text } from "react-native";
import { WebView } from "react-native-webview";

export default function Products({ route, navigation }) {
  const [urlparm, setUrlParm] = useState(route.params.product);
  console.log("URL ", urlparm);
  console.log(route.params.product);
  return <WebView source={{ uri: route.params.product }} />;
}
