interface ToolbarProps {
  setTimeRange: (timeRange: string) => void;
  timeRange: string;
  title: string;
  view: "table" | "map";
  setView: (view: "table" | "map") => void;
}

function Toolbar(props: ToolbarProps) {
  const buttonLabel =
    props.timeRange === "day" ? "Last 7 Days" : "Last 24 Hours";
  return (
    <aside className="flex md:fixed justify-between items-center bg-primary text-white w-full p-3 md:p-5 drop-shadow-xl/25">
      <h1 className="tracking-[.3rem] uppercase">{props.title}</h1>
      <div className="flex gap-2">
        <div className="flex items-center space-x-2">
          <button
            className="text-white hover:text-secondary-dark hover:bg-white p-1.5 rounded text-center min-w-32 drop-shadow-xl/10 border text-xs"
            onClick={() => {
              props.setTimeRange(props.timeRange === "day" ? "week" : "day");

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            Change Range to {buttonLabel}
          </button>
          <button
            className="text-white hover:text-secondary-dark hover:bg-white p-1.5 rounded text-center min-w-22 drop-shadow-xl/10 border text-xs"
            onClick={() =>
              props.setView(props.view === "table" ? "map" : "table")
            }
          >
            {props.view === "table" ? "View Map" : "View Table"}
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Toolbar;
