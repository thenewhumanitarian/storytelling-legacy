import { Steps } from "./Steps";
import image from "./images/Asset 1.svg";
import image2 from "./images/Asset 2.svg";  //if this is going in the google spreadsheets how do you autamatically import


function InfographicStepsComponent() {

  const items = [
    { image: image2, title: "title1", description: "description 1" },
    { image: image, title: "title1", description: "description 2" },
    { image: image2, title: "title1", description: "description 3" },
    { image: image, title: "title1", description: "description 4" },
  ];


  return (
    <div className="App">
      <Steps items={items} />
    </div>
  );
}

export default InfographicStepsComponent;
