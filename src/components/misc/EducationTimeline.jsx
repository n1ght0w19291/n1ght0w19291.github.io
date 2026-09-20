import PropTypes from "prop-types";

const educationData = [
  {
    id: "taipei-university",
    name: "臺北市立大學",
    englishName: "University of Taipei",
    department: "資訊科學系 大四",
    englishDepartment: "Department of Computer Science, 4th Year",
    status: "就讀中",
    period: "2023/09 - present",
    img: "/assets/images/school/UT.png",
  },
  {
    id: "zhongshan-girls-high-school",
    name: "臺北市立中山女子高級中學",
    englishName: "Taipei Municipal Zhong Shan Girls High School",
    department: "普通科 高中",
    status: "畢業",
    period: "2019/09 - 2022/06",
    img: "/assets/images/school/ZSGH.png",
  },
];

export const EducationCard = ({ edu, index }) => {
  const bgColor =
    index % 2 === 0 ? "var(--card-bg-light)" : "var(--card-bg-dark)";

  return (
    <div
      style={{
        display: "flex",
        gap: 30,
        alignItems: "center",
        padding: "16px 24px",
        borderRadius: 12,
        border: "1px solid var(--line-color)",
        backgroundColor: bgColor,
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "default",
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: 70,
          height: 70,
          borderRadius: 12,
          overflow: "hidden",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
        }}
      >
        <img
          src={edu.img}
          alt={edu.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <strong style={{ fontSize: 18, color: "var(--btn-content)" }}>
          {edu.name}
        </strong>
        <span style={{ fontSize: 15, color: "var(--btn-content)" }}>
          {edu.englishName}
        </span>
        <span
          style={{ fontSize: 14, color: "var(--btn-content)", opacity: 0.75 }}
        >
          {edu.department}
        </span>
        {edu.englishDepartment && (
          <span
            style={{ fontSize: 14, color: "var(--btn-content)", opacity: 0.75 }}
          >
            {edu.englishDepartment}
          </span>
        )}
        <span
          style={{ fontSize: 14, color: "var(--btn-content)", opacity: 0.75 }}
        >
          {edu.status}
        </span>
        <small
          style={{ fontSize: 13, color: "var(--btn-content)", opacity: 0.6 }}
        >
          {edu.period}
        </small>
      </div>
    </div>
  );
};

EducationCard.propTypes = {
  edu: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    englishName: PropTypes.string,
    department: PropTypes.string.isRequired,
    englishDepartment: PropTypes.string,
    status: PropTypes.string.isRequired,
    period: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export const EducationTimeline = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 32,
        maxWidth: 700,
        margin: "0 auto",
      }}
    >
      {educationData.map((edu, i) => (
        <EducationCard key={edu.id} edu={edu} index={i} />
      ))}
    </div>
  );
};
