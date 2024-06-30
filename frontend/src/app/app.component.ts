import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule],
  template: `<main class="h-full">
    <router-outlet />
    <p-toast />
  </main> `,
  providers: [MessageService],
})
export class AppComponent {
  title = 'frontend';
}
