import { events } from '@/storage/events_database';

export function addEvent(eventData: {
  id: string;
  name: string;
  date: string;
  contributions: { id: string; contribution: number }[];
  createdBy: string;
}) {
  // Add the new event to your events array
  events.push({
    id: eventData.id,
    name: eventData.name,
    date: eventData.date,
    totalCost: eventData.contributions.reduce((sum, c) => sum + c.contribution, 0),
    paid: eventData.contributions.find(c => c.id === eventData.createdBy)?.contribution || 0,
    uOwed: 0, // You can calculate this as needed
    othersOwed: 0, // You can calculate this as needed
    users: eventData.contributions.map(c => ({
      id: c.id,
      name: '', // Fill in user name if available
      contribution: c.contribution,
    })),
  });
}