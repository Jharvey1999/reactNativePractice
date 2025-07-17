import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

type Event = {
  id: string;
  name: string;
  date: string;
};

type DeleteEventProps = {
  visible: boolean;
  events: Event[];
  onClose: () => void;
  onRemove: (eventId: string) => void;
};

export const DeleteEvent: React.FC<DeleteEventProps> = ({ visible, events, onClose, onRemove }) => {
  if (!visible) return null;

  return (
    <View
      style={{
        position: 'absolute',
        top: 80,
        right: 0,
        width: 320,
        backgroundColor: '#fff',
        zIndex: 30,
        padding: 24,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
      }}
    >
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 16 }}>Remove Event</Text>
      <ScrollView>
        {events.map(event => (
          <TouchableOpacity
            key={event.id}
            style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' }}
            onPress={() => {
              onRemove(event.id);
              onClose();
            }}
          >
            <Text>{event.name} ({event.date})</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={{ marginTop: 16, alignSelf: 'flex-end' }}
        onPress={onClose}
      >
        <Text style={{ color: 'red', fontWeight: 'bold' }}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};