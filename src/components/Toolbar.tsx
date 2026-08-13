import type { SortOption } from "../types/sortOption";

interface ToolbarProps {
  setTimeRange: (timeRange: string) => void;
  timeRange: string;
  title: string;
  sortBy: SortOption;
  setSortBy: (sortBy: SortOption) => void;
}

function Toolbar(props: ToolbarProps) {
  const buttonLabel =
    props.timeRange === "day" ? "Last 7 Days" : "Last 24 Hours";
  return (
    <aside className="flex justify-between items-center bg-primary text-white w-full p-3 md:p-5 drop-shadow-xl/25">
      <h1 className="tracking-[.3rem] uppercase">{props.title}</h1>
      <div className="flex gap-2">
        <div className="flex flex-col items-center">
          <button
            className=" text-white hover:text-secondary-dark hover:bg-white p-1.5 rounded text-center min-w-32 drop-shadow-xl/10 border text-xs"
            onClick={() =>
              props.setTimeRange(props.timeRange === "day" ? "week" : "day")
            }
          >
            Change Range to {buttonLabel}
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Toolbar;
