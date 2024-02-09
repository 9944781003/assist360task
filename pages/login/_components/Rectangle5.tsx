import React from "react";
import { Image } from "react-bootstrap";
import WomenWithTab from "@/public/assets/images/women with tab 1.png";
import ThunderBolt from "@/public/assets/images/thunderbolt.jpg";
export default function Rectangle5() {
  return (
    <div
      style={{
        boxSizing: "border-box",
        width: "65%",
        height: "70%",
        background: "rgba(255, 255, 255, 0.21)",
        border: "1px solid rgba(255, 255, 255, 0.52)",
        backdropFilter: "blur(6.8px)",
        borderRadius: "46px",
      }}
    >
      <div className="h1 fw-bold text-white ms-5 mt-5">
        Very good <br />
        works are <br />
        waiting for <br />
        you Login <br />
        Now!!!
      </div>
      <Image
      style={{
        bottom: "25%",
        left: "-8%",
      }}
        className="position-absolute rounded-circle "
        src={ThunderBolt.src}
        fluid

        alt=""
        />

      <Image
        style={{ right: "-10%" }}
        className="position-absolute bottom-0 "
        src={WomenWithTab.src}
        fluid
        alt=""
      />
    </div>
  );
}
