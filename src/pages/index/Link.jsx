export default function Link(props) {
  return (
    <p className="text-xl text-white text-opacity-90">
      * {props.label}:{" "}
      <a
        href={props.link}
        target="_blank"
        className="text-blue-300 hover:underline select-none delay-1000"
      >
        {props.link}
      </a>
    </p>
  );
}
