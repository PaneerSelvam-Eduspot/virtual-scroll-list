import React, { useMemo, useRef, useState, useCallback, useLayoutEffect } from "react";
import Row from './Row';
import './VirtualizedList.css'; // Import CSS for VirtualizedList

export type VirtualizedListProps<T> = {
  items: T[];
  itemHeight: number;
  height: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  getKey?: (item: T, index: number) => React.Key;
  overscan?: number;
  onRangeChange?: (startIndex: number, endIndex: number) => void;
  className?: string;
  style?: React.CSSProperties;
};

export function VirtualizedList<T>(props: VirtualizedListProps<T>) {
  const {
    items,
    itemHeight,
    height,
    renderItem,
    getKey,
    overscan = 6,
    onRangeChange,
    className,
    style,
  } = props;

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const totalHeight = items.length * itemHeight;

  const onScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop((e.target as HTMLDivElement).scrollTop);
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
    if (onRangeChange) onRangeChange(startIndex, endIndex);
  }, [startIndex, endIndex, onRangeChange]);

  const visibleItems = useMemo(() => items.slice(startIndex, endIndex + 1), [items, startIndex, endIndex]);

  return (
    <div
      ref={scrollRef}
      className={className}
      onScroll={onScroll}
      style={{
        height,
        overflow: "auto",
        position: "relative",
        willChange: "transform",
        ...style,
      }}
      aria-label="Virtualized list scroller"
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, i) => {
            const index = startIndex + i;
            const key = getKey ? getKey(item, index) : index;
            return (
              <Row key={key} height={itemHeight}>
                {renderItem(item, index)}
              </Row>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default VirtualizedList;