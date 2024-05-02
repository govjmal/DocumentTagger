interface Props {
  allowMouseMove?: boolean;
  allowMouseUp?: boolean;
  children: React.ReactNode;
}

export default function EventSuppressedDiv({ children, allowMouseMove, allowMouseUp }: Props) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseMove={(e) => !allowMouseMove && e.stopPropagation()}
      onMouseUp={(e) => !allowMouseUp && e.stopPropagation()}>
      {children}
    </div>
  );
}
