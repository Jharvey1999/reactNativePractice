import React, { useState } from 'react';
import { Text, Platform, View, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { sharedStyles } from '@/components/styles/styles';
import { EventList } from '@/components/EventList';
import { events } from '@/storage/events_database';
import { Event } from '@/storage/events_database';
import { users } from '@/storage/user_database';
import { friendsList } from '@/storage/friendsList';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ProfileBar } from '@/components/profileUtil';
import { AddEvent } from '@/components/addEvent';
import { createEvent } from '@/storage/events_database';
import { DeleteEvent } from '@/components/deleteEvent';
import { EditEvent } from '@/components/editEvent';
import { EditEventForm } from '@/components/editEvent';
import { SummaryEvent } from '@/components/summaryEvent';

export default function HomeScreen() {
	const [leftOpen, setLeftOpen] = useState(false);
	const [rightOpen, setRightOpen] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
	const [addEventVisible, setAddEventVisible] = useState(false);
	const [deleteEventVisible, setDeleteEventVisible] = useState(false);
	const [eventList, setEventList] = useState(events); 
	const [editEventFormVisible, setEditEventFormVisible] = useState(false);
	const [eventToEdit, setEventToEdit] = useState<Event | null>(null);
	const [selectEditEventVisible, setSelectEditEventVisible] = useState(false);
	const colorScheme = useColorScheme() ?? 'light';
	const [summaryVisible, setSummaryVisible] = useState(false);

	// Temp friends list
	const router = useRouter();

	// Zoom logic
	const scale = useSharedValue(1);

	const pinchGesture = Gesture.Pinch()
		.onUpdate((event) => {
			scale.value = Math.max(1, event.scale);
		});

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
	}));

	const handleRemoveEvent = (eventId: string) => {
		setEventList((prev) => prev.filter((event) => event.id !== eventId));
	};

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<GestureDetector gesture={pinchGesture}>
				<Animated.View style={[{ flex: 1 }, animatedStyle]}>
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
									Not Quite Splitwise
								</Text>
							</View>
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

							{/* Left Column */}
							{leftOpen && (
								<View
									style={[
										sharedStyles.col1,
										{
											position: 'absolute',
											top: 0,
											left: 0,
											bottom: 0,
											width: '100%',
											backgroundColor:
												colorScheme === 'dark' ? 'black' : 'white',
											zIndex: 10,
										},
									]}
								>
									<ScrollView contentContainerStyle={sharedStyles.leftContent}>
										{/* Navigation Tabs */}
										<TouchableOpacity
											style={[
												sharedStyles.leftTabButton,
												{
													backgroundColor:
														colorScheme === 'dark' ? '#222' : '#ccc',
												},
											]}
											onPress={() => {
												// router.push('/'); // Uncomment to navigate to Home
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
												{
													backgroundColor:
														colorScheme === 'dark' ? '#222' : '#ccc',
												},
											]}
											onPress={() => {
												router.push('/expenses'); // navigate to Expenses
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

										{/* Friends Header */}
										<Text
											style={[
												sharedStyles.friendsHeader,
												{
													color:
														colorScheme === 'dark'
															? '#17851bff'
															: '#30c035ff',
												},
											]}
										>
											Friends
										</Text>

										{/* Friends List */}
										{friendsList.map((friend) => (
											<View key={friend.id} style={sharedStyles.friendItem}>
												<Text
													style={[
														sharedStyles.friendText,
														{ color: colorScheme === 'dark' ? 'white' : 'black' },
													]}
												>
													{friend.name}
												</Text>
											</View>
										))}
									</ScrollView>
									{/* Collapse button */}
									<TouchableOpacity
										style={[
											sharedStyles.tab,
											{ left: 0, position: 'absolute', top: 0 },
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
							)}

							{/* MAIN Column */}
							<View
								style={[
									sharedStyles.col2,
									{ flex: 2 },
									!leftOpen && { paddingLeft: 16 },
									!rightOpen && { paddingRight: 0 },
								]}
							>
                <ProfileBar
                  name="Anon"
                  onProfilePress={() => {/* handle press */}}
                  onAddEvent={() => setAddEventVisible(true)}
                  onRemoveEvent={() => setDeleteEventVisible(true)} 
				  onEditEvent={() => setSelectEditEventVisible(true)}
				  selectedEvent={selectedEvent}
				  events={eventList}
				  onSummary={() => setSummaryVisible(true)}
                />

								{/* Event List */}
								<EventList
									events={eventList}
									selectedEvent={selectedEvent}
									setSelectedEvent={setSelectedEvent}
									onRemoveEvent={handleRemoveEvent}
								/>

								{/* Left Expand Tab */}
								{!leftOpen && (
									<>
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
									</>
								)}
							</View>
						</View>
					</ParallaxScrollView>
					{/* Add the Event */}
					<AddEvent
						visible={addEventVisible}
						onClose={() => setAddEventVisible(false)}
						onAdd={eventData => {
							const newEvent = createEvent(
								(eventList.length + 1).toString(),
								eventData.date,
								eventData.name,
								eventData.contributions,
								users[0].id
							);
							setEventList(prev => [...prev, newEvent]);
							setAddEventVisible(false);
						}}
						currentUserId={users[0].id}
						friends={friendsList}
					/>
					<DeleteEvent
						visible={deleteEventVisible}
						events={eventList}
						onClose={() => setDeleteEventVisible(false)}
						onRemove={handleRemoveEvent}
					/>
					<EditEvent
						visible={selectEditEventVisible}
						events={eventList}
						onClose={() => setSelectEditEventVisible(false)}
						onSelect={(event: Event) => {
							setEventToEdit(event);
							setEditEventFormVisible(true);
							setSelectEditEventVisible(false);
						}}
					/>

					{/* Edit Event Form */}
					<EditEventForm
						visible={editEventFormVisible}
						event={eventToEdit}
						onClose={() => setEditEventFormVisible(false)}
						onSave={eventData => {
							if (!eventToEdit) return;
							setEventList(prev =>
								prev.map(ev =>
									ev.id === eventToEdit.id
										? { ...ev, ...eventData, id: ev.id }
										: ev
								)
							);
							setEditEventFormVisible(false);
							setEventToEdit(null);
						}}
						friends ={friendsList}
					/>
					<SummaryEvent
						visible={summaryVisible}
						events={eventList}
						currentUserId={users[0].id}
						onClose={() => setSummaryVisible(false)}
					/>
				</Animated.View>
			</GestureDetector>
		</GestureHandlerRootView>
	);
}



