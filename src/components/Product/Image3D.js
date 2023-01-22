import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


export default function Image3D({ image }) {

  // try {
  //   const gltf = useLoader(
  //     GLTFLoader,
  //     `https://platformdev123.blob.core.windows.net/glb/${image}`
  //   );
    
  //   return (
  //     <>
  //       <primitive object={gltf.scene} scale={0.8} />
  //     </>
  //   );
  // } catch(err) {
  //   console.log("3D not found")
   
  //   return (
  //     <>
  //     </>
  //   );
  // }


  const gltf = useLoader(
    GLTFLoader,
    `https://platformdev123.blob.core.windows.net/glb/${image}`
  );
  
  return (
    <>
      <primitive object={gltf.scene} scale={0.8} />
    </>
  );

}
