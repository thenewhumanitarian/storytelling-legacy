import React, { useState } from "react";
// import "semantic-ui-css/semantic.min.css";
// import { Modal, Button } from "semantic-ui-react";
import "./key.css";

export const Key = () => {
  const [showSection, setShowSection] = useState(false);

  const row1 = [
    { icon: "truck icon" },
    { icon: "lightbulb icon" },
    { icon: "sync alternate icon" },
  ];

  const row2 = [
    { icon: "truck icon", color: "#2db487" },
    { icon: "lightbulb icon", color: "#f0781e" },
    { icon: "sync alternate icon", color: "#f0781e" },
  ];

  const row3 = [
    { icon: "truck icon" },
    { icon: "lightbulb icon" },
    { icon: "sync alternate icon" },
  ];

  const icons = [
    {
      icon: "truck icon",
      description:
        " All Direct Emissions from the activities of an organisation or under their control.",
    },
    {
      icon: "lightbulb icon",
      description:
        "Indirect Emissions from electricity purchased and used by the organisation.",
    },
    {
      icon: "sync alternate icon",
      description:
        "All Other Indirect Emissions from activities of the organisation, occuring from sources that they do not own or control.",
    },
  ];

  return (
    <div style={{ textAlign: "center", paddingTop: 20 }} className="key-card">
      <div className="content">
        <div style={{ paddingBottom: 20 }} className="header">
          Key for measuring methodologies:
        </div>
        <div style={{ fontWeight: "bolder" }}>Scopes for measurement</div>
        <div>
          <i
            style={{
              color: "gray",
            }}
            className="truck icon"
          ></i>

          <i
            style={{
              color: "gray",
              padding: 10,
              width: 25,
            }}
            className="lightbulb icon"
          ></i>
          <i
            style={{
              color: "gray",
            }}
            className="sync alternate icon"
          ></i>
        </div>
        <div style={{ fontWeight: "bolder", paddingTop: 20 }}>
          Sorting according to degrees of measurement
        </div>
        <div style={{ display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center", paddingTop:10}}>  
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "end",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <div>
                {row1.map(({ icon }) => {
                  return (
                    <i
                      style={{
                        color: "#2db487",
                      }}
                      class={icon}
                    ></i>
                  );
                })}
              </div>

              <div>most</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <div>
                {row2.map(({ icon, color }) => {
                  return (
                    <i
                      style={{
                        color: color,
                      }}
                      class={icon}
                    ></i>
                  );
                })}
              </div>

              <div>some*</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <div>
                {row3.map(({ icon }) => {
                  return (
                    <i
                      style={{
                        color: "#a03c50",
                      }}
                      class={icon}
                    ></i>
                  );
                })}
              </div>

              <div>none</div>
            </div>
          </div>
        </div></div>
        

        <button
          style={{
            margin: 15,
            backgroundColor: "white",
            borderStyle: "none",
            fontWeight: 700,
            cursor: 'pointer',
            // color: "#5199d0",
            fontSize: 13,
            fontFamily: 'Roboto, sans-serif'
          }}
          onClick={() => setShowSection(!showSection)}
        >
          {showSection ? <div>Hide...</div> : <div>See more...</div>}
        </button>
        {showSection ? (
          <div>
            <div style={{ fontSize: 10, lineHeight: 1.5, paddingBottom: 15 }}>
              * Methodolgy may be applied orgaisation wide or only apllicable to
              certain projects{" "}
            </div>
            {icons.map(({ icon, description }) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    textAlign: "left",
                    paddingBottom: 15,
                  }}
                >
                  <i
                    style={{
                      color: "gray",
                      marginRight: 10,
                    }}
                    class={icon}
                  ></i>
                  <div style={{ lineHeight: 1.5, fontSize: 10 }}>
                    {description}
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
  );
};
