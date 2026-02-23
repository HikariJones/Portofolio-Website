import './logo-loop.css';

function LogoLoop({ items, duration = 22 }) {
  const loopItems = [...items, ...items];

  return (
    <div className="logo-loop" aria-label="Skills logo loop">
      <div className="logo-loop-track" style={{ animationDuration: `${duration}s` }}>
        {loopItems.map((item, index) => (
          <div key={`${item.name}-${index}`} className="logo-loop-item">
            <i className={`${item.prefix ?? 'fab'} ${item.icon}`} aria-hidden="true" />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogoLoop;
