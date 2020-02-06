import React from 'react';
import {getPlayersData, PlayersDataObserver} from '../services/getPlayersData';
import {Player} from "../interfaces/players";
import {PlayerDetails} from './PlayerDetails';

interface PlayerInfoState {
    playersInfo: Player []
    randomPlayers: Player []
    players_set: string []
    count: number
    isWinner: string | undefined 
    isLooser: string | undefined 
    showFppg: boolean
}

interface PlayerInfoProps {
}

export default class PlayerList extends React.Component<PlayerInfoProps, PlayerInfoState> implements PlayersDataObserver {

    constructor(props: PlayerInfoProps, state: PlayerInfoState) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);

        this.state = {
            playersInfo: [] as Player[],
            randomPlayers: [] as Player[],
            players_set: [],
            count: 0,
            isWinner: undefined,
            isLooser: undefined,
            showFppg: false
        }

    }

    componentDidMount() {
        getPlayersData(this);
    }

    showPlayersData = (results: Player []) => {
        if (this.state.playersInfo) {
            this.setState({
                playersInfo: results
            }, () => this.selectRandomPlayers())
        }
    }

    showError = () => {
        console.log("error");
        return (
            <div>Page Not Found</div>
        );
    }

    message = (count: number) => `You have guessed correct Player ${count} times.`

    selectRandomPlayers = () => {
        let selectedPlayers: Player[] = [];
        let playerIds: string [] = [];
        let playerKey: string
        const COUNT = 2;

        if (this.state.count === 10 ) {
            this.resetState()
        }

        for (let i = 0; i < COUNT; i++) {
            selectedPlayers = this.getRandomValues(selectedPlayers);
        }
        console.log('selectedPlayers', selectedPlayers);
        playerIds = selectedPlayers.map((selected) => selected.id);
        playerKey = playerIds.sort((id1, id2) => id1 > id2 ? 1 : -1).join('');

        if (this.state.players_set.indexOf(playerKey) !== -1) {
            this.selectRandomPlayers();
        } else {
            this.state.players_set.push(playerKey);
        }

        this.setState({
            showFppg: false,
            isWinner: undefined,
            randomPlayers: selectedPlayers,
            isLooser: undefined
        })
    }

    getRandomValues = (player: Player[]) => {
        let value: Player = this.state.playersInfo[Math.floor(Math.random() * this.state.playersInfo.length)];

        if (player.indexOf(value) === -1) {
            player.push(value);
        } else {
            this.getRandomValues(player);
        }

        return player;
    }

    clickHandler = (player_id: string): void => {
        let result: Player []

        let maxFppg: number = Math.max(this.state.randomPlayers[0].fppg, this.state.randomPlayers[1].fppg)
        result = this.state.randomPlayers.filter((pl) => pl.id === player_id ? pl.id : undefined)

        if (!this.state.showFppg) {
            if (result[0].fppg === maxFppg) {
                this.setState({
                    count: this.state.count + 1,
                    isWinner: result[0].id,
                    isLooser: 'UNKNOWN',
                    showFppg: true
                })
            } else {
                this.setState({
                    isWinner: 'UNKNOWN',
                    isLooser: result[0].id,
                    showFppg: true
                })
            }
        }
    }

    resetState = () => {
        this.setState({
            playersInfo: [] as Player[],
            randomPlayers: [] as Player[],
            players_set: [],
            count: 0,
            isWinner: undefined,
            isLooser: undefined,
            showFppg: false
        })
    }

    showConfirmation = () => {
        return (
            <h3> Congratulations! You have Successfully Completed the Quiz!!! </h3>
        )
    }

    displayPlayers = () => {
        if (this.state.randomPlayers.length > 0) {
            return (
                <>
                    <div className={'container'}>
                    {this.state.count === 10 ? this.showConfirmation() : null}
                        {
                            this.state.randomPlayers.map((player: Player) => {
                                    return (
                                        <PlayerDetails
                                            key = {player.id}
                                            player={player}
                                            showFppg={this.state.showFppg}
                                            onSelection={this.clickHandler}
                                            isWinner={this.state.isWinner}
                                            isLooser={this.state.isLooser}
                                        >
                                        </PlayerDetails>
                                    )
                                }
                            )}
                    </div>
                    <button className={'btn'} onClick={this.selectRandomPlayers}> 
                        {this.state.count === 10 ? 'Play Again' :'Next'}
                    </button>
                    <p className={'msg'}> {this.state.showFppg ? this.message(this.state.count) : null} </p>
                </>
            );
        } else {
            return this.showError()
        }

    }

    render() {
        return (
            <div>
                <h4> Guess which player has higher FanDuel Points Per Game (FPPG) ?</h4>
                <div>
                    {this.displayPlayers()}
                </div>
            </div>
        )
    }
}

