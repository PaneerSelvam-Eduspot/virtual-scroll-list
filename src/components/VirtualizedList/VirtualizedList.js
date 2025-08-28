import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo, useRef, useState, useCallback, useLayoutEffect } from "react";
import Row from './Row';
import './VirtualizedList.css'; // Import CSS for VirtualizedList
export function VirtualizedList(props) {
    const { items, itemHeight, height, renderItem, getKey, overscan = 6, onRangeChange, className, style, } = props;
    const scrollRef = useRef(null);
    const [scrollTop, setScrollTop] = useState(0);
    const totalHeight = items.length * itemHeight;
    const onScroll = useCallback((e) => {
        setScrollTop(e.target.scrollTop);
    }, []);
    const { startIndex, endIndex, offsetY } = useMemo(() => {
        const rawStart = Math.floor(scrollTop / itemHeight) - overscan;
        const start = Math.max(0, rawStart);
        const visibleCount = Math.ceil(height / itemHeight);
        const end = Math.min(items.length - 1, start + visibleCount + overscan * 2 - 1);
        const y = start * itemHeight;
        return { startIndex: start, endIndex: end, offsetY: y };
    }, [scrollTop, itemHeight, height, overscan, items.length]);
    useLayoutEffect(() => {
        if (onRangeChange)
            onRangeChange(startIndex, endIndex);
    }, [startIndex, endIndex, onRangeChange]);
    const visibleItems = useMemo(() => items.slice(startIndex, endIndex + 1), [items, startIndex, endIndex]);
    return (_jsx("div", { ref: scrollRef, className: className, onScroll: onScroll, style: {
            height,
            overflow: "auto",
            position: "relative",
            willChange: "transform",
            ...style,
        }, "aria-label": "Virtualized list scroller", children: _jsx("div", { style: { height: totalHeight, position: "relative" }, children: _jsx("div", { style: { transform: `translateY(${offsetY}px)` }, children: visibleItems.map((item, i) => {
                    const index = startIndex + i;
                    const key = getKey ? getKey(item, index) : index;
                    return (_jsx(Row, { height: itemHeight, children: renderItem(item, index) }, key));
                }) }) }) }));
}
export default VirtualizedList;
