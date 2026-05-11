import { BUSINESS } from "@/lib/constants";

export interface BookingFormData {
  fullName: string;
  phone: string;
  pickup: string;
  drop: string;
  date: string;
  time: string;
  flightNumber?: string;
  passengers: string;
  luggage?: string;
  message?: string;
}

export function buildWhatsAppUrl(message?: string): string {
  const base = "https://wa.me/" + BUSINESS.whatsapp;
  if (!message) return base;
  const encoded = encodeURIComponent(message);
  return `${base}?text=${encoded}`;
}

export function buildCallUrl(): string {
  return `tel:${BUSINESS.phoneFull}`;
}

export function buildEmailUrl(
  subject = "Booking Inquiry",
  body?: string
): string {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = body ? encodeURIComponent(body) : "";
  return `mailto:${BUSINESS.email}?subject=${encodedSubject}${encodedBody ? `&body=${encodedBody}` : ""}`;
}

export function buildBookingMessage(data: BookingFormData): string {
  const lines = [
    `Hi ${BUSINESS.name}, I want to book a ride.`,
    "",
    `Name: ${data.fullName}`,
    `Phone: ${data.phone}`,
    `Pickup: ${data.pickup}`,
    `Drop: ${data.drop}`,
    `Date: ${data.date}`,
    `Time: ${data.time}`,
  ];

  if (data.flightNumber) lines.push(`Flight Number: ${data.flightNumber}`);
  lines.push(`Passengers: ${data.passengers}`);
  if (data.luggage) lines.push(`Luggage: ${data.luggage}`);
  if (data.message) lines.push(``, `Special Request: ${data.message}`);

  lines.push("", "Please confirm availability.");

  return lines.join("\n");
}

export function buildBookingEmailBody(data: BookingFormData): string {
  const lines = [
    `Booking Inquiry — ${BUSINESS.name}`,
    "",
    `Name: ${data.fullName}`,
    `Phone: ${data.phone}`,
    `Pickup Location: ${data.pickup}`,
    `Drop Location: ${data.drop}`,
    `Travel Date: ${data.date}`,
    `Travel Time: ${data.time}`,
  ];

  if (data.flightNumber) lines.push(`Flight Number: ${data.flightNumber}`);
  lines.push(`Number of Passengers: ${data.passengers}`);
  if (data.luggage) lines.push(`Number of Luggage: ${data.luggage}`);
  if (data.message) lines.push(``, `Special Request:`, data.message);

  return lines.join("\n");
}
