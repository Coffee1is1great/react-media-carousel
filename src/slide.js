import React, { useRef, useState } from "react";
import Util from "./util";
import Button from "@mui/material/Button";
import Close from "@mui/icons-material/Close";
import ZoomableImage from "./zoomableImage";

export default function Slide(props) {
  const isMobile = Util.isMobile();
  const width = props.width ? props.width : 800;
  const height = props.height
    ? props.height
    : isMobile
    ? window.innerHeight - 150
    : 600;
  const theme = props.theme;
  const fontFamily = props.fontFamily ? props.fontFamily : "";
  const fontSize = props.fontSize ? props.fontSize : 16;
  const fontWeight = props.fontWeight ? props.fontWeight : "";
  const swipeThreshld = props.swipeThreshold;
  const [hover, setHover] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const hasAudio = props.audioSrc && props.audioSrc !== "";
  const hasContent =
    (props.title && props.title !== "") || (props.story && props.story !== "");
  const story = props.story ? props.story : "";

  const processBulletPoints = (text) => {
    const bulletPoints = text.split("&bull;").map((point, index, array) => (
      <React.Fragment key={index}>
        {point.trim()} {/* Trim to remove extra whitespaces */}
        {index < array.length - 1 && <span>&bull; </span>}
      </React.Fragment>
    ));

    return bulletPoints;
  };

  const title = (
    <div
      style={{ height: "20%", color: theme === "dark" ? "white" : "black" }}
      className="aligner"
    >
      <div style={{ width: "100%" }}>
        <h2>{props.title}</h2>
      </div>
    </div>
  );
  const media = props.mediaType ? (
    props.mediaType === "photo" ? (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ height: isMobile && hasAudio ? "70%" : "100%" }}>
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ZoomableImage
                style={{
                  width: "100%",
                  maxHeight: isMobile
                    ? hasAudio
                      ? props.height / 2 - 100
                      : props.height / 2 - 10
                    : props.height - 120,
                  display: "block",
                  objectFit: "cover",
                }}
                src={props.src}
              />
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {props.audioSrc ? (
                <audio
                  style={{
                    position: "absolute",
                    bottom: 5,
                    width: isMobile ? width : "100%",
                  }}
                  controls
                  src={props.audioSrc}
                  onEnded={() => {
                    if (props.onAudioEnd) {
                      props.onAudioEnd();
                    }
                  }}
                  ref={(component) => {
                    if (component) {
                      if (props.setActiveAudioPlayer) {
                        props.setActiveAudioPlayer(component);
                      }
                    }
                  }}
                ></audio>
              ) : isMobile ? (
                <div style={{ height: 54 }} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    ) : (
      <video
        disablePictureInPicture
        controlsList="timeline volume nodownload noplaybackrate nofullscreen"
        onEnded={() => {
          if (props.onVideoEnd) {
            props.onVideoEnd();
          }
        }}
        muted={false}
        preload="metadata"
        controls
        ref={(component) => {
          if (component) {
            if (props.setActivePlayer) {
              props.setActivePlayer(component);
            }
          }
        }}
        width={"100%"}
        style={{
          maxWidth: width,
        }}
        // height={
        //   Screen.isMobile()
        //     ? window.innerHeight -
        //       (props.caption && props.caption !== "" ? 200 : 150)
        //     : window.innerHeight - 250
        // }
      >
        <source src={props.src + "#t=0.001"} />
      </video>
    )
  ) : (
    <ZoomableImage
      style={{
        width: "100%",
        maxHeight: isMobile
          ? hasAudio
            ? props.height / 2 - 100
            : props.height / 2 - 10
          : props.height - 120,
        display: "block",
        objectFit: "cover",
      }}
      src={props.src}
    />
  );

  const nextButton = props.showNextButton ? (
    props.nextButton ? (
      <div
        style={{ height: 45 }}
        onClick={() => {
          if (props.onSwipeLeft) {
            props.onSwipeLeft();
          }
        }}
      >
        {props.nextButton}
      </div>
    ) : (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        <Button
          style={{
            backgroundColor: hover
              ? props.theme === "dark"
                ? "white"
                : "black"
              : "transparent",
            borderRadius: 6,
            height: 45,
            width: "80%",
            textShadow: "0 0 black",
            fontWeight: "bold",
            border: props.theme === "dark" ? "white" : "black",
            borderStyle: "solid",
            borderWidth: 1,
            whiteSpace: "nowrap",
            textTransform: "none",
          }}
          variant="contained"
          title="Next"
          onMouseEnter={() => {
            setHover(true);
          }}
          onMouseLeave={() => {
            setHover(false);
          }}
          onClick={() => {
            if (props.onSwipeLeft) {
              props.onSwipeLeft();
            }
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: hover
                ? props.theme === "dark"
                  ? "black"
                  : "white"
                : props.theme === "dark"
                ? "white"
                : "black",
              width: "100%",
            }}
          >
            <div style={{ marginTop: 5, marginLeft: 10, fontSize: 14 }}>
              {props.nextButtonText ? props.nextButtonText : "Next"}
            </div>
          </div>
        </Button>
      </div>
    )
  ) : null;

  return (
    <div
      style={{
        background: theme === "dark" ? "#212121" : "white",
        borderRadius: 15,
        width: width,
        height: height,
        display: "flex",
        justifyContent: "left",
        position: "relative",
      }}
      onClick={(ev) => {
        ev.preventDefault();
        ev.stopPropagation();
      }}
      onTouchStart={(e) => {
        if (e.touches.length === 0) {
          return;
        }
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchMove={(e) => {
        if (e.touches.length === 0) {
          return;
        }
        touchEndX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        const swipeThreshold = swipeThreshld ? swipeThreshld : 50; // You can adjust this value based on your preference

        const deltaX = touchEndX.current - touchStartX.current;

        if (deltaX > swipeThreshold) {
          // Swipe right
          if (props.onSwipeRight) {
            props.onSwipeRight();
          }
        } else if (deltaX < -swipeThreshold) {
          // Swipe left
          if (props.onSwipeLeft) {
            props.onSwipeLeft();
          }
        }
      }}
    >
      <Close
        style={{
          cursor: "pointer",
          color: theme === "dark" ? "white" : "black",
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 2,
        }}
        onClick={() => {
          if (props.onClose) {
            props.onClose();
          }
        }}
      />
      {isMobile ? (
        <React.Fragment>
          <div style={{ width: "100%" }}>
            {/* Title & Media */}
            <div
              style={{
                width: "100%",
                height: hasContent ? "50%" : "100%",
                background: theme === "dark" ? "#303030" : "#f8f8f8",
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                borderBottomLeftRadius: hasContent ? 0 : 15,
                borderBottomRightRadius: hasContent ? 0 : 15,
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ height: "100%" }}>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {media}
                </div>
              </div>
            </div>
            <div
            // style={{
            //     height: Util.isMobile() && hasAudio ? "70%" : "100%"
            // }}
            >
              <div
                style={{
                  width: "100%",
                  height: "20%",
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                  margin: 10,
                }}
              >
                {title}
              </div>
              <div
                style={{
                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 10,
                  marginBottom: 30,
                  height:
                    (isMobile ? height / 2.8 : height / 2 - 75) -
                    (props.showNextButton ? 60 : 0),
                  overflowY: "auto",
                  color: props.theme === "dark" ? "white" : "black",
                  wordBreak: "break-word",
                  fontSize: fontSize,
                  fontWeight: fontWeight,
                  fontFamily: fontFamily,
                }}
              >
                {story.split("\n").map((line, index) => (
                  <React.Fragment key={index}>
                    {processBulletPoints(line)}
                    {index !== story.split("\n").length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
              {nextButton}
            </div>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div
            style={{
              width: hasContent ? "60%" : "100%",
              background: theme === "dark" ? "#303030" : "#f8f8f8",
              borderTopLeftRadius: 15,
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: hasContent ? 0 : 15,
              borderTopRightRadius: hasContent ? 0 : 15,
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {media}
          </div>
          <div style={{ width: hasContent ? "3%" : "0%" }} />
          <div
            style={{
              width: hasContent ? "35%" : "0%",
              background: "transparent",
              borderTopRightRadius: 15,
              borderBottomRightRadius: 15,
              position: "relative",
            }}
          >
            <div
              style={{
                height: "20%",
                color: theme === "dark" ? "white" : "black",
              }}
              className="aligner"
            >
              <div style={{ width: "100%" }}>
                <h2>{props.title}</h2>
              </div>
            </div>
            <div style={{ height: "100%" }}>
              <div
                style={{
                  height: props.showNextButton ? "70%" : "75%",
                  color: theme === "dark" ? "white" : "black",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    fontSize: fontSize,
                    fontWeight: fontWeight,
                    fontFamily: fontFamily,
                    overflow: "auto",
                    maxHeight: height - (props.showNextButton ? 200 : 150),
                    minHeight: height - (props.showNextButton ? 200 : 150),
                    wordBreak: "break-word",
                    marginBottom: 20,
                  }}
                >
                  {story.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {processBulletPoints(line)}
                      {index !== story.split("\n").length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              {nextButton}
            </div>
          </div>
          <div style={{ width: hasContent ? "2%" : "0%" }} />
        </React.Fragment>
      )}
    </div>
  );
}
