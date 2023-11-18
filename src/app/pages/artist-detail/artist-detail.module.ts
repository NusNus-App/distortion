import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArtistDetailPageRoutingModule } from './artist-detail-routing.module';

import { ArtistDetailPage } from './artist-detail.page';
import { MusicPlayerComponent } from '@app/shared/components/music-player/music-player.component';
import { IframeSrcDirective } from '@app/shared/directives/iframe-src.directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ArtistDetailPageRoutingModule,
        ArtistDetailPage,
        MusicPlayerComponent,
        IframeSrcDirective
    ]
})
export class ArtistDetailPageModule { }
