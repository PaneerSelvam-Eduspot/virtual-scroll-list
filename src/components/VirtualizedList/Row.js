import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import './Row.css'; // Import CSS for Row
const Row = React.memo(({ height, children }) => (_jsx("div", { className: "row", style: { height }, children: children })));
export default Row;
