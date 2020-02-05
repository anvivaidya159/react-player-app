import React from 'react';
import { getPlayersData, PlayersDataObserver } from '../services/getPlayersData';
import { Players, Player } from "../interfaces/players";
import { type } from 'os';
import { PlayerDetails } from './PlayerDetails';

interface PlayerInfoState {
    playersInfo: Player []
    randomPlayers: Player []
    players_set: string []
    count: number
    isMaxFppgPlayer: boolean | undefined
    showFppg: boolean
}

interface PlayerInfoProps {
}

export type Result = {
    id: string,
    fppg: number,
    isWinner: boolean
}

// PlayerListProps, PlayerListState
export default class PlayerList extends React.Component<PlayerInfoProps,PlayerInfoState> implements PlayersDataObserver {

constructor(props: PlayerInfoProps, state: PlayerInfoState) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    
    this.state = {
        playersInfo: [] as Player[],
        randomPlayers: [] as Player[],
        players_set: [],
        count: 0,
        isMaxFppgPlayer: undefined,
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
        return(
            <div>Page Not Found</div>
        );
    }

    selectRandomPlayers = () => {
        let selectedPlayers: Player[] = [];
        let sortedPlayers: string [] = [];
        let playerIds: string [] = [];
        let validPlayers: Set<string> = new Set();
        let playerKey: string
        const COUNT = 2;
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
            randomPlayers: selectedPlayers
        })

        console.log('state', this.state)
    }

    getRandomValues = (player: Player[]) => {
        let value: Player = this.state.playersInfo[Math.floor(Math.random() * this.state.playersInfo.length)];  
        if (player.indexOf(value) === -1) {
            player.push(value);
        }
        else{
            this.getRandomValues(player);
        }
        console.log(player, 'player');
        return player;
}

clickHandler = (player_id: string): void => {
let result: Player []
    this.setState({
        showFppg:true
    })

let maxFppg: number = Math.max(this.state.randomPlayers[0].fppg, this.state.randomPlayers[1].fppg)
result = this.state.randomPlayers.filter((pl) => pl.id === player_id)
                        
console.log('result', result)

        if (result[0].fppg === maxFppg) {
            this.setState({
                count: this.state.count + 1,
                isMaxFppgPlayer: true
            })
        } else {
            this.setState({
                isMaxFppgPlayer: false
            })
        }
}


    displayPlayers = () => {
        if (this.state.randomPlayers.length > 0) {
            return(
                <>
                <div>
                    {
                    this.state.randomPlayers.map((player: Player) => {
                        return(
                           <PlayerDetails 
                            player={player} 
                            showFppg={this.state.showFppg} 
                            onSelection={this.clickHandler} 
                            >

                           </PlayerDetails>
                        )}
                    )}
                    <button onClick={this.selectRandomPlayers}>next</button>
                    <p> {this.state.showFppg ? this.state.count : 'click next'} </p>
                </div>
                </>
            );
        } else {
            return this.showError()
        }
        
    }

    render() {
        return (
            <div>
               <span> Guess which player has higher FanDuel Points Per Game (FPPG) ?</span>
               <div>
                {this.displayPlayers()}
               </div>
            </div>
        )
    }
}

