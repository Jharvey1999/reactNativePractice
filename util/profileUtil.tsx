import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useProfile } from '../components/ProfileContext';
import { profileBarStyles } from '@/components/styles/styles';
import { useRouter } from 'expo-router';

type ProfileBarProps = {
  onProfilePress?: () => void;
  onAddEvent?: () => void; 
  onRemoveEvent?: () => void; 
  onEditEvent?: () => void; 
  onSummary?: () => void;
  selectedEvent?: string | null; 
  events: any[]; 
};

export const ProfileBar: React.FC<ProfileBarProps> = ({
  onProfilePress,
  onAddEvent,
  onRemoveEvent,
  onEditEvent,
  onSummary,
  selectedEvent,
  events,
}) => {
  const { user, portraitUri, setPortraitUri } = useProfile();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [deleteEventVisible, setDeleteEventVisible] = useState(false);
  const [summaryVisible, setSummaryVisible] = useState(false);
  const router = useRouter();

  // Handler for navigating to profile
  const handleNavigateProfile = () => {
    router.push('/profile');
    if (onProfilePress) onProfilePress();
  };

  return (
    <View style={profileBarStyles.container}>
      {/* User Portrait */}
      <TouchableOpacity onPress={handleNavigateProfile}>
        {portraitUri ? (
          <Image source={{ uri: portraitUri }} style={profileBarStyles.portrait} />
        ) : (
          <View style={profileBarStyles.portraitPlaceholder}>
            <Text style={{ fontSize: 24, color: '#555' }}>👤</Text>
          </View>
        )}
      </TouchableOpacity>
      {/* User Name */}
      <TouchableOpacity onPress={handleNavigateProfile} style={{ flex: 1 }}>
        <Text style={profileBarStyles.name}>
          {user.firstName} {user.lastName}
        </Text>
      </TouchableOpacity>
      {/* Profile Dropdown Button */}
      <TouchableOpacity
        style={profileBarStyles.button}
        onPress={() => setDropdownVisible((v) => !v)}
      >
        <Text style={profileBarStyles.buttonText}>Add ▼</Text>
      </TouchableOpacity>
      {dropdownVisible && (
        <View style={profileBarStyles.dropdown}>
          <TouchableOpacity
            style={profileBarStyles.dropdownItem}
            onPress={() => {
              setDropdownVisible(false);
              if (onAddEvent) onAddEvent();
            }}
          >
            <Text style={profileBarStyles.dropdownText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={profileBarStyles.dropdownItem}
            onPress={() => {
              setDropdownVisible(false);
              if (onEditEvent) onEditEvent(); // undefined check before call
            }}
          >
            <Text style={profileBarStyles.dropdownText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={profileBarStyles.dropdownItem}
            onPress={() => {
              setDropdownVisible(false);
              if (onRemoveEvent) onRemoveEvent();
              else setDeleteEventVisible(true);
            }}
          >
            <Text style={profileBarStyles.dropdownText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={profileBarStyles.dropdownItem}
            onPress={() => {
              setDropdownVisible(false);
              if (onSummary) onSummary();
            }}
          >
            <Text style={profileBarStyles.dropdownText}>Summary</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};