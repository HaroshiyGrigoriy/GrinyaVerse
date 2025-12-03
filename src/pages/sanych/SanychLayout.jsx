import SanychHeader from "./components/SanychHeader";
import SanychFooter from "./components/Sanychfooter";

import "../../pages/SanychPage.css";
export default function SanychLayout(){
  return (
    <div className="sanych-page">
    <SanychHeader></SanychHeader>
    <SanychFooter></SanychFooter>
    </div>
  );
}