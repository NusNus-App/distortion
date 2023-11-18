import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { animations } from '@app/shared/animations';
import { SegmentCustomEvent, IonicModule } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { IframeSrcDirective } from '../../directives/iframe-src.directive';
import { NgIf, AsyncPipe } from '@angular/common';

type PlayerSource = 'soundcloud' | 'bandcamp' | null;

@Component({
    selector: 'app-music-player',
    templateUrl: './music-player.component.html',
    styleUrls: ['./music-player.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: animations.slideUpDown,
    standalone: true,
    imports: [NgIf, IonicModule, IframeSrcDirective, AsyncPipe]
})
export class MusicPlayerComponent implements OnInit {
  @Input() soundcloudUrl: string;
  @Input() bandcampUrl: string;
  @Input() showPlayer$: BehaviorSubject<boolean>;

  selectedSource: PlayerSource;

  ngOnInit(): void {  
    if (this.soundcloudUrl && this.bandcampUrl) {
      this.selectedSource = 'soundcloud';
    } else if (this.soundcloudUrl) {
      this.selectedSource = 'soundcloud';
    } else {
      this.selectedSource = 'bandcamp';
    }
  }

  onChangePlayerSource(event: Event): void {
    const source = (event as SegmentCustomEvent).target.value as PlayerSource;
    this.selectedSource = source;
  }

  close(): void {
    this.showPlayer$.next(false);
  }
}
