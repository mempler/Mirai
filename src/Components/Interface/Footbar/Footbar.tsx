import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import "./Footbar.sass";

class Footbar extends React.Component {
  public render() {
    return (
      <div className="Footer">
        <div id="footer">
          &copy; 2017 - {new Date().getFullYear()} MIT &bull;{" "}
          <a href="https://github.com/Gigamons">Github</a>
          <br /> <a href="https://mempler.de/">Mempler.de</a> &bull;{" "}
          <a href="https://jse.io/">JSE.io</a> &bull;{" "}
          <a href="https://p.datadoghq.com/sb/03868a281-7726fee3626d22dbcbb49dfb77cf85bb">
            Status
          </a>
        </div>

        <a
          className="discord"
          href="https://discord.gg/2pKjGec"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="discord">
            <FontAwesomeIcon className="discord-icon" icon={faDiscord} />
            <div className="discord-bg"></div>
          </div>
        </a>
      </div>
    );
  }
}

export default Footbar;
