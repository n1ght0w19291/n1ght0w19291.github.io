import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

function formatDate(value) {
  if (!value) return "";

  const [year, month, day] = value.split("-");
  if (!year || !month) return value;

  return day
    ? `${Number(month)}月${Number(day)}日`
    : `${year}年${Number(month)}月`;
}

function formatRange(range) {
  if (!range?.start) return "";

  const start = formatDate(range.start);
  if (!range.end || range.start === range.end) return start;

  return `${start}～${formatDate(range.end)}`;
}

function formatPeriod(period) {
  if (period?.ranges?.length) {
    return period.ranges.map(formatRange).filter(Boolean).join("、");
  }

  if (!period?.start) return null;

  return formatRange(period);
}

function EventCard({ event }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const formattedPeriod = formatPeriod(event.period);
  const periodStart = event.period?.start ?? event.period?.ranges?.[0]?.start;

  useEffect(() => {
    const currentRef = cardRef.current;
    if (!currentRef) return undefined;

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return undefined;
    }

    const rect = currentRef.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.unobserve(entry.target);
      },
      { threshold: 0.08 }
    );

    observer.observe(currentRef);

    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      className={`event-card${visible ? " is-visible" : ""}`}
    >
      <div className="event-card__header">
        <h3>{event.title}</h3>
        {formattedPeriod && (
          <div className="event-card__period">
            <svg
              className="event-card__period-icon"
              aria-hidden="true"
              viewBox="0 0 16 16"
              fill="none"
            >
              <rect x="2" y="3.5" width="12" height="10" rx="2" />
              <path d="M5 2v3M11 2v3M2 6.5h12M5 9.5h.01M8 9.5h.01M11 9.5h.01" />
            </svg>
            <time dateTime={periodStart}>{formattedPeriod}</time>
          </div>
        )}
        {event.result && (
          <span className="event-card__result">
            <span aria-hidden="true" />
            {event.result}
          </span>
        )}
      </div>

      {event.note && <p className="event-card__note">{event.note}</p>}
    </article>
  );
}

EventCard.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    period: PropTypes.shape({
      start: PropTypes.string,
      end: PropTypes.string,
      precision: PropTypes.oneOf(["day", "month"]),
      ranges: PropTypes.arrayOf(
        PropTypes.shape({
          start: PropTypes.string.isRequired,
          end: PropTypes.string,
        })
      ),
    }),
    result: PropTypes.string,
    note: PropTypes.string,
  }).isRequired,
};

export default EventCard;
