import ActivityCalendar from "react-activity-calendar";
import ReactTooltip from "react-tooltip";
import { DataContributions } from "../lib/calendar/calendar";
import styles from "./calendar.module.css";

const CONTRIBUTIONS_COLOR: string = "#f973";

interface Props {
  contributions: DataContributions[];
}

const MyCalendar = ({ contributions }: Props): JSX.Element => {
  return (
    <div className={styles.calendar}>
      <ActivityCalendar
        data={contributions}
        color={CONTRIBUTIONS_COLOR}
        labels={{
          legend: {
            less: "Less",
            more: "More",
          },
          months: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          tooltip: "<strong>{{count}} contributions</strong> on {{date}}",
          totalCount: "{{count}} contributions this year",
          weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        }}
        weekStart={1}
      >
        <ReactTooltip html />
      </ActivityCalendar>
    </div>
  );
};

export default MyCalendar;
