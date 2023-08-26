import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailsendComponent } from './emailsend.component';

describe('EmailsendComponent', () => {
  let component: EmailsendComponent;
  let fixture: ComponentFixture<EmailsendComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailsendComponent]
    });
    fixture = TestBed.createComponent(EmailsendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
