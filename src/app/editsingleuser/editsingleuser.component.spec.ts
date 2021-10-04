import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsingleuserComponent } from './editsingleuser.component';

describe('EditsingleuserComponent', () => {
  let component: EditsingleuserComponent;
  let fixture: ComponentFixture<EditsingleuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditsingleuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsingleuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
