import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { AvaturnSDK } from "https://cdn.jsdelivr.net/npm/@avaturn/sdk/dist/index.js";

let scene, renderer, camera, stats, animationGroup;
let model, mixer, clock;
let currentAvatar;
let idleAction;

let cameraAngle = 0;
let cameraRadius = 5;
let isUserInteracting = false;
let transitionProgress = 0;

let controls;

// Create a loader element
const loaderElement = document.createElement('div');
loaderElement.style.position = 'absolute';
loaderElement.style.top = '50%';
loaderElement.style.left = '50%';
loaderElement.style.transform = 'translate(-50%, -50%)';
loaderElement.style.color = 'white';
loaderElement.style.fontSize = '34px';
loaderElement.style.display = 'none'; // Initially hidden
loaderElement.innerText = 'Loading...';
document.body.appendChild(loaderElement);

async function loadAvatar(url) {
  // Show the loader
  loaderElement.style.display = 'block';

  const loader = new GLTFLoader();
  const gltf = await loader.loadAsync(url);
  
  model = gltf.scene;
  scene.add(model);

  model.traverse(function (object) {
    if (object.isMesh) {
      object.castShadow = true;
      object.receiveShadow = true;
      object.material.envMapIntensity = 0.3;
      if (object.material.map && !object.material.name.includes("hair")) {
        object.material.map.generateMipmaps = false;
      }
    }
  });

  animationGroup.add(model);

  // Hide the loader after loading
  loaderElement.style.display = 'none';

  return model;
}

function filterAnimation(animation) {
  animation.tracks = animation.tracks.filter((track) => {
    const name = track.name;
    return name.endsWith("Hips.position") || name.endsWith(".quaternion");
  });
  return animation;
}

async function init() {
  const container = document.getElementById("container");

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);

  controls = new OrbitControls(camera, renderer.domElement);
  camera.position.set(cameraRadius, 2, 0);
  controls.target.set(0, 1, 0);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxPolarAngle = Math.PI / 2;
  controls.minDistance = 2;
  controls.maxDistance = 10;
  controls.update();

  controls.addEventListener("start", function () {
    isUserInteracting = true;
    transitionProgress = 0;
  });

  controls.addEventListener("end", function () {
    isUserInteracting = false;
  });

  clock = new THREE.Clock();
  animationGroup = new THREE.AnimationObjectGroup();
  mixer = new THREE.AnimationMixer(animationGroup);

  scene = new THREE.Scene();

  const textureLoader = new THREE.TextureLoader();
  textureLoader.load("https://res.cloudinary.com/dvddnptpi/image/upload/v1730821084/lislfmaibeoddcepehmr.avif", function (texture) {
    scene.background = texture;
  });

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
  hemiLight.position.set(0, 20, 0);
  scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xffffff);
  dirLight.position.set(3, 3, 5);
  dirLight.castShadow = true;
  dirLight.intensity = 3;
  scene.add(dirLight);

  new RGBELoader().load("public/brown_photostudio_01.hdr", (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
  });

  const groundColor = 0xD9C7B8;
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshPhongMaterial({ color: groundColor, depthWrite: false }));
  mesh.rotation.x = -Math.PI / 2;
  mesh.receiveShadow = true;
  scene.add(mesh);

  var modelUrl = "";
  var playerId = localStorage.getItem('address');
  try {
    const response = await fetch(`https://starkshoot.fun:2053/api/get-avatar/${playerId}`);
    
    if (!response.ok) {
      modelUrl = "public/default_model.glb";
      console.error("Error: No model found for this player ID.");
    }

    const data = await response.json();
    console.log(data);
    modelUrl = data.model_url;
  } catch (error) {
    modelUrl = "public/default_model.glb";
    console.error("Error fetching avatar model:", error);
  }
  if (modelUrl === undefined) {
    modelUrl = "public/default_model.glb";
  }
  console.log("modelUrl", modelUrl);

  currentAvatar = await loadAvatar(modelUrl);

  const loader = new GLTFLoader();
  loader.load("public/animation.glb", function (gltf) {
    const clip = filterAnimation(gltf.animations[0]);
    const action = mixer.clipAction(clip);
    idleAction = action;
    idleAction.play();
  });

  stats = new Stats();
  container.appendChild(stats.dom);

  window.addEventListener("resize", onWindowResize);
  animate();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  let mixerUpdateDelta = clock.getDelta();
  mixer.update(mixerUpdateDelta);

  cameraAngle += 0.002;
  const targetX = Math.sin(cameraAngle) * cameraRadius;
  const targetZ = Math.cos(cameraAngle) * cameraRadius;

  if (!isUserInteracting) {
    transitionProgress = Math.min(transitionProgress + 0.005, 1);
    const currentX = camera.position.x;
    const currentZ = camera.position.z;

    camera.position.x = THREE.MathUtils.lerp(currentX, targetX, transitionProgress);
    camera.position.z = THREE.MathUtils.lerp(currentZ, targetZ, transitionProgress);
    camera.lookAt(new THREE.Vector3(0, 1, 0));
  }

  stats.update();
  controls.update();
  renderer.render(scene, camera);
}

function openIframe() {
  initAvaturn();
  document.querySelector("#avaturn-sdk-container").hidden = false;
  document.querySelector("#buttonOpen").disabled = true;
}

function closeIframe() {
  document.querySelector("#avaturn-sdk-container").hidden = true;
  document.querySelector("#buttonOpen").disabled = false;
}

function initAvaturn() {
  const container = document.getElementById("avaturn-sdk-container");

  const subdomain = "demo";
  const url = `https://${subdomain}.avaturn.dev`;

  const sdk = new AvaturnSDK();
  sdk.init(container, { url }).then(() => {
    sdk.on("export", (data) => {
      const modelUrl = data.url;
      console.log("Exported model URL:", modelUrl);
      var player_id = localStorage.getItem('address');
      console.log(player_id, modelUrl);
      
      if (player_id) {
        storeAvatarModel(player_id, modelUrl);
      }

      loadAvatar(modelUrl).then((model) => {
        currentAvatar.visible = false;
        currentAvatar.removeFromParent();
        animationGroup.uncache(currentAvatar);
        animationGroup.remove(currentAvatar);

        currentAvatar = model;
      });
      closeIframe();
    });
  });
}

async function storeAvatarModel(player_id, modelUrl) {
  try {
    const response = await fetch("https://starkshoot.fun:2053/api/store-avatar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        player_id: player_id,
        model_url: modelUrl,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error storing avatar: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Model URL stored successfully:", result);
  } catch (error) {
    console.error("Failed to store avatar model URL:", error);
  }
}

await init();
closeIframe();
document.querySelector("#buttonOpen").addEventListener("click", openIframe);
document.querySelector("#buttonClose").addEventListener("click", closeIframe);

closeIframe();
document.querySelector("#buttonOpen").addEventListener("click", openIframe);
document.querySelector("#buttonClose").addEventListener("click", closeIframe);
