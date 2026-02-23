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
import { Person, Planet, Film } from '../../types';

@Component({
  selector: 'app-planet-view',
  imports: [RouterLink, DatePipe, ExtractIdPipe], // ลบ AsyncPipe ออกจาก imports
  templateUrl: './planet-view.html',
  styleUrl: './planet-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetView {
  readonly data = input.required<Planet>();
  readonly moduleRoute = input.required<ActivatedRoute>();

 
  protected readonly residentsResource = resource({
    params: () => this.data().residents,
    loader: async ({ params, abortSignal }) => 
      await Promise.all(params.map(async (url) => await fetchResource<Person>(url, abortSignal))),
  }).asReadonly();
  
  
  protected readonly filmsResource = resource({
    params: () => this.data().films,
    loader: async ({ params, abortSignal }) =>
        await Promise.all(params.map(async (url) => await fetchResource<Film>(url, abortSignal))),
    }).asReadonly();
}
