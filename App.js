import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button,Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';

export default function App() {
  
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const[barcode,setBarcode]=useState('')
  const[dataB,setData]=useState({})

console.log(dataB)
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  useEffect(()=>{
    axios.get(`https://easybuy-690d0-default-rtdb.firebaseio.com/products/46207001414452.json`).then((response)=>setData(JSON.stringify( response.data)))
   
  },[])

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
   setBarcode(data)
   
      
    
     
   
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={
        styles.barcode
      }>
       
   <Image style={styles.image} source={{uri:'https://easybuy-690d0.appspot.com.storage.googleapis.com/0db93e0eb4.jpg'}} />
       
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    borderBottomWidth:2,
    borderBottomColor:'red'
  },
  barcode:{
    width:'100%',
    height:700,
    borderBottomWidth:2,
    borderBottomColor:'red'
  },
  image:{
    width: 50,
    height: 50,
  }
});

