import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ShowClothes = ({ clothesData }) => {
  const { id,status,number,date} = clothesData;
  const [photo,setphoto] = useState(require('../resources/id3.png'));
  const [col,setcol] = useState('black');

  useEffect(()=>{
       if(id%2==0){
        setphoto(require('../resources/id1.png'));
      }
      else{
        setphoto(require('../resources/id3.png'));
      };
   
      if(status == 'Success'){
        setcol("green");
      }
      else if(status == 'On Progress'){
        setcol('#D0AE57');
      }
      else if(status == 'Failure') {
        setcol("red") ;
      }
  },[])
  

  return (
    <View style={{  border: 1, borderColor: '#ccc', borderRadius: 12, borderWidth: 1.2, marginBottom:10 }}>
       <Image source={photo} style={{  borderRadius:12,width:'100%' }} />
       <View className='justify-center' style = {{padding: 12}}>
        <Text className='flex-row m-2 ' style = {{ textAlign:'left',marginLeft:18 ,color:col,fontSize:14}}>{status}</Text>
        <Text className='flex-row font-semibold text-xl m-2 ' style = {{color:'black', textAlign:'left',marginLeft:18,fontSize:18,fontWeight:'500'}}>Number of cloths - {number}</Text>
        <Text className='flex-row m-2' style = {{ textAlign:'left',marginLeft:18,fontSize:15,color:'black'}}>{date} </Text> 
       </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 2,
    justifyContent: 'space-between',
  },
  textLeft: {
    alignSelf: 'flex-start',
  },
  textRight: {
    alignSelf: 'flex-end',
  },
});

export default ShowClothes;
