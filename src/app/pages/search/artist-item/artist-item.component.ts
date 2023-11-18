import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ArtistViewModel } from '@app/interfaces/artist';
import { RouteName } from '@app/shared/models/routeName';
import { NgFor, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-artist-item',
    templateUrl: './artist-item.component.html',
    styleUrls: ['./artist-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [IonicModule, RouterLink, NgFor, DatePipe]
})
export class ArtistItemComponent {
  @Input() artist: ArtistViewModel

  routeName = RouteName;
}
