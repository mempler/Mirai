import React, { Component } from "react";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import {ILeaderboardState, LoadMoreLeaderboard, UpdateLeaderboard} from "../../Actions/LeaderboardActions";
import FlagIcon from "../../Components/FlagIcon";
import I18n from "../../Components/I18n";
import {AVATAR_ENDPOINT, SiteStateStore} from "../../globals";
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

    public render() {
        const entries = [];

        for (let i = 0; i < this.props.Entries.length; i++) {
            const e = this.props.Entries[i];

            entries.push(
                <tr>
                    <td>
                        #{i + 1}
                    </td>
                    <td>
                        <FlagIcon code={e.Country} />
                        <Link to={"/u/" + e.Id}>
                            <div className="dropdown hoverable">
                                <span>{e.Username}</span>
                                <div className="dropdown-content">
                                    <img src={AVATAR_ENDPOINT + e.Id} alt="Avatar" />
                                </div>
                            </div>
                        </Link>
                    </td>
                    <td>
                        <b>{Math.round(e.Performance)}pp</b> ({NumberWithCommas(e.RankedScore)})
                    </td>
                    <td>
                        {Math.round(e.Performance * 100) / 100}%
                    </td>
                    <td>
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

                <div className="modeButtons">
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    <div className="btn" onClick={() => this.ChangeMode(0)}>{I18n.t("leaderboard_mode_osu")}</div>
                                </td>
                                <td>
                                    <div className="btn" onClick={() => this.ChangeMode(1)}>{I18n.t("leaderboard_mode_taiko")}</div>
                                </td>
                                <td>
                                    <div className="btn" onClick={() => this.ChangeMode(2)}>{I18n.t("leaderboard_mode_ctb")}</div>
                                </td>
                                <td>
                                    <div className="btn" onClick={() => this.ChangeMode(3)}>{I18n.t("leaderboard_mode_mania")}</div>
                                </td>
                            </tr>
                        </thead>
                    </table>
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
                                <td>
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
