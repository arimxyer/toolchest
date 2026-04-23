import { useRive, StateMachineInput } from '@rive-app/react-canvas';

/**
 * Minimal Rive example: loads a .riv file, plays a state machine,
 * and exposes a trigger input to drive transitions at runtime.
 *
 * Requires: npm install @rive-app/react-canvas
 */
export default function RiveHero() {
  const { RiveComponent, rive } = useRive({
    src: '/animations/hero.riv',   // path to your .riv file
    stateMachines: 'MainSM',       // state machine name set in the Rive editor
    autoplay: true,
  });

  function handleClick() {
    if (!rive) return;
    // stateMachineInputs returns Trigger | Boolean | Number inputs
    const inputs: StateMachineInput[] = rive.stateMachineInputs('MainSM');
    const trigger = inputs.find((i) => i.name === 'Tap');
    trigger?.fire();
  }

  return (
    <div style={{ width: 400, height: 300 }}>
      {/* RiveComponent renders a <canvas> sized to its container */}
      <RiveComponent onClick={handleClick} style={{ cursor: 'pointer' }} />
    </div>
  );
}
