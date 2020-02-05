import React from "react";
import { Player } from "../interfaces/players";

interface PlayerDetailsProps {
    player: Player,
    showFppg: boolean
    onSelection: (id: string) => void | undefined
}

export const PlayerDetails = (props: PlayerDetailsProps) => {

const clickHandler = () => props.onSelection(props.player.id);

return (
    <div key={props.player.id} onClick={() => clickHandler()}>
    <h4>{props.player.first_name} {props.player.last_name} </h4>
    <div>
    <img 
        src={props.player.images.default.url}
        height ={props.player.images.default.height} 
        width ={props.player.images.default.width}
        alt={'NBA player'}
    />
    </div>
    {props.showFppg ? <h4> {props.player.fppg} </h4> : null}
    </div>
)
}