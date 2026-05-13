import Icon from "./Icon.jsx";
import { showToast } from "./Toast.jsx";

export default function UploadZone({ hint = "Drag files or click to upload", onClick }) {
  return (
    <button type="button" className="upload-zone" onClick={onClick || (() => showToast("Upload — demo only"))}>
      <Icon name="doc" size={28} />
      <span className="upload-zone-hint">{hint}</span>
    </button>
  );
}
