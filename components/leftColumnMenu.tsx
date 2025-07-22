import React from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { sharedStyles } from '@/components/styles/styles';
import { useColorScheme } from '@/hooks/useColorScheme';

export function LeftMenuColumn({ leftOpen, setLeftOpen }: { leftOpen: boolean, setLeftOpen: (open: boolean) => void }) {
  const colorScheme = useColorScheme() ?? 'light';
  const router = useRouter();

  if (!leftOpen) return null;

  return (
    <View
      style={[
        sharedStyles.col1,
        {
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
          zIndex: 10,
          flex: 1,
        },
      ]}
    >
      {/* Scrollable navigation buttons */}
      <ScrollView
        contentContainerStyle={[
          sharedStyles.leftContent,
          { flexGrow: 1, justifyContent: 'flex-start', minHeight: '100%' },
        ]}
        style={{ flex: 1 }}
      >
        <TouchableOpacity
          style={[
            sharedStyles.leftTabButton,
            { backgroundColor: colorScheme === 'dark' ? '#222' : '#ccc' },
          ]}
          onPress={() => {
            router.push('/');
            setLeftOpen(false);
          }}
        >
          <Text
            style={[
              sharedStyles.leftTabText,
              { color: colorScheme === 'dark' ? 'white' : 'black' },
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            sharedStyles.leftTabButton,
            { backgroundColor: colorScheme === 'dark' ? '#222' : '#ccc' },
          ]}
          onPress={() => {
            router.push('/expenses');
            setLeftOpen(false);
          }}
        >
          <Text
            style={[
              sharedStyles.leftTabText,
              { color: colorScheme === 'dark' ? 'white' : 'black' },
            ]}
          >
            Expenses
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            sharedStyles.leftTabButton,
            { backgroundColor: colorScheme === 'dark' ? '#222' : '#ccc' },
          ]}
          onPress={() => {
            router.push('/friends');
            setLeftOpen(false);
          }}
        >
          <Text
            style={[
              sharedStyles.leftTabText,
              { color: colorScheme === 'dark' ? 'white' : 'black' },
            ]}
          >
            Friends
          </Text>
        </TouchableOpacity>
        {/* Add more buttons here as needed */}
      </ScrollView>
      {/* Collapse button - absolutely positioned, always visible */}
      <TouchableOpacity
        style={[
          sharedStyles.tab,
          {
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 20, // higher than scrollview
          },
        ]}
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
    </View>
  );
}