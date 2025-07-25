import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { sharedStyles } from '@/components/styles/styles';

type Friend = {
  id: string;
  name: string;
};

type DeleteFriendProps = {
  visible: boolean;
  friends: Friend[];
  onClose: () => void;
  onRemove: (friendId: string) => void; // util called in tab
};

export const DeleteFriend: React.FC<DeleteFriendProps> = ({ visible, friends, onClose, onRemove }) => {
  if (!visible) return null;

  return (
    <View style={sharedStyles.rightColumn}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 16 }}>Remove Friend</Text>
      <ScrollView>
        {friends.map(friend => (
          <TouchableOpacity
            key={friend.id}
            style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' }}
            onPress={() => {
              onRemove(friend.id); // util called in tab
              onClose();
            }}
          >
            <Text>{friend.name}</Text>
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