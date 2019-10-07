import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import "./Footbar.scss";

class Footbar extends React.Component {
  public render() {
    return (
      <div className="Footer">
        <div id="footer">
          <a href="https://discord.gg/pZBpFjA" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon className="discord" icon={faDiscord} />
          </a>
          &copy; 2017 - {(new Date()).getFullYear()} MIT &bull; <a href="https://github.com/Gigamons">Github</a><br /> <a href="https://mempler.de/">Mempler.de</a> &bull; <a href="https://jse.io/">JSE.io</a> &bull; <a href="https://p.datadoghq.com/sb/03868a281-7726fee3626d22dbcbb49dfb77cf85bb">Status</a>
        </div>
      </div>
    );
  }
}

export default Footbar;
