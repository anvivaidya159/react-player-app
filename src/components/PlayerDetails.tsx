import React from "react";
import {Player} from "../interfaces/players";

export interface PlayerDetailsProps {
    children?: never[],
    player: Player,
    showFppg: boolean,
    onSelection: (id: string) => void,
    isWinner: string | undefined,
    isLooser: string | undefined 
}

export const PlayerDetails = (props: PlayerDetailsProps) => {

    const green = (props.isWinner === props.player.id || ( props.isWinner === 'UNKNOWN' && props.isLooser !== props.player.id)) ? 'border-green' : ''
    const red = (props.isLooser === props.player.id  || (props.isLooser === 'UNKNOWN' && props.isWinner !== props.player.id)) ? 'border-red' : ''
    const black = (props.isWinner === undefined) ? 'border-black' : '' 

    return (
        <div key={props.player.id}
             className={'item'}
             onClick={() => props.onSelection(props.player.id)}
             id={'player-detail'}
        >
            <h4 data-name={'name'}>{props.player.first_name} {props.player.last_name} </h4>
            <div data-name={'image'} className={`${green} ${red} ${black}`} >
                <img
                    src={props.player.images.default.url}
                    height={props.player.images.default.height}
                    width={props.player.images.default.width}
                    alt={'NBA player'}
                />
            </div>
            <h4 data-name={'player-fppg'}> {props.showFppg ? props.player.fppg : null}</h4>
        </div>
    )
}