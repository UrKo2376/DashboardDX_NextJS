export default function HeaderDate() {
    const date = new Date();

    // Get day abbreviation (e.g. "Fri")
    const day: string = date.toLocaleDateString('en-GB', { weekday: 'short' });

    // Get date with ordinal suffix (e.g. "27th")
    const getOrdinal = (n: number): string => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };
    const dayOfMonth: number = date.getDate();
    const dayWithSuffix: string = getOrdinal(dayOfMonth);

    // Get month name (e.g. "June")
    const month: string = date.toLocaleDateString('en-GB', { month: 'long' });

    // Combine into final format
    const formattedDate: string = `${day}, ${dayWithSuffix} ${month}`;

    return formattedDate;
}

