import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRightIcon, ChevronDownIcon } from 'react-native-heroicons/outline';

const ShowClothes = ({ clothesData }) => {
  const { title, size, forChildren, photo } = clothesData;
  const [isExpanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!isExpanded);
  };

  return (
    <View style={{ padding: 20, border: 1, borderColor: '#ccc', borderRadius: 4, borderWidth: 1, margin: 2 }}>
      <TouchableOpacity onPress={toggleExpand}>
        <View style={styles.container}>
          <Text style={styles.textLeft}>{title}</Text>
          {isExpanded ? <ChevronDownIcon color={'black'} /> : <ChevronRightIcon color={'black'} />}
        </View>
      </TouchableOpacity>

      {isExpanded && (
        <>
          <View style={styles.container}>
            <Text style={styles.textLeft}>Size</Text>
            <Text style={styles.textRight}>{size}</Text>
          </View>

          <View style={styles.container}>
            <Text style={styles.textLeft}>For Children</Text>
            <Text style={styles.textRight}>{forChildren ? 'yes' : 'no'}</Text>
          </View>

          {/* Repeat the above pattern for other content sections if needed */}
          
          <View style={styles.container}>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Photo:</Text>{' '}
            </Text>
            <Image source={photo} style={{ width: 50, height: 50 }} />
          </View>
        </>
      )}
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
