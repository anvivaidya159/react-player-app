import axios, {AxiosError, AxiosResponse} from "axios"
import { Player } from "../interfaces/players"
const PLAYERS_DATA_ENDPOINTS: string = "https://gist.githubusercontent.com/liamjdouglas/bb40ee8721f1a9313c22c6ea0851a105/raw/6b6fc89d55ebe4d9b05c1469349af33651d7e7f1/Player.json"

export interface PlayersDataObserver {
    showPlayersData(results: Player []): void
    showError(): void
}

export const getPlayersData =  (observer: PlayersDataObserver) => {
    let config = {headers: {}}

    axios.get(PLAYERS_DATA_ENDPOINTS, config).then((response: AxiosResponse) => {
        observer.showPlayersData(response.data? response.data.players : null);
    }).catch((error: AxiosError) => {
        observer.showError();

    })
}