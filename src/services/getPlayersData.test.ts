import {getPlayersData, PLAYERS_DATA_ENDPOINTS, PlayersDataObserver} from "./getPlayersData";
import {fakeServer, SinonFakeServer, SinonFakeXMLHttpRequest} from 'sinon';
import {Player} from "../interfaces/players";

export const CONTENT_TYPE_JSON = {'Content-Type':'text/plain'}

export let dummyServer: SinonFakeServer

export const DUMMY_PLAYERS_DATA: Player [] =  [
    {
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
    }
]

describe('getPlayersData', () => {

    let observer: PlayersDataObserver

    beforeEach(() => {
        dummyServer = fakeServer.create()
        dummyServer.respondImmediately = true

        observer = {
            showPlayersData: jasmine.createSpy('showPlayersData'),
            showError: jasmine.createSpy('showError'),
        }
    })

    afterEach(() => dummyServer.restore())

    describe('makes a REST call', () => {

        describe('when the REST call is successful', () => {

            it('returns players data', () => {
                dummyServer.respondWith((xhr: SinonFakeXMLHttpRequest) => {
                    expect(xhr.method).toEqual('GET')
                    expect(xhr.url).toEqual(PLAYERS_DATA_ENDPOINTS)

                    xhr.respond(200, {...CONTENT_TYPE_JSON} , JSON.stringify(DUMMY_PLAYERS_DATA))
                })

                getPlayersData(observer)

                return promiseThen(() => {
                    expect(observer.showPlayersData).toHaveBeenCalled()
                }, 100)
            })
        })

        it('when the REST call is NOT successful', () => {
            dummyServer.respondWith('GET',PLAYERS_DATA_ENDPOINTS , [400, {...CONTENT_TYPE_JSON}, ''])
            getPlayersData(observer)

            return promiseThen(() => {
                expect(observer.showError).toHaveBeenCalled()
            })
        })
    })

})

export function promiseThen(callback: () => void, timeout: number = 0) {
    return new Promise((resolve, reject) => {
        global.setTimeout(
            () => {
                try {
                    callback()
                    resolve()
                } catch (e) {
                    reject(e)
                }
            },
            timeout)
    })
}