import axios from "axios";

const PUBLIC_API_KEY = '5c608254efbaaa4278248dfc118693aa';
const PRIVATE_API_KEY = 'ba8d8dfedd6757722efbd0402d0d78393a753f90';
const HASH = 'caac9d367146fc787a4885871c7446f3';

const Api = axios.create({
    baseURL: 'http://gateway.marvel.com/v1/public',
});


export const marvelAPI = {
    getCharacters(params: { limit?: number, offset?: number }) {
        return Api.get<any>('/characters', {
            params: {
                apikey: PUBLIC_API_KEY,
                ts: 1,
                hash: HASH,
                ...params
            }
        })
    },
    getComicById(characterId: number,params: { limit?: number, dateRange?: string }){
        return Api.get<any>(`/characters/${characterId}/comics`, {
            params: {
                apikey: PUBLIC_API_KEY,
                ts: 1,
                hash: HASH,
                ...params
            }
        })
    }
}