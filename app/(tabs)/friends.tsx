import React, { useState } from 'react';
import { Text, Platform, View, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { sharedStyles } from '@/components/styles/styles';
import { LeftMenuColumn } from '@/components/leftColumnMenu';
import { friendsList } from '@/storage/friendsList';

export default function FriendsScreen() {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#30c035ff', dark: '#17851bff' }}
      headerImage={
        <View
          style={{
            paddingTop: 0,
            marginTop: 0,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Text
            style={{
              fontSize: Platform.OS === 'web' ? 58 : 30,
              color: colorScheme === 'dark' ? 'white' : 'black',
              textAlign: 'center',
              marginTop: 0,
            }}
          >
            Friends
          </Text>
        </View>
      }
    >
      <View style={sharedStyles.row}>
        {/* Left Column Menu (shared) */}
        <LeftMenuColumn leftOpen={leftOpen} setLeftOpen={setLeftOpen} />

        {/* Center Column */}
        <View
          style={[
            sharedStyles.col2,
            { flex: 2 },
            !leftOpen && { paddingLeft: 25 },
            !rightOpen && { paddingRight: 0 },
          ]}
        >
          {/* Friends Header */}
          <ThemedView style={sharedStyles.titleContainer}>
            <ThemedText type="title">Friends</ThemedText>
          </ThemedView>
          {/* Friends List */}
          <ThemedView style={sharedStyles.stepContainer}>
            {friendsList.map(friend => (
              <TouchableOpacity
                key={friend.id}
                style={[
                  sharedStyles.leftTabButton,
                  {
                    backgroundColor: colorScheme === 'dark' ? '#222' : '#ccc',
                    marginBottom: 10,
                  },
                ]}
                onPress={() => {
                  // You can add navigation or actions here
                  alert(`Friend: ${friend.name}`);
                }}
              >
                <ThemedText style={{ color: colorScheme === 'dark' ? 'white' : 'black' }}>
                  {friend.name}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>
        </View>

        {/* Left Expand/Collapse Tab */}
        {!leftOpen && (
          <TouchableOpacity
            style={[sharedStyles.tab, { left: 0 }]}
            onPress={() => setLeftOpen(true)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                sharedStyles.expandButton,
                { color: colorScheme === 'dark' ? 'white' : 'black' },
              ]}
            >
              {'\u2261'}
            </Text>
          </TouchableOpacity>
        )}
        {leftOpen && (
          <TouchableOpacity
            style={[sharedStyles.tab, { left: 0, zIndex: 20 }]}
            onPress={() => setLeftOpen(false)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                sharedStyles.expandButton,
                { color: colorScheme === 'dark' ? 'white' : 'black' },
              ]}
            >
              {'\u2261'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ParallaxScrollView>
  );
}