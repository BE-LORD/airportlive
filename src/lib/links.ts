import { BUSINESS } from './constants';

export interface BookingFormData {
  pickup?: string;
  drop?: string;
  date?: string;
  time?: string;
  name?: string;
  fullName?: string; // Support for different form structures
  phone?: string;
  passengers?: string;
  vehicle?: string;
  flightNumber?: string;
  luggage?: string;
  message?: string;
}

export const getEmailLink = (subject?: string, body?: string) => {
  const defaultSub = `Booking Inquiry - ${BUSINESS.name}`;
  const encodedSub = encodeURIComponent(subject || defaultSub);
  const encodedBody = encodeURIComponent(body || '');
  return `mailto:${BUSINESS.email}?subject=${encodedSub}&body=${encodedBody}`;
};

export const getWhatsAppLink = (message?: string) => {
  const defaultMsg = `Hi ${BUSINESS.name}, I'm interested in booking a ride.`;
  const encodedMsg = encodeURIComponent(message || defaultMsg);
  return `https://wa.me/91${BUSINESS.whatsapp}?text=${encodedMsg}`;
};

export const getPhoneLink = () => {
  return `tel:${BUSINESS.phoneFull}`;
};

export const getBookingMessage = (data: BookingFormData) => {
  return `Hi ${BUSINESS.name}, I want to book a ride.
  
📍 Pickup: ${data.pickup || 'Not specified'}
📍 Drop: ${data.drop || 'Not specified'}
📅 Date: ${data.date || 'Not specified'}
🕐 Time: ${data.time || 'Not specified'}
👤 Name: ${data.name || data.fullName || 'Not specified'}
📞 Phone: ${data.phone || 'Not specified'}
👥 Passengers: ${data.passengers || 'Not specified'}
🚗 Vehicle: ${data.vehicle || 'Not specified'}${data.flightNumber ? `\n✈️ Flight: ${data.flightNumber}` : ''}${data.message ? `\n📝 Notes: ${data.message}` : ''}`;
};
