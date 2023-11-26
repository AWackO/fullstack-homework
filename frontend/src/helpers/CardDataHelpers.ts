// Interface for the structure of the opening hours
export interface IOpenHours {
  start: string;
  end: string;
  type: string;
}

// Props interface for the Schedule component
interface IScheduleProps {
  days: string[];
  opening_hours: {
    days: Record<string, IOpenHours[]>; // Record of days mapped to their opening hours
  };
}

export const daysList = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

// Function to group days based on their opening hours
export const groupDays = (days: string[], opening_hours: IScheduleProps["opening_hours"]) => {
  // Array to store grouped days and their opening hours
  const groupedDays: { days: string[]; openingHours: null | IOpenHours[] }[] = [];

  days.forEach((day, index) => {
    const currentOpeningHours = opening_hours.days[day];
    const isOpen = currentOpeningHours?.length > 0;
    // Check if the opening hours are the same as the previous day

    const isSameAsPrevious =
      index > 0 && JSON.stringify(currentOpeningHours) === JSON.stringify(opening_hours.days[days[index - 1]]);

    // If not open or not the same as previous, start a new group
    if (!isOpen || !isSameAsPrevious) {
      groupedDays.push({
        days: [day],
        openingHours: isOpen ? currentOpeningHours : null,
      });
    } else {
      // If open and same as previous, extend the current group
      groupedDays[groupedDays.length - 1].days.push(day);
    }
  });

  // Finally modify the groupedDays to show only the first and last days for groups with more than 2 days
  return groupedDays.map((group) => ({
    days: group.days.length > 2 ? [group.days[0], group.days[group.days.length - 1]] : group.days,
    openingHours: group.openingHours,
  }));
};
