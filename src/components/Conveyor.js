// A row of items that slowly scrolls left forever, like a conveyor belt.
// The items are repeated until one "loop" is long enough to fill a wide screen,
// then that loop is rendered twice. The CSS animation slides the track left by
// exactly one loop (-50%) and restarts, so the join is invisible.
// Hovering pauses it so items are easy to click.
//
// Props:
//   items          array of objects with an `id`
//   renderItem     function (item) => JSX for one item
//   itemWidth      width of each item in px
//   secondsPerItem how long one item takes to pass (bigger = slower)
function Conveyor({ items, renderItem, itemWidth = 300, secondsPerItem = 7, minPerLoop = 6 }) {
  let loop = [];
  while (items.length > 0 && loop.length < minPerLoop) loop = [...loop, ...items];

  return (
    <div className="conveyor">
      <div className="conveyor-track" style={{ animationDuration: `${loop.length * secondsPerItem}s` }}>
        {[0, 1].map((copy) =>
          loop.map((item, i) => (
            // Only the first copy is read out by screen readers; the rest are visual repeats.
            <div
              className="conveyor-item"
              style={{ width: itemWidth }}
              key={`${copy}-${i}-${item.id}`}
              aria-hidden={copy === 1 || i >= items.length}
            >
              {renderItem(item)}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Conveyor;
