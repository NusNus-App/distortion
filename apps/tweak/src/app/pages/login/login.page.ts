import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ToolbarComponent } from 'src/app/shared/components/toolbar/toolbar.component';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, ToolbarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private supabase = inject(SupabaseService);

  credentials = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  signIn(): void {
    this.supabase.signIn(this.email?.value ?? '', this.password?.value ?? '');
  }

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }
}
