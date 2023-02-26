import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLoginRegisterComponent } from './auth-login-register.component';

describe('AuthLoginRegisterComponent', () => {
  let component: AuthLoginRegisterComponent;
  let fixture: ComponentFixture<AuthLoginRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthLoginRegisterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthLoginRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
