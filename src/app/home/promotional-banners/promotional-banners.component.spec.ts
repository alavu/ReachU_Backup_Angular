import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionalBannersComponent } from './promotional-banners.component';

describe('PromotionalBannersComponent', () => {
  let component: PromotionalBannersComponent;
  let fixture: ComponentFixture<PromotionalBannersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromotionalBannersComponent]
    });
    fixture = TestBed.createComponent(PromotionalBannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});