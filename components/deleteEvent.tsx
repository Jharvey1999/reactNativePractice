import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { sharedStyles } from '@/components/styles/styles';

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
    <View style={sharedStyles.rightColumn}>
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