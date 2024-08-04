import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard'; // Adjust the import path as needed
import { UserStorageService } from '../basic/services/storage/user-stoarge.service'; // Adjust the import path as needed
import { of } from 'rxjs';

// Mocking the UserStorageService
class MockUserStorageService {
  static isAdminLoggedIn() {
    return true; // or return false based on your test scenario
  }
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: UserStorageService, useClass: MockUserStorageService } // Use the mock service
      ]
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if the user is an admin', () => {
    spyOn(MockUserStorageService, 'isAdminLoggedIn').and.returnValue(true); // Mock the return value
    const result = guard.canActivate();
    expect(result).toBeTrue();
  });

  it('should redirect to login if the user is not an admin', () => {
    spyOn(MockUserStorageService, 'isAdminLoggedIn').and.returnValue(false); // Mock the return value
    const result = guard.canActivate();
    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
