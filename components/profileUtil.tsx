import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useProfile } from './profileContext';

type ProfileBarProps = {
  name: string;
  onProfilePress?: () => void;
  onAddEvent?: () => void; 
  onRemoveEvent?: () => void; 
  onEditEvent?: () => void; 
  selectedEvent?: string | null; 
  events: any[]; 
};

export const ProfileBar: React.FC<ProfileBarProps> = ({
  name,
  onProfilePress,
  onAddEvent,
  onRemoveEvent,
  onEditEvent,
  selectedEvent,
  events,
}) => {
  const { portraitUri, setPortraitUri } = useProfile();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [deleteEventVisible, setDeleteEventVisible] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], // universal and future-proof
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled && result.assets.length > 0) {
      setPortraitUri(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* User Portrait */}
      <TouchableOpacity onPress={pickImage}>
        {portraitUri ? (
          <Image source={{ uri: portraitUri }} style={styles.portrait} />
        ) : (
          <View style={styles.portraitPlaceholder}>
            <Text style={{ fontSize: 24, color: '#555' }}>👤</Text>
          </View>
        )}
      </TouchableOpacity>
      {/* User Name */}
      <Text style={styles.name}>{name}</Text>
      {/* Profile Dropdown Button */}
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setDropdownVisible((v) => !v)}
        >
          <Text style={styles.buttonText}>Add ▼</Text>
        </TouchableOpacity>
        {dropdownVisible && (
          <View style={styles.dropdown}>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setDropdownVisible(false);
                if (onAddEvent) onAddEvent();
              }}
            >
              <Text style={styles.dropdownText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setDropdownVisible(false);
                if (onEditEvent) onEditEvent(); // undefined check before call
              }}
            >
              <Text style={styles.dropdownText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setDropdownVisible(false);
                if (onRemoveEvent) onRemoveEvent();
                else setDeleteEventVisible(true);
              }}
            >
              <Text style={styles.dropdownText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setDropdownVisible(false);
                // assign button press action here 
              }}
            >
              <Text style={styles.dropdownText}>Summary</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  portrait: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  portraitPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#222',
    flex: 1,
  },
  button: {
    backgroundColor: '#30c035ff',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  dropdown: {
    position: 'absolute',
    top: 40,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 6,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    minWidth: 120,
    zIndex: 10,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  dropdownText: {
    color: '#222',
    fontSize: 16,
  },
});