import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

type UserPortraitProps = {
  uri?: string;
  size?: number;
};

export const UserPortrait: React.FC<UserPortraitProps> = ({ uri, size = 64 }) => (
  <TouchableOpacity>
    {uri ? (
      <Image source={{ uri }} style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: '#ccc' }} />
    ) : (
      <View style={[styles.placeholder, { width: size, height: size, borderRadius: size / 2 }]}>
        <Text style={{ fontSize: size / 2, color: '#555' }}>👤</Text>
      </View>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
});