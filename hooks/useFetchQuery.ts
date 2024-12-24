import {useQuery, useInfiniteQuery} from "@tanstack/react-query";

//const endpoint = "https://pokeapi.co/api/v2"
const endpoint ="http://192.168.1.13:3000"

type API = {
    '/coiffeurs':{
        id: string,
        name: string | null,
        salon: string | null,
        service: string | null,
        images_url: string | null,
        }
    }


type API1 = {
    '/pokemon?limit=21':{
        count: number,
        next: string | null,
        results: {name: string, url:string}
        }
    }

export function useFetchQuery<T extends keyof API>(path: T) {
    return useQuery({
        queryKey: [path],
        queryFn: async() => {
                await wait(1)
                return fetch(endpoint + path).then(r=>r.json() as Promise<API[T]>)
             }
        })
    }


export function useFetchQuery2<T extends keyof API>(path: T) {
    return useQuery({
        queryKey: [path],
        queryFn: async() => {
                await wait(1)
                return fetch(endpoint + path,{
                         headers: {
                                 Accept: 'application/json'
                             }
                }
                ).then(r=>r.json() as Promise<API[T]>)
             }
        })
    }

export function useInfiniteFetchQuery<T extends keyof API>(path: T) {
    return useInfiniteQuery({
        queryKey: [path],
        initialPageParam: endpoint + path,

        queryFn: async ({pageParam}) => {
            await wait(1)
            return fetch(pageParam, {
                headers: {
                        Accept: 'application/json'
                    }
                }).then(r=>r.json() as Promise<API[T]>)
            },
        getNextPageParam: (lastPage) =>{
            if ("next" in lastPage){
                    return lastPage.next
                }
            return null
            }
        })
    }

function wait (duration: number) {
        return new Promise(resolve => setTimeout(resolve, duration*1000))
    }