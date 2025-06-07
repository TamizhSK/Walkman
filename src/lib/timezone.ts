// lib/timezone.ts


import { useState, useEffect } from 'react';

/**
 * Get user's timezone from browser
 */
export function getUserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return 'UTC';
  }
}

/**
 * Convert UTC date to user's timezone
 */
export function convertToUserTimezone(utcDate: Date, timezone: string): Date {
  try {
    const userDate = new Date(utcDate.toLocaleString("en-US", { timeZone: timezone }));
    return userDate;
  } catch {
    return utcDate;
  }
}

/**
 * Convert user's local date to UTC
 */
export function convertToUTC(localDate: Date, timezone: string): Date {
  try {
    // Get the timezone offset for the user's timezone
    const localTime = localDate.getTime();
    const localOffset = localDate.getTimezoneOffset() * 60000;
    const utcTime = localTime + localOffset;
    
    // Get the target timezone offset
    const targetDate = new Date(utcTime + (getTimezoneOffset(timezone) * 60000));
    return targetDate;
  } catch {
    return localDate;
  }
}

/**
 * Get timezone offset in minutes
 */
function getTimezoneOffset(timezone: string): number {
  try {
    const now = new Date();
    const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
    const targetDate = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
    return (utcDate.getTime() - targetDate.getTime()) / (1000 * 60);
  } catch {
    return 0;
  }
}

/**
 * Format date according to user's timezone and locale
 */
export function formatDateInTimezone(
  date: Date, 
  timezone: string, 
  options: Intl.DateTimeFormatOptions = {}
): string {
  try {
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
      ...options
    };

    return new Intl.DateTimeFormat('en-US', {
      ...defaultOptions,
      timeZone: timezone
    }).format(date);
  } catch {
    return date.toISOString();
  }
}

/**
 * Get common timezone options for select dropdowns
 */
export const commonTimezones = [
  { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'Europe/London', label: 'London (GMT/BST)' },
  { value: 'Europe/Berlin', label: 'Berlin (CET/CEST)' },
  { value: 'Europe/Paris', label: 'Paris (CET/CEST)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
  { value: 'Asia/Shanghai', label: 'Shanghai (CST)' },
  { value: 'Asia/Kolkata', label: 'India (IST)' },
  { value: 'Asia/Dubai', label: 'Dubai (GST)' },
  { value: 'Australia/Sydney', label: 'Sydney (AEDT/AEST)' },
  { value: 'Australia/Melbourne', label: 'Melbourne (AEDT/AEST)' },
  { value: 'Pacific/Auckland', label: 'Auckland (NZDT/NZST)' },
];

/**
 * Hook for client-side timezone detection
 */
export function useTimezone() {
  const [timezone, setTimezone] = useState<string>('UTC');

  useEffect(() => {
    setTimezone(getUserTimezone());
  }, []);

  return timezone;
}
