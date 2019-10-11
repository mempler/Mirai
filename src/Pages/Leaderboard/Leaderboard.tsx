import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ILeaderboardState, LoadMoreLeaderboard, UpdateLeaderboard } from "../../Actions/LeaderboardActions";
import FlagIcon from "../../Components/FlagIcon";
import I18n from "../../Components/I18n";
import { AVATAR_ENDPOINT, SiteStateStore } from "../../globals";
import { GetLevelByTotalScore } from "../../Utils/LevelUtility";
import { NumberWithCommas } from "../../Utils/StringUtils";
import "./Leaderboard.sass";

class Leaderboard extends Component<ILeaderboardState> {
    public EntryCount = 0;
    public Mode = 0;

    public LoadMore = async () => {
        this.EntryCount += 50;
        SiteStateStore.dispatch(await LoadMoreLeaderboard(this.Mode, this.EntryCount));
    }

    public ChangeMode(m: number) {
        this.Mode = m;
        this.EntryCount = 0;

        UpdateLeaderboard(this.Mode, this.EntryCount).then(SiteStateStore.dispatch);
    }

    public componentDidMount() {
        this.ChangeMode(0);
    }

    public MouseHover(id: number, e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>) {
        const avatar = document.getElementById("LBAvatar") as HTMLImageElement | null;
        if (avatar == null) {
            return;
        }
        avatar.src = AVATAR_ENDPOINT + "/" + id;

        avatar.style.left = (e.clientX - 64 / 2) + "px";
        avatar.style.top = (e.clientY - 128 * 2) + "px";
        avatar.style.display = "block";
    }

    public MouseLeave(e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>) {
        const avatar = document.getElementById("LBAvatar") as HTMLImageElement | null;
        if (avatar == null) {
            return;
        }
        avatar.style.display = "none";
    }

    public render() {
        const entries = [];

        this.props.Entries.sort((x, y) => x.Performance > y.Performance ? -1 : 0);

        for (let i = 0; i < this.props.Entries.length; i++) {
            const e = this.props.Entries[i];

            entries.push(
                <tr>
                    <td>
                        #{i + 1}
                    </td>
                    <td onMouseLeave={this.MouseLeave} onMouseMove={(ev) => this.MouseHover(e.Id, ev)}>
                        <div style={{ width: "100%", height: "100%" }}>
                            <FlagIcon code={e.Country} />
                            <Link
                                id={e.Id + ""}
                                to={"/u/" + e.Id}>
                                <span>{e.Username}</span>
                            </Link>
                        </div>

                    </td>
                    <td>
                        <b>{Math.round(e.Performance)}pp</b> ({NumberWithCommas(e.RankedScore)})
                    </td>
                    <td>
                        {Math.round(e.Accuracy * 10000) / 100}%
                    </td>
                    <td className="PlayCount">
                        {NumberWithCommas(e.PlayCount)} (lv. {GetLevelByTotalScore(e.TotalScore)})
                    </td>
                </tr>,
            );
        }

        return (
            <div className="leaderboard">
                <br />
                <h1>{I18n.t("leaderboard")}</h1>
                <h2>{I18n.t("leaderboard_desc")}</h2>
                <br />

                <img style={{ display: "none", width: 128, height: 128, position: "absolute", zIndex: 50000000000 }} id="LBAvatar" alt="Avatar" />
                <div className="modeButtons">
                    <div className="btn" onClick={() => this.ChangeMode(0)}>{I18n.t("leaderboard_mode_osu")}</div>
                    <div className="btn" onClick={() => this.ChangeMode(1)}>{I18n.t("leaderboard_mode_taiko")}</div>
                    <div className="btn" onClick={() => this.ChangeMode(2)}>{I18n.t("leaderboard_mode_ctb")}</div>
                    <div className="btn" onClick={() => this.ChangeMode(3)}>{I18n.t("leaderboard_mode_mania")}</div>
                </div>

                <div className="lb">
                    <table>
                        <thead>
                            <tr className="columns">
                                <td>
                                    {I18n.t("leaderboard_position")}
                                </td>
                                <td>
                                    {I18n.t("leaderboard_player")}
                                </td>
                                <td>
                                    {I18n.t("leaderboard_performance")}
                                </td>
                                <td>
                                    {I18n.t("leaderboard_accuracy")}
                                </td>
                                <td className="PlayCount">
                                    {I18n.t("leaderboard_playcount")}
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {entries}
                        </tbody>
                    </table>

                    <div className="btn cntr" onClick={() => { this.LoadMore(); }}>{I18n.t("load_more")}</div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state: any) => (state.LeaderboardReducer),
)(Leaderboard);
