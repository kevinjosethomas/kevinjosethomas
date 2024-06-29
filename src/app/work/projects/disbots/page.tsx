import Project from "../components/Project";

export default function Disbots() {
  return (
    <Project name="disbots.gg" image="disbots.png" banner="disbots.png">
      <iframe
        width="1024"
        height="576"
        src="https://www.youtube.com/embed/XCjmf23Ef0w?si=wV-RSw1sGmJM6acg"
        title="disbots.gg Trailer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </Project>
  );
}
