import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

function EventCard({ event, expanded, setExpanded }) {
	const wrapperRef = useRef(null);
	const [visible, setVisible] = useState(false);
	const [hovered, setHovered] = useState(false);

	const isExpandable = Boolean(event.note);
	const isExpanded = expanded[event.title];

	useEffect(() => {
		const currentRef = wrapperRef.current;
		if (!currentRef) return;

		// If the element is already in the viewport when the component mounts, show it immediately.
		const rect = currentRef.getBoundingClientRect();
		if (rect.top < window.innerHeight && rect.bottom > 0) {
			setVisible(true);
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setVisible(true);
						observer.unobserve(entry.target);
					}
				});
			},
			{
				threshold: 0,
			},
		);

		observer.observe(currentRef);

		return () => {
			if (currentRef) observer.unobserve(currentRef);
		};
	}, []);

	const hoverTransform = hovered ? "translateY(-6px)" : "translateY(0)";
	const transformValue = visible ? hoverTransform : "translateY(30px)";

	return (
		<div
			ref={wrapperRef}
			style={{
				width: "100%",
				perspective: "1000px",
				willChange: "transform, opacity",
			}}
		>
			<button
				type="button"
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				onClick={() =>
					isExpandable &&
					setExpanded((prev) => ({
						...prev,
						[event.title]: !prev[event.title],
					}))
				}
				disabled={!isExpandable}
				style={{
					width: "100%",
					padding: "14px 18px",
					backgroundColor: "var(--btn-regular-bg)",
					borderRadius: 12,
					border: "1px solid var(--line-color)",
					textAlign: "left",
					fontFamily: "inherit",
					cursor: isExpandable ? "pointer" : "default",
					opacity: visible ? 1 : 0,
					transform: transformValue,
					boxShadow: hovered
						? "0 14px 30px rgba(0,0,0,0.15)"
						: "0 4px 10px rgba(0,0,0,0.08)",
					transition:
						"opacity 0.4s ease-out, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease",
					outline: "none",
				}}
			>
				<div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
					<div
						style={{
							fontWeight: 700,
							fontSize: 16,
							color: "var(--btn-content)",
						}}
					>
						{event.title}
					</div>
					<div style={{ fontWeight: 500, fontSize: 14, color: "var(--btn-content)", opacity: 0.75 }}>
						{event.result}
					</div>
				</div>

				{isExpandable && isExpanded && (
					<div
						style={{
							marginTop: 10,
							fontSize: 14,
							lineHeight: 1.6,
							borderTop: "1px solid var(--line-color)",
							paddingTop: 8,
							color: "var(--btn-content)",
						}}
					>
						{event.note}
					</div>
				)}
			</button>
		</div>
	);
}

EventCard.propTypes = {
	event: PropTypes.shape({
		title: PropTypes.string.isRequired,
		result: PropTypes.string.isRequired,
		note: PropTypes.string,
	}).isRequired,
	expanded: PropTypes.object.isRequired,
	setExpanded: PropTypes.func.isRequired,
};

export default EventCard;
