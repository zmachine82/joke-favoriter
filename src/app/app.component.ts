import {Component, OnInit} from '@angular/core';
import {ApiService} from "./api.service";
import {JokeResponse} from "./joke-response";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  joke!: JokeResponse;

  constructor(private api: ApiService) {

  }

  ngOnInit(): void {
    this.getJoke();
  }

  getJoke() {
    this.api.getRandomDadJoke().subscribe(j => this.joke = j)
  }

  favoriteJoke() {
    const jokes = this.favorites

    jokes.push(this.joke);

    localStorage.setItem('favorites', JSON.stringify(jokes));
  }

  get favorites() {
    return JSON.parse(<string>localStorage.getItem('favorites')) as JokeResponse[] || []
  }

  reloadFavoriteJoke(id: string) {
    this.api.getSpecificJoke(id).subscribe(j => this.joke = j)
  }

  unFavoriteJoke(id: string) {
    const jokes = this.favorites.filter(joke => joke.id !== id)

    localStorage.setItem('favorites', JSON.stringify(jokes));
  }

  isCurrentJokeFavorited() {
    return this.favorites.some(j => j.id === this.joke?.id);
  }
}
