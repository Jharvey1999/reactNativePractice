import React, { useState } from 'react';
import { Text, Platform, View, TouchableOpacity, ScrollView } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';
import { sharedStyles } from '@/components/styles/styles';

export default function ExpensesScreen() {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  const colorScheme = useColorScheme() ?? 'light';

  // Temp friends list
  const friends = [ 'Oppenheimer', 'Einstein', 'Newton', 'Curie', 'Tesla' ];
  const router = useRouter();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#30c035ff', dark: '#17851bff' }}
      headerImage={
        <Text style={{
          fontSize: 58,
          color: colorScheme === 'dark' ? 'white' : 'black',
          textAlign: 'center',
          marginTop: 0
        }}>
          Expenses
        </Text>
      }
    >
      <View style={sharedStyles.row}>
        {/* Left Collapse Tab */}
        {leftOpen && (
          <TouchableOpacity
            style={[sharedStyles.tab, { left: 0 }]}
            onPress={() => setLeftOpen(false)}
            activeOpacity={0.8}
          >
            <Text style={[sharedStyles.expandButton, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>{'\u2261'}</Text>
          </TouchableOpacity>
        )}

        {/* Left Column */}
        <View style={[sharedStyles.col1, {backgroundColor: colorScheme === 'dark' ? 'black' : 'white', flex: leftOpen ? 1 : 0 }]}>
          {leftOpen && (
            <ScrollView contentContainerStyle={sharedStyles.leftContent}>
              {/* Navigation Tabs */}
              <TouchableOpacity
                style={[sharedStyles.leftTabButton, {backgroundColor: colorScheme === 'dark' ? '#222' : '#ccc'}]}
                onPress={() => {
                  router.push('/'); // Navigate to Home <-- idk why error when it works
                }}
              >
                <Text style={[sharedStyles.leftTabText, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[sharedStyles.leftTabButton, {backgroundColor: colorScheme === 'dark' ? '#222' : '#ccc'}]}
                onPress={() => {
                  // Already on Expenses
                }}
              >
                <Text style={[sharedStyles.leftTabText, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>Expenses</Text>
              </TouchableOpacity>

              {/* Friends Header */}
              <Text style={[sharedStyles.friendsHeader, { color: colorScheme === 'dark' ? '#17851bff' : '#30c035ff' }]}>Friends</Text>

              {/* Friends List */}
              {friends.map((friend, idx) => (
                <View key={friend} style={sharedStyles.friendItem}>
                  <Text style={[sharedStyles.friendText, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>{friend}</Text>
                </View>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Center Column */}
        <View
          style={[
            sharedStyles.col2,
            { flex: 2 },
            !leftOpen && { paddingLeft: 75 },
            !rightOpen && { paddingRight: 75 },
          ]}>
          {/* Main content */}
          <ThemedView style={sharedStyles.titleContainer}>
            <ThemedText type="title">Expenses Page</ThemedText>
          </ThemedView>
          <ThemedView style={sharedStyles.stepContainer}>
            <ThemedText type="subtitle">Your Expenses</ThemedText>
            <ThemedText>
              {/* Add your expenses list or content here */}
              This is where your expenses will be listed.
            </ThemedText>
          </ThemedView>
        </View>

        {/* Right Column */}
        <View style={[sharedStyles.col3, {backgroundColor: colorScheme === 'dark' ? 'black' : 'white', flex: rightOpen ? 1 : 0 }]}>
          {rightOpen && <Text>Right content</Text>}
        </View>

        {/* Right Collapse Tab */}
        {rightOpen && (
          <TouchableOpacity
            style={[sharedStyles.tab, { right: 0 }]}
            onPress={() => setRightOpen(false)}
            activeOpacity={0.8}
          >
            <Text style={[sharedStyles.expandButton, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>{'\u2261'}</Text>
          </TouchableOpacity>
        )}

        {/* Left Expand Tab */}
        {!leftOpen && (
          <TouchableOpacity
            style={[sharedStyles.tab, { left: 0 }]}
            onPress={() => setLeftOpen(true)}
            activeOpacity={0.8}
          >
            <Text style={[
              sharedStyles.expandButton,
              { color: colorScheme === 'dark' ? 'white' : 'black' }
            ]}>
              {'\u2261'}
            </Text>
          </TouchableOpacity>
        )}

        {/* Right Expand Tab */}
        {!rightOpen && (
          <TouchableOpacity
            style={[sharedStyles.tab, { right: 0 }]}
            onPress={() => setRightOpen(true)}
            activeOpacity={0.8}
          >
            <Text style={[sharedStyles.expandButton, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>{'\u2261'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </ParallaxScrollView>
  );
}