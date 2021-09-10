import React, { useState } from "react";


export const Steps = (props) => {
  const {items}= props
  const [currentItemIndex, setCurrentItemIndex] = useState(0);


  const handleNext = () => {
    setCurrentItemIndex(currentItemIndex + 1);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {items
        .filter((item, index) => currentItemIndex >= index)
        .map((item, index) => (
          <div>
            {index % 2 === 0 ? (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img alt="img" src={item.image} />
                <div>
                  <div>{item.title}</div>
                  <div>{item.description}</div>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>
                  <div>{item.title}</div>
                  <div>{item.description}</div>
                </div>
                <img alt="img" src={item.image} />
              </div>
            )}
            <button onClick={handleNext}>next</button>
          </div>
        ))}
        <button onClick={()=> setCurrentItemIndex(0)}>close</button>
    </div>
  );
};
