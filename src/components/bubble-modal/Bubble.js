import React, { useState } from "react";
// import "semantic-ui-css/semantic.min.css";
import { Modal, Button } from "semantic-ui-react";
// Useful to render HTML content from one Google Sheet field:
// https://www.npmjs.com/package/react-render-html
import renderHTML from "react-render-html";
// Trying use this library to make sure text fits into bubble
// https://github.com/kennethormandy/react-fittext
import FitText from "@kennethormandy/react-fittext";
/* Importint bubble.scss to make SASS available in there */
import "./bubble.scss";
import "../../css/animations.scss"
// import { drag } from "d3";

export const Bubble = (props) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
  };

  /* Using the data prop later for the bubble content */
  const { data, index } = props;

  const direct = (color) => (
    <i
      style={{
        color: color,
      }}
      className="truck icon"
    ></i>
  );

  const indirectNoControl = (color) => (
    <i
      style={{
        color: color,
      }}
      className="lightbulb icon"
    ></i>
  );

  const indirect = (color) => (
    <i
      style={{
        color: color,
      }}
      className="sync alternate icon"
    ></i>
  );

  return (
    <div>
      <div>
        {index % 2 === 0 ? (
          <button
            onClick={(id) => handleClick(id)}
            className={`floating ${data.color} bubble-${index}`}
            style={{
              backgroundColor: data.color.includes("#") ? data.color : "",
              fontSize: data.short_name.length > 4 ? "0.8rem" : "1rem",
            }}
          >
            <FitText minFontSize={12}>{data.short_name}</FitText>
          </button>
        ) : (
          <button
            onClick={(id) => handleClick(id)}
            className={`floating2 ${data.color} bubble-${index}`}
            style={{
              backgroundColor: data.color.includes("#") ? data.color : "",
              fontSize: data.short_name.length > 4 ? "0.8rem" : "1rem",
            }}
          >
            <FitText minFontSize={12}>{data.short_name}</FitText>
          </button>
        )}
      </div>

      {clicked ? (
        <Modal dimmer={'inverted'} style={{ paddingTop: 0, width: '90%'}} open={true}>
          <Modal.Header style={{ paddingLeft: '1rem' }}>
            <div style={{ display: "block" }}>
              <div style={{fontFamily: 'Roboto, sans-serif'}}>
                {data.full_name} ({data.short_name})
              </div>
              <div style={{ paddingLeft: '0' }}>{data.methodology}</div>
              <div style={{ paddingLeft: '0', paddingTop: '1rem' }}>
                {data.cat_transport === "1"
                  ? direct("#2db487")
                  : data.cat_offices === "0.5"
                  ? direct("#f0781e")
                  : direct("#a03c50")}
                {data.cat_supplychains === "1"
                  ? indirectNoControl("#2db487")
                  : data.cat_supplychains === "0.5"
                  ? indirectNoControl("#f0781e")
                  : indirectNoControl("#a03c50")}
                {data.cat_offices === "1"
                  ? indirect("#2db487")
                  : data.cat_offices === "0.5"
                  ? indirect("#f0781e")
                  : indirect("#a03c50")}
              </div>
            </div>
            <div style={{ paddingTop: 10 }}>
              {data.organisationWide !== "" ? (
                <span
                  style={{
                    color: "#aaa",
                    fontWeight: 400,
                    fontFamily: 'Roboto, sans-serif',
                  }}
                >
                  {" "}
                  Organisation-wide: {data.organisationWide}
                </span>
              ) : null}
            </div>
          </Modal.Header>
          <Modal.Content
            scrolling
            style={{ paddingLeft: '1rem', paddingTop: 0, height: 'auto' }}
            image={props.data.image !== ""}
          >
            <Modal.Description style={{overflowY: 'auto'}}>
              <p style={{ width: '100%' }}>
                {renderHTML(data.content)}
              </p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => setClicked(false)}>close</Button>
          </Modal.Actions>
        </Modal>
      ) : null}
    </div>
  );
};
