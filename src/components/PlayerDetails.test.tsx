import * as React from 'react'
import {PlayerDetails, PlayerDetailsProps} from "./PlayerDetails";
import {findByName, render, textContent} from "../utils";
import * as ReactDOM from "react-dom";

describe ('Player Details', () => {
    it ('should show player details', () => {
        renderPlayerDetails()
        expect(textContent()).toContain('FirstName')
        expect(findByName('name')).not.toBeNull();
        expect(findByName('image')).not.toBeNull();
        expect(findByName('player-fppg')).toBeNull();
    })

    it ('should show fppg score when showFppg is true', () => {
        renderPlayerDetails({showFppg: true})
        expect(findByName('player-fppg')).not.toBeNull();
    })

    it ('should not show fppg score when showFppg is true', () => {
        renderPlayerDetails({showFppg: true})
        expect(findByName('player-fppg')).toBeNull();
    })
})

function renderPlayerDetails(customProps?: Partial<PlayerDetailsProps>) {
   const defaultProps: PlayerDetailsProps = {
       player: {
           first_name:'FirstName',
           last_name: 'LastName',
           id: '123',
           fppg: 10,
           position: 'PF',
           salary:'9300',
           images: {
               default:{
                   height: 200,
                   width: 200,
                   url: 'https://d17odppiik753x.cloudfront.net/playerimages/nba/15860.png'
               }
           }
       },
       showFppg: false,
       onSelection: jest.fn,
       isWinner: '',
       isLooser: ''
   }

    return render(
        <PlayerDetails
            {...defaultProps}
            {...customProps}
        />
    )
}
