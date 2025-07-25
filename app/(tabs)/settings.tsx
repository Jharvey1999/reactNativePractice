import React from 'react';
import { View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { UniversalHeader } from '@/components/UniversalHeader';
import { sharedStyles } from '@/components/styles/styles';
import { UserPortrait } from '@/components/UserPortrait';
import { useProfile } from '@/components/ProfileContext';
import { users } from '@/storage/user_database';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const { user, portraitUri } = useProfile();
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';

  // Button background and text color based on theme
  const buttonBg = colorScheme === 'dark' ? '#222' : '#ccc';
  const buttonText = colorScheme === 'dark' ? 'white' : 'black';
  const dangerBg = colorScheme === 'dark' ? '#442222' : '#ffeaea';
  const dangerText = 'red';

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#30c035ff', dark: '#17851bff' }}
      headerImage={<UniversalHeader title="Settings" />}
    >
      <View style={sharedStyles.row}>
        <View style={[sharedStyles.col2, { flex: 2 }]}>
          {/* Top User Info */}
          <View style={{ alignItems: 'center', marginBottom: 24 }}>
            <UserPortrait uri={portraitUri} size={72} />
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 8 }}>
              {user.firstName} {user.lastName}
            </Text>
            <Text style={{ color: '#888', fontSize: 14, marginBottom: 8 }}>
              {user.email}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#2196f3',
                paddingVertical: 4,
                paddingHorizontal: 12,
                borderRadius: 16,
                marginTop: 4,
              }}
              onPress={() => router.push('/(tabs)/profile')}
            >
              <Text style={{ color: 'white', fontSize: 13, fontWeight: 'bold' }}>
                Edit Profile
              </Text>
            </TouchableOpacity>
          </View>

          {/* Settings Buttons */}
          <View>
            <TouchableOpacity style={[sharedStyles.leftTabButton, { backgroundColor: buttonBg }]}>
              <Text style={[sharedStyles.leftTabText, { color: buttonText }]}>Language</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[sharedStyles.leftTabButton, { backgroundColor: buttonBg }]}>
              <Text style={[sharedStyles.leftTabText, { color: buttonText }]}>Themes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[sharedStyles.leftTabButton, { backgroundColor: buttonBg }]}>
              <Text style={[sharedStyles.leftTabText, { color: buttonText }]}>History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[sharedStyles.leftTabButton, { backgroundColor: buttonBg }]}>
              <Text style={[sharedStyles.leftTabText, { color: buttonText }]}>About</Text>
            </TouchableOpacity>
          </View>

          {/* Seperator */}
          <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginVertical: 18 }} />

          {/* Account Handling Buttons */}
          <View>
            <TouchableOpacity style={[sharedStyles.leftTabButton, { backgroundColor: dangerBg }]}>
              <Text style={[sharedStyles.leftTabText, { color: dangerText }]}>Delete Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[sharedStyles.leftTabButton, { backgroundColor: buttonBg }]}>
              <Text style={[sharedStyles.leftTabText, { color: buttonText }]}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ParallaxScrollView>
  );
}