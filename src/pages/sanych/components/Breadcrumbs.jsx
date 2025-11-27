import { Link, useParams } from "react-router-dom";

export default function Breadcrumbs({ module }) {
  const { sectionId, topicId } = useParams();
  return (
    <nav className="breadcrumbs">
      <Link to="/sanych" className="link">Саныч</Link>
      <span> / </span>
      <Link to={`/sanych/${module.id}`} className="link">{module.title}</Link>
      {sectionId && <>
        <span> / </span>
        <Link to={`/sanych/${module.id}/${sectionId}`} className="link">{titleOf(module, sectionId)}</Link>
      </>}
      {topicId && <>
        <span> / </span>
        <span className="crumb--current">{titleOf(module, sectionId, topicId)}</span>
      </>}
    </nav>
  );
}

function titleOf(module, sectionId, topicId) {
  const sec = module.sections.find(s => s.id === sectionId);
  if (!sec) return "";
  if (!topicId) return sec.title;
  const topic = (sec.topics || []).find(t => t.id === topicId);
  return topic ? topic.title : "";
}
