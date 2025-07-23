import React, { useState } from 'react';
import { Text, Platform, View, TouchableOpacity, ScrollView } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { sharedStyles, friendsScreenStyles } from '@/components/styles/styles';import { LeftMenuColumn } from '@/components/leftColumnMenu';
import { friendsList } from '@/storage/friendsList';
import { calculateRelationship } from '@/util/calcRelationship';
import {getSharedEvents} from '@/util/sharedEvents';
import { events } from '@/storage/events_database';
import { users } from '@/storage/user_database';
import { EventList } from '@/components/EventList';

export default function FriendsScreen() {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<typeof friendsList[0] | null>(null);
  const [selectedSharedEvent, setSelectedSharedEvent] = useState<string | null>(null);
  const colorScheme = useColorScheme() ?? 'light';
  const [showSharedEvents, setShowSharedEvents] = useState(false);
  const sharedEvents = selectedFriend
    ? getSharedEvents(events, users[0].id, selectedFriend.id)
    : [];

  const userId = users[0].id; // set current user ID
  const friendId = selectedFriend?.id ?? '';
  const { youOwe, youAreOwed } = selectedFriend
    ? calculateRelationship(events, userId, friendId)
    : { youOwe: 0, youAreOwed: 0 };

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
                  setSelectedFriend(friend);
                  setRightOpen(true);
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
        {!leftOpen && !rightOpen && (
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

        {/* Right Expand/Collapse Tab */}
        {rightOpen && (
          <View
            style={friendsScreenStyles.rightColumn}
          >
            {/* Collapse Button */}
            <TouchableOpacity
              style={friendsScreenStyles.collapseButton}
              onPress={() => setRightOpen(false)}
            >
              <Text style={{ fontSize: 24 }}>{'\u25B6'}</Text>
            </TouchableOpacity>
            <Text style={friendsScreenStyles.friendName}>
              {selectedFriend?.name}
            </Text>
            {/* Relationship details */}
            <Text>
              Shared Events: {sharedEvents.length}{' '}
              <Text
                style={{ color: 'blue', textDecorationLine: 'underline' }}
                onPress={() => setShowSharedEvents(true)}
              >
                Show
              </Text>
            </Text>
            <Text style={{ color: 'red' }}>You owe {selectedFriend?.name}: ${youOwe.toFixed(2)}</Text>
            <Text style={{ color: 'green' }}>{selectedFriend?.name} owes you: ${youAreOwed.toFixed(2)}</Text>
          </View>
        )}
      </View>
      {showSharedEvents && (
        <View style={friendsScreenStyles.rightColumnShared}>
          <TouchableOpacity
            style={friendsScreenStyles.collapseButtonShared}
            onPress={() => setShowSharedEvents(false)}
          >
            <Text style={{ fontSize: 24 }}>{'\u25B6'}</Text>
          </TouchableOpacity>
          <Text style={friendsScreenStyles.friendName}>
            Shared Events with {selectedFriend?.name}
          </Text>
          <ScrollView>
            <EventList
              events={sharedEvents}
              selectedEvent={selectedSharedEvent}
              setSelectedEvent={setSelectedSharedEvent}
            />
          </ScrollView>
        </View>
      )}
    </ParallaxScrollView>
  );
}