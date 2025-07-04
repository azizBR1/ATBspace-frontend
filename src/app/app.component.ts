import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet,Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,CommonModule, GoogleMapsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit,AfterViewInit {
  title = 'PFEATBfront-end';
  Homepage = false;
  Text: string = `à ATB Space, votre nouvel espace dédié à l’innovation, à la proximité et à la modernisation de vos services bancaires. Explorez nos fonctionnalités et vivez une expérience client repensée pour vous.`;
  diText: string = '';
  index = 0;
  @ViewChild('partie3Ref') partie3Ref!: ElementRef;
  private ScrollTop = 0;




  constructor(private router: Router) { }


  center: google.maps.LatLngLiteral = { lat: 36.8, lng: 10.2 };
  zoom = 6;

  pointsDeVente = [
    { name: 'atb Tunis', lat: 36.8065, lng: 10.1815 },
    { name: 'atb Sfax', lat: 34.7406, lng: 10.7603 },
  ];



  ngAfterViewInit(): void {
    this.updateVisibility();
  }

  ngOnInit(): void {
    this.typeText();
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {

          this.Homepage = this.router.url === '/';
      }
    });
 }


 saveReferrer() {
  sessionStorage.setItem('from', 'true');
}



w3_open(): void {
    const sidebar = document.getElementById("mySidebar");
    const overlay = document.getElementById("myOverlay");

    if (sidebar && overlay) {
      sidebar.style.display = "block";
      overlay.style.display = "block";
    }
  }

  w3_close(): void {
    const sidebar = document.getElementById("mySidebar");
    const overlay = document.getElementById("myOverlay");

    if (sidebar && overlay) {
      sidebar.style.display = "none";
      overlay.style.display = "none";
    }
  }

  onClick(element: HTMLImageElement): void {
    const modal = document.getElementById("modal01") as HTMLElement;
    const img = document.getElementById("img01") as HTMLImageElement;
    const caption = document.getElementById("caption") as HTMLElement;

    if (modal && img && caption) {
      img.src = element.src;
      modal.style.display = "block";
      caption.innerHTML = element.alt;
    }
  }


  images: string[] = [
  'assets/carac1.png',
  'assets/carac2.jpg',
  'assets/carac4.png'
];



typeText(): void {
    if (this.index < this.Text.length) {
      this.diText += this.Text[this.index];
      this.index++;
      setTimeout(() => this.typeText(), 20);
    }
  }






   @HostListener('window:scroll', [])
  onWindowScroll() {
    this.updateVisibility();
  }

  private updateVisibility(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const elementTop = this.partie3Ref.nativeElement.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    const isVisible = elementTop < windowHeight * 0.8;

    if (isVisible) {
      if (scrollTop > this.ScrollTop) {
    
        this.partie3Ref.nativeElement.classList.add('show');
      } 
    } else {

      this.partie3Ref.nativeElement.classList.remove('show');
    }

    this.ScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

}
