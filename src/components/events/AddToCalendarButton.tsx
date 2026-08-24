import { AddToCalendarButton } from 'add-to-calendar-button-react';
import type { AddToCalendarButtonType } from 'add-to-calendar-button-react';

const DEFAULT_STYLE_LIGHT =
  '--btn-background: #0161ef; --btn-text: #fff; --btn-shadow: 0 4px 12px rgba(1, 97, 239, 0.35); --btn-hover-background: #0154cf; --btn-hover-text: #fff; --btn-hover-shadow: 0 6px 18px rgba(1, 97, 239, 0.5); --btn-border: none; --btn-border-radius: 9999px; --btn-font-weight: 600;';
const DEFAULT_STYLE_DARK =
  '--btn-background: #0161ef; --btn-text: #fff; --btn-shadow: 0 4px 14px rgba(0, 0, 0, 0.5); --btn-hover-background: #3b82f6; --btn-hover-text: #fff; --btn-hover-shadow: 0 6px 20px rgba(59, 130, 246, 0.55); --btn-border: none; --btn-border-radius: 9999px; --btn-font-weight: 600;';

export default function atcb(props: AddToCalendarButtonType) {
  return (
    <AddToCalendarButton
      styleLight={props.styleLight ?? DEFAULT_STYLE_LIGHT}
      styleDark={props.styleDark ?? DEFAULT_STYLE_DARK}
      label="Add Event to Calendar"
      buttonStyle="default"
      trigger="click"
      lightMode="bodyScheme"
      hideBackground
      name={props.name}
      location={props.location}
      startDate={props.startDate}
      endDate={props.endDate}
      startTime={props.startTime}
      endTime={props.endTime}
      timeZone="America/New_York"
      options="'Apple','Google','iCal','Microsoft365','MicrosoftTeams'"
    ></AddToCalendarButton>
  );
}
