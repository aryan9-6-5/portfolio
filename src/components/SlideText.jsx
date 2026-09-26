// The Meeko button hover: current label slides up out of a clipped window
// while an identical clone slides in from below. See animations.md §2C.
export default function SlideText({ children }) {
  return (
    <span className="slide-text">
      <span className="slide-text-inner">
        <span className="slide-text-item">{children}</span>
        <span className="slide-text-item" aria-hidden="true">{children}</span>
      </span>
    </span>
  )
}
