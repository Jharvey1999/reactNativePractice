import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, useColorScheme } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { UniversalHeader } from '@/components/UniversalHeader';
import { sharedStyles } from '@/components/styles/styles';
import { useProfile } from '@/components/ProfileContext';
import { UserPortrait } from '@/components/UserPortrait';
import { useEditProfile } from '@/util/editProfile';

export default function ProfileScreen() {
  const { user, setUser, portraitUri, setPortraitUri } = useProfile();
  const colorScheme = useColorScheme() ?? 'light';
  const labelColor = colorScheme === 'dark' ? 'white' : 'black';
  const inputTextColor = colorScheme === 'dark' ? 'white' : 'black';

  // State for each field, pre-populated
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [dob, setDob] = useState(user.dob);
  const [password, setPassword] = useState(user.password ?? '');
  const [showSuccess, setShowSuccess] = useState(false);

  const editProfile = useEditProfile();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#30c035ff', dark: '#17851bff' }}
      headerImage={
        <View style={sharedStyles.profilePortraitContainer}>
          <UserPortrait uri={portraitUri} size={80} />
          <UniversalHeader title="Profile" />
        </View>
      }
    >
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        {/* First Name */}
        <Text style={[sharedStyles.profileFieldLabel, { color: labelColor }]}>First Name</Text>
        <TextInput
          style={[sharedStyles.profileTextInput, { color: inputTextColor }]}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Enter first name"
          placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#888'} // optional: theme placeholder too
        />

        {/* Last Name */}
        <Text style={[sharedStyles.profileFieldLabel, { color: labelColor }]}>Last Name</Text>
        <TextInput
          style={[sharedStyles.profileTextInput, { color: inputTextColor }]}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Enter last name"
          placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#888'} // optional: theme placeholder too
        />

        {/* Username */}
        <Text style={[sharedStyles.profileFieldLabel, { color: labelColor }]}>Username</Text>
        <TextInput
          style={[sharedStyles.profileTextInput, { color: inputTextColor }]}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter username"
          placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#888'} // optional: theme placeholder too
        />

        {/* Email */}
        <Text style={[sharedStyles.profileFieldLabel, { color: labelColor }]}>Email</Text>
        <TextInput
          style={[sharedStyles.profileTextInput, { color: inputTextColor }]}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email"
          keyboardType="email-address"
          placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#888'} // optional: theme placeholder too
        />

        {/* Phone */}
        <Text style={[sharedStyles.profileFieldLabel, { color: labelColor }]}>Phone</Text>
        <TextInput
          style={[sharedStyles.profileTextInput, { color: inputTextColor }]}
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter phone"
          keyboardType="phone-pad"
          placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#888'} // optional: theme placeholder too
        />

        {/* Date of Birth */}
        <Text style={[sharedStyles.profileFieldLabel, { color: labelColor }]}>Date of Birth (yyyy-mm-dd)</Text>
        <TextInput
          style={[sharedStyles.profileTextInput, { color: inputTextColor }]}
          value={dob}
          onChangeText={setDob}
          placeholder="YYYY-MM-DD"
          placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#888'} // optional: theme placeholder too
        />

        {/* Password */}
        <Text style={[sharedStyles.profileFieldLabel, { color: labelColor }]}>Password</Text>
        <TextInput
          style={[sharedStyles.profileTextInputPassword, { color: inputTextColor }]}
          value={'*'.repeat(password.length)}
          onChangeText={text => setPassword(text)}
          placeholder="Enter password"
          secureTextEntry
          placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#888'} // optional: theme placeholder too
        />

        {/* Save Button and Success Icon */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            style={sharedStyles.profileSaveButton}
            onPress={() => {
              editProfile({
                firstName,
                lastName,
                username,
                email,
                phone,
                dob,
                password,
                portraitUri,
              });
              setShowSuccess(true);
              setTimeout(() => setShowSuccess(false), 2000); // Hide after 2 seconds
            }}
          >
            <Text style={sharedStyles.profileSaveButtonText}>Save</Text>
          </TouchableOpacity>
          {/* Saved Successfully Icon */}
          {showSuccess && (
            <Text style={{ marginLeft: 12, fontSize: 22, color: 'green' }}>✅</Text>
          )}
        </View>
      </ScrollView>
    </ParallaxScrollView>
  );
}