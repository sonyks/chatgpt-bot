import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSupportButtonComponent } from './customer-support-button.component';

describe('CustomerSupportButtonComponent', () => {
  let component: CustomerSupportButtonComponent;
  let fixture: ComponentFixture<CustomerSupportButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerSupportButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerSupportButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
