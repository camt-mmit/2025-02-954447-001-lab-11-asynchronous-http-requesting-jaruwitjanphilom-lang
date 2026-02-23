import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  resource,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { fetchResource } from '../../helpers';
import { ExtractIdPipe } from '../../pipes/extract-id-pipe';
import { Film, Person, Planet } from '../../types';

@Component({
  selector: 'app-film-view',
  imports: [RouterLink, DatePipe, ExtractIdPipe],
  templateUrl: './film-view.html',
  styleUrl: './film-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmView {
  readonly data = input.required<Film>();
  readonly moduleRoute = input.required<ActivatedRoute>();


  protected readonly charactersResource = resource({
    params: () => this.data().characters,
    loader: async ({ params, abortSignal }) =>
      await Promise.all(params.map(async (url) => await fetchResource<Person>(url, abortSignal))),
  }).asReadonly();


  protected readonly planetsResource = resource({
    params: () => this.data().planets,
    loader: async ({ params, abortSignal }) =>
      await Promise.all(params.map(async (url) => await fetchResource<Planet>(url, abortSignal))),
  }).asReadonly();
}
