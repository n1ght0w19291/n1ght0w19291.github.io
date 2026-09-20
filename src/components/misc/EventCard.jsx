import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

function EventCard({ event }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

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
    result: PropTypes.string,
    note: PropTypes.string,
  }).isRequired,
};

export default EventCard;
