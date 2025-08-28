import React from 'react';
import './Row.css'; // Import CSS for Row

const Row = React.memo(({ height, children }: { height: number; children: React.ReactNode }) => (
  <div className="row" style={{ height }}>
    {children}
  </div>
));

export default Row;