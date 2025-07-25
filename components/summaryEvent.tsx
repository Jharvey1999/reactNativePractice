import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Event } from '@/storage/events_database';

type SummaryEventProps = {
  visible: boolean;
  events: Event[];
  currentUserId: string;
  onClose: () => void;
};

export const SummaryEvent: React.FC<SummaryEventProps> = ({
  visible,
  events,
  currentUserId,
  onClose,
}) => {
  if (!visible) return null;

  // Calculate totals
  let totalOwed = 0;
  let totalIsOwed = 0;
  events.forEach(event => {
    const user = event.users.find(u => u.id === currentUserId);
    if (user) {
      // Use event.uOwed and event.othersOwed if available
      totalOwed += event.uOwed || 0;
      totalIsOwed += event.othersOwed || 0;
    }
  });

  return (
    <View
      style={{
        position: 'absolute',
        top: 80,
        right: 0,
        width: 320,
        backgroundColor: '#fff',
        zIndex: 50,
        padding: 24,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
      }}
    >
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 16 }}>Summary</Text>
      <Text style={{ marginBottom: 12 }}>Total Events: <Text style={{ fontWeight: 'bold' }}>{events.length}</Text></Text>
      <Text style={{ color: 'red', marginBottom: 8 }}>
        You Owe: <Text style={{ fontWeight: 'bold' }}>${totalOwed.toFixed(2)}</Text>
      </Text>
      <Text style={{ color: 'green', marginBottom: 8 }}>
        You Are Owed: <Text style={{ fontWeight: 'bold' }}>${totalIsOwed.toFixed(2)}</Text>
      </Text>
      <TouchableOpacity
        style={{ marginTop: 16, alignSelf: 'flex-end' }}
        onPress={onClose}
      >
        <Text style={{ color: 'red', fontWeight: 'bold' }}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};