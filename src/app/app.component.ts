import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class AppComponent implements AfterViewInit {
  title = 'valentines-day';

  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    const v = this.bgVideo.nativeElement;
    v.muted = true;
    v.playsInline = true;

    const p = v.play();
    if (p) {
      p.catch(err => console.log('Autoplay bloqueado:', err));
    }
  }

}
