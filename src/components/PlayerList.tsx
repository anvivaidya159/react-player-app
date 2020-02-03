import React from 'react';
import { getPlayersData, PlayersDataObserver } from '../services/getPlayersData';
import { Players, Player } from "../interfaces/players";

interface PlayerInfoState {
    playersInfo: Player []
    randomPlayers: Player []
    players_set: Set<Player[]>
}

interface PlayerInfoProps {
}

// PlayerListProps, PlayerListState
export default class PlayerList extends React.Component<PlayerInfoProps,PlayerInfoState> implements PlayersDataObserver {

constructor(props: PlayerInfoProps, state: PlayerInfoState) {
    super(props);
    
    this.state = {
        playersInfo: [] as Player[],
        randomPlayers: [] as Player[],
        players_set: new Set()
    }

}

    componentDidMount() {
        getPlayersData(this);
    }

    showPlayersData = (results: Player []) => {
        console.log('in component', results)
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
        let sortedPlayers: Player [] = [];
        const COUNT = 2;
        for (let i = 0; i < COUNT; i++) {
            selectedPlayers = this.getRandomValues(selectedPlayers);
        }
        console.log('selectedPlayers', selectedPlayers);
        sortedPlayers = selectedPlayers.sort((player1, player2) => player1.id > player2.id ? 1 : -1)

        if (this.state.players_set.has(sortedPlayers)) {
            this.selectRandomPlayers();
        } else {
            this.state.players_set.add(sortedPlayers);
        }
        
        this.setState({
            randomPlayers: selectedPlayers
        })

        console.log('state', this.state)
    }

    getRandomValues = (player: Player[]) => {
        let value: Player = this.state.playersInfo[Math.floor(Math.random() * this.state.playersInfo.length)];  
        if (player.indexOf(value) == -1){
            player.push(value);
        }
        else{
            this.getRandomValues(player);
        }
        console.log(player, 'player');
        return player;
}


    displayPlayers = () => {
        if (this.state.randomPlayers.length > 0) {
            return(
                <>
                <div>
                    <div>
                        {this.state.randomPlayers[0].first_name} {this.state.randomPlayers[0].last_name}
                    </div>
                    <div>
                        <img 
                            src={this.state.randomPlayers[0].images.default.url}
                            height ={this.state.randomPlayers[0].images.default.height} 
                            width ={this.state.randomPlayers[0].images.default.width}
                        />
                    </div>
                    <div>
                        {this.state.randomPlayers[0].position}
                        {this.state.randomPlayers[0].fppg}
                    </div>
                </div>
                <div>
                    <div>
                        {this.state.randomPlayers[1].first_name} {this.state.randomPlayers[1].last_name}
                    </div>
                    <div>
                        <img 
                            src={this.state.randomPlayers[1].images.default.url}
                            height ={this.state.randomPlayers[1].images.default.height} 
                            width ={this.state.randomPlayers[1].images.default.width}
                        />
                    </div>
                    <div>
                        {this.state.randomPlayers[1].position}
                        {this.state.randomPlayers[1].fppg}
                    </div>
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

