import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [CommonModule, RouterLink, RouterLinkActive]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have RouterLink and RouterLinkActive directives', () => {
    const routerLink = fixture.debugElement.query(
      (de) => !!de.attributes['ng-reflect-router-link']
    );
    const routerLinkActive = fixture.debugElement.query(
      (de) => !!de.attributes['ng-reflect-router-link-active']
    );

    expect(routerLink).toBeTruthy();
    expect(routerLinkActive).toBeTruthy();
  });
});
