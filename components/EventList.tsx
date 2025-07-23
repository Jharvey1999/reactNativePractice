import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

const colorScheme = useColorScheme() ?? 'light';

type User = {
  name: string;
  contribution: number;
};

type Event = {
  id: string;
  date: string;
  name: string;
  totalCost: number;
  paid: number;
  uOwed: number;
  othersOwed: number;
  users: User[];
};

type Props = {
  events: Event[];
  selectedEvent: string | null;
  setSelectedEvent: (id: string | null) => void;
  onRemoveEvent?: (eventId: string) => void; // <-- Add this line
};

export function EventList({ events, selectedEvent, setSelectedEvent }: Props) {
  return (
    <View>
      {events.map(event => (
        <View key={event.id}>
          <TouchableOpacity
            style={{
              backgroundColor: colorScheme === 'dark' ? 'white' : 'black',
              borderRadius: 8,
              marginBottom: 12,
              padding: 12,
              elevation: 2,
            }}
            onPress={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{event.name}</Text>
            <Text>Date: {event.date}</Text>
            <Text>Total Cost: ${event.totalCost}</Text>
            <Text>You paid: <Text style={{ fontWeight: 'bold' }}>${event.paid}</Text></Text>
            <Text>You Owe: <Text style={{color: event.uOwed !==0 ? 'red' : 'black'}}>${event.uOwed}</Text></Text>
            <Text>Others owe you: <Text style={{color: event.othersOwed !== 0 ? 'green' : 'black'}}>${event.othersOwed}</Text></Text>
          </TouchableOpacity>
          {selectedEvent === event.id && (
            <View style={{ backgroundColor: '#fff', borderRadius: 8, padding: 16, marginTop: 8 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Event Details</Text>
              {/* Header Section */}
              <View style={{ marginTop: 8, marginBottom: 8 }}>
                <Text style={{ fontWeight: 'bold' }}>Total Cost: ${event.totalCost}</Text>
                <Text>Status</Text>
                <Text>Date: {event.date}</Text>
                <Text>Users Involved: {event.users.length}</Text>
              </View>
              {/* Line Separator */}
              <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginVertical: 8 }} />
              {/* Paid Header */}
              <Text style={{ fontWeight: 'bold', marginTop: 8, marginBottom: 4 }}>Contribution</Text>
              {/* Contributions */}
              {event.users.map(user => (
                <View key={user.name} style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 }}>
                  <Text>{user.name}</Text>
                  <Text>${user.contribution}</Text>
                </View>
              ))}
              {/* Divider */}
              <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginVertical: 8 }} />
              {/* Relationships */}
              <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Relationships</Text>
              {(() => {
                const currentUser = "Anon"; // Replace with getCurrentUser later
                const relationships: { from: string; to: string; amount: number }[] = [];
                const share = event.totalCost / event.users.length;
                const creditors = event.users.filter(u => u.contribution > share);
                const debtors = event.users.filter(u => u.contribution < share);

                debtors.forEach(debtor => {
                  creditors.forEach(creditor => {
                    const amount = Math.min(share - debtor.contribution, creditor.contribution - share);
                    if (amount > 0) {
                      relationships.push({
                        from: debtor.name,
                        to: creditor.name,
                        amount: Math.round(amount * 100) / 100,
                      });
                    }
                  });
                });

                if (relationships.length === 0) {
                  return (
                    <Text style={{ marginVertical: 2, color: '#888' }}>
                      No relationships: nobody owes anyone.
                    </Text>
                  );
                }

                return relationships.map((rel, idx) => {
                  let amountColor = '#222';
                  if (rel.to === currentUser) amountColor = 'green';
                  if (rel.from === currentUser) amountColor = 'red';

                  return (
                    <View key={idx} style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 }}>
                      <Text>{rel.from} to {rel.to}</Text>
                      <Text style={{ color: amountColor }}>${rel.amount}</Text>
                    </View>
                  );
                });
              })()}
              <TouchableOpacity
                style={{ marginTop: 12, alignSelf: 'flex-end' }}
                onPress={() => setSelectedEvent(null)}
              >
                <Text style={{ color: '#000000ff', fontWeight: 'bold' }}>Close</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}