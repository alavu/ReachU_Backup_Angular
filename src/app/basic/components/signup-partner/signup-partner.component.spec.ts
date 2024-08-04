import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupCompanyComponent } from './signup-partner.component';

describe('SignupCompanyComponent', () => {
  let component: SignupCompanyComponent;
  let fixture: ComponentFixture<SignupCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
