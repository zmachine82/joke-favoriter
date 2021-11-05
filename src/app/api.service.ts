import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JokeResponse} from "./joke-response";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getRandomDadJoke() {
    return this.httpClient.get<JokeResponse>('https://icanhazdadjoke.com/', {headers: new HttpHeaders().set('Accept', 'application/json')})
  }

  getSpecificJoke(id: string) {
    return this.httpClient.get<JokeResponse>('https://icanhazdadjoke.com/j/' + id, {headers: new HttpHeaders().set('Accept', 'application/json')})
  }
}
