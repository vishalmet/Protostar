import { Canvas } from "@react-three/fiber";
// import { EffectComposer, N8AO } from "@react-three/postprocessing";
import { ScrollControls, useProgress } from "@react-three/drei";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Experience } from "../components/Experience";
import { Loader } from "../components/Loader";
import {
  SocketManager,
  itemsAtom,
  roomIDAtom,
} from "../components/SocketManager";
import { UI } from "../components/UI";
import { useParams } from 'react-router-dom';

const Home = () => {
  const [roomID] = useAtom(roomIDAtom);
  const { userid } = useParams();
  const { progress } = useProgress();
  const [loaded, setLoaded] = useState(false);
  const [items] = useAtom(itemsAtom);

  useEffect(() => {
    if (userid) {
      localStorage.setItem('userid', userid);
      console.log("userid stored in localStorage: ", userid);
    }
  }, [userid]);

  useEffect(() => {
    if (progress === 100 && items) {
      setLoaded(true);
    }
  }, [progress]);
  return (
    <div className="h-screen">
      
        <SocketManager />
        <Canvas
          shadows
          camera={{
            position: [0, 8, 2],
            fov: 30,
          }}
        >
          <color attach="background" args={["#ffffff"]} />
          <ScrollControls pages={roomID ? 4 : 0}>
            <Experience loaded={loaded} />
          </ScrollControls>
          {/* Impact badly performances without a noticeable good result */}
          {/* <EffectComposer>
          <N8AO intensity={0.42} />
        </EffectComposer> */}
        </Canvas>
        <Loader loaded={loaded} />
        {loaded && <UI />}
      
    </div>
  );
};

export default Home;
