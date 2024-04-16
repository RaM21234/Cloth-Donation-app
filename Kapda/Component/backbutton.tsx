import React from "react";

import {
  TouchableOpacity
} from 'react-native';
import { ArrowLeftCircleIcon } from "react-native-heroicons/outline";
import RootStackParamList from "./RootList";


const BackButton = ({prop }) => {
  const {navigate, where} = prop;
  return (
    <TouchableOpacity
      onPress={() => {
        navigate.navigate(where);
      }}
      style={{flexDirection: 'row', alignItems: 'center', width: '15%'}}
      className="ml-2 mr-5 ">
      <ArrowLeftCircleIcon width={40} height={40} color="black" />
    </TouchableOpacity>
  );
};

export default BackButton;
