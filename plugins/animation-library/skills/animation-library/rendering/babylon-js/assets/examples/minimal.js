// Babylon.js minimal example — sphere + ground + camera + light
// CDN: https://cdn.babylonjs.com/babylon.js
// <script src="https://cdn.babylonjs.com/babylon.js"></script>
// <canvas id="renderCanvas" style="width:100%;height:100%"></canvas>

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const scene = new BABYLON.Scene(engine);

// Arc-rotate camera (orbit)
const camera = new BABYLON.ArcRotateCamera(
  "camera", -Math.PI / 2, Math.PI / 4, 10,
  BABYLON.Vector3.Zero(), scene
);
camera.attachControl(canvas, true);

// Hemispheric light
const light = new BABYLON.HemisphericLight(
  "light", new BABYLON.Vector3(0, 1, 0), scene
);
light.intensity = 0.9;

// Sphere
const sphere = BABYLON.MeshBuilder.CreateSphere(
  "sphere", { diameter: 2, segments: 32 }, scene
);
sphere.position.y = 1;

// Ground
BABYLON.MeshBuilder.CreateGround(
  "ground", { width: 6, height: 6 }, scene
);

engine.runRenderLoop(() => scene.render());
window.addEventListener("resize", () => engine.resize());
