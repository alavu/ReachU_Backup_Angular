import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteworthyComponent } from './noteworthy.component';

describe('NoteworthyComponent', () => {
  let component: NoteworthyComponent;
  let fixture: ComponentFixture<NoteworthyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteworthyComponent]
    });
    fixture = TestBed.createComponent(NoteworthyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
