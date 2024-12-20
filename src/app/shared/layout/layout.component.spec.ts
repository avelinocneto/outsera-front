import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutComponent, HeaderComponent, SidebarComponent, FooterComponent],
      imports: [RouterOutlet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load child components (Header, Sidebar, Footer)', () => {
    const headerComponent = fixture.debugElement.query(
      (de) => de.componentInstance instanceof HeaderComponent
    );
    const sidebarComponent = fixture.debugElement.query(
      (de) => de.componentInstance instanceof SidebarComponent
    );
    const footerComponent = fixture.debugElement.query(
      (de) => de.componentInstance instanceof FooterComponent
    );
    const routerOutlet = fixture.debugElement.query(
      (de) => de.nativeElement instanceof HTMLElement && de.nativeElement.tagName === 'ROUTER-OUTLET'
    );

    expect(headerComponent).toBeTruthy();
    expect(sidebarComponent).toBeTruthy();
    expect(footerComponent).toBeTruthy();
    expect(routerOutlet).toBeTruthy();
  });
});
