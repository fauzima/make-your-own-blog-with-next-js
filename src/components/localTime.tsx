"use client";
import dateFormat from "dateformat";

export default function LocalTime({ time }: { time: string }) {
  const now: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return (
    <span>
      <span>{dateFormat(time, "d mmm yyyy")}, </span>
      <span>{dateFormat(time, "HH:MM")} </span>
      <span>({now})</span>
    </span>
  );
}
