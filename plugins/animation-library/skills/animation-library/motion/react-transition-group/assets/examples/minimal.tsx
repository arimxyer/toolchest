// Legacy usage: CSSTransition on a toggled element.
// Context: maintaining an existing codebase that already imports react-transition-group.
// For new code, use Motion's <AnimatePresence> instead.

import { useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './fade.css'; // see comment below

export function LegacyFadeToggle() {
  const [show, setShow] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null); // nodeRef required in React 18+

  return (
    <div>
      <button onClick={() => setShow(v => !v)}>
        {show ? 'Hide' : 'Show'}
      </button>

      <CSSTransition
        in={show}
        timeout={300}
        classNames="fade"
        unmountOnExit
        nodeRef={nodeRef}
      >
        <div ref={nodeRef} style={{ marginTop: 16 }}>
          Toggled content — animates in/out via CSS classes.
        </div>
      </CSSTransition>
    </div>
  );
}

/*
fade.css — the library applies these classes; all animation is in CSS:

.fade-enter        { opacity: 0; }
.fade-enter-active { opacity: 1; transition: opacity 300ms ease-in; }
.fade-exit         { opacity: 1; }
.fade-exit-active  { opacity: 0; transition: opacity 300ms ease-in; }
*/
