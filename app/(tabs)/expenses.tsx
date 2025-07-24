import React, { useState } from 'react';
import { Text, Platform, View, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';
import { sharedStyles } from '@/components/styles/styles';
import { LeftMenuColumn } from '@/components/LeftColumnMenu';
import { UniversalHeader } from '@/components/UniversalHeader';

export default function ExpensesScreen() {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const colorScheme = useColorScheme() ?? 'light';
  const router = useRouter();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#30c035ff', dark: '#17851bff' }}
      headerImage={<UniversalHeader title="Expenses" />}
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
          {/* Main content */}
          <ThemedView style={sharedStyles.titleContainer}>
            <ThemedText type="title">Expenses Page</ThemedText>
          </ThemedView>
          <ThemedView style={sharedStyles.stepContainer}>
            <ThemedText type="subtitle">Your Expenses</ThemedText>
            <ThemedText>
              {/* Expenses List */}
              This is where your expenses will be listed.
            </ThemedText>
          </ThemedView>
        </View>

        {/* Left Expand Tab */}
        {!leftOpen && (
          <TouchableOpacity
            style={[sharedStyles.tab, { left: 0 }]}
            onPress={() => setLeftOpen(true)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                sharedStyles.expandHamburgerButton,
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
                sharedStyles.expandHamburgerButton,
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