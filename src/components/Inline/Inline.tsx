import "./Inline.scss";

interface InlineProps {
  nodes: React.ReactNode[];
}

const Inline = ({ nodes }: InlineProps) => (
  <div className="Inline-wrapper">
    {nodes.map((node, index) => (
      <div key={index}>{node}</div>
    ))}
  </div>
);

export { Inline };
