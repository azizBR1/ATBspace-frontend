import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { CreditService } from '../credit-admin/credit.service';
import { Credit } from '../credit-admin/credit';
import { FileService } from '../file-utilisateur/file.service';
import { Position } from '../file-utilisateur/file';
import { Utilisateur } from '../utilisateur/utilisateur';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
import { Reclamation } from '../reclamation-utilisateur/Reclamation';
import { ReclamationUtilisateurService } from '../reclamation-utilisateur/reclamation-utilisateur.service';



@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink, RouterOutlet,FormsModule,HttpClientModule,NgChartsModule,CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements AfterViewInit, OnInit{

constructor(private reclamationService: ReclamationUtilisateurService,private creditService: CreditService,private cd: ChangeDetectorRef,private Fileservice: FileService,private utilisateurService: UtilisateurService) { }
pieReady = false;
isLoading = true;



 saveReferrer() {
  sessionStorage.setItem('from', 'true');
}

ngOnInit(): void {

  setTimeout(() => {
      this.isLoading = false;
    }, 7000);
        this.creditService.getcredits().subscribe(data => {
               const CréditBienetre = data.filter(rdv => rdv.type=== "Crédit Bien etre").length;
               if(CréditBienetre <1){
                 const CréditBienetre = 1;
               }
               const CréditRenov = data.filter(rdv => rdv.type ==="Crédit Renov").length;
               const CréditMounassib = data.filter(rdv => rdv.type ==="Crédit Mounassib").length;
               const CréditStart = data.filter(rdv => rdv.type=== "Crédit Start").length;
               const CréditSayara = data.filter(rdv => rdv.type ==="Crédit Sayara").length;
               const CréditAwelSakan = data.filter(rdv => rdv.type ==="Crédit Awel Sakan").length;
               const CréditTahawel = data.filter(rdv => rdv.type=== "Crédit Tahawel").length;
               const CréditSakan = data.filter(rdv => rdv.type ==="Crédit Sakan").length;
            this.barChartData2 ={
               labels: ['Sakan', 'Tahawel', 'AWALSAKAN', 'Renov', 'Sayara', 'Start', 'Mounassib', 'Bien Être'],
    datasets: [
      {data: [
          CréditSakan,
          CréditTahawel,
          CréditAwelSakan,
          CréditRenov,
          CréditSayara,
          CréditStart,
          CréditMounassib,
          CréditBienetre
        ],

             backgroundColor: [
          'rgba(255, 0, 251, 0.26)',
          'rgba(0, 255, 225, 0.26)',
          'rgba(179, 255, 0, 0.26)',
          'rgba(255, 140, 0, 0.26)',
          'rgba(8, 0, 253, 0.26)',
          'rgba(38, 255, 0, 0.26)',
          'rgba(255, 230, 0, 0.26)',
          'rgba(255, 0, 68, 0.26)'
        ],
        borderColor: [
          'rgb(255, 0, 251)',
          'rgb(0, 255, 225)',
          'rgb(179, 255, 0)',
          'rgb(255, 140, 0)',
          'rgb(8, 0, 253)',
          'rgb(38, 255, 0)',
          'rgb(255, 230, 0)',
          'rgb(255, 0, 68)'
        ],
        borderWidth: 1,
        label: 'Demandes de crédits'
      }
    ]
  };
  this.cd.detectChanges();
  this.chart?.update();
  });








        this.reclamationService.getReclamation().subscribe(
          (data: Reclamation[]) => {
            const Reclamations = data;

            const filter1 = Reclamations.filter(rec => {
            const date = new Date(rec.date);
            const month = date.getMonth();
            return month >= 0 && month <= 4;
            });

    this.reclamationmois1 = filter1.length;
    console.log(this.reclamationmois1+"1")

            const filter2 = Reclamations.filter(rec => {
            const date = new Date(rec.date);
            const month = date.getMonth();
            return month >= 4 && month <= 8;
            });
            
    this.reclamationmois2 = filter2.length;
    console.log(this.reclamationmois2+"22")

    const filter3 = Reclamations.filter(rec => {
            const date = new Date(rec.date);
            const month = date.getMonth();
            return month >= 8 && month <= 11;
            });
            
    this.reclamationmois3 = filter3.length;

    this.recenattente = Reclamations.filter(rec => rec.statut=== "En attente").length;
    this.recencours = Reclamations.filter(rec => rec.statut=== "en cours").length;
    this.rectraite = Reclamations.filter(rec => rec.statut=== "traité").length;

    this.barChartData = {
  labels: ['Jan-Avr', 'Mai-Août', 'Sept-Déc'],
  datasets: [
    {
      data: [this.reclamationmois1, this.reclamationmois2, this.reclamationmois3],
      label: 'Réclamations',
      borderColor: 'rgb(255, 0, 55)',
      backgroundColor: 'rgba(188, 0, 41, 0.74)',
      tension: 0.4,
      pointBackgroundColor: 'rgb(188, 0, 41)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(188, 0, 41)'
    }
  ]
};
          },
          (error) => {
            console.error('Erreur reclamations:', error);
          }
        );



  this.utilisateurService.getUtilisateur().subscribe(
        (data: Utilisateur[]) => {
          const utilisateurs = data.filter(utilisateur => utilisateur.role === 'CLIENT' || utilisateur.role === 'EMPLOYEE');
          this.comptesActif      = utilisateurs.filter(utilisateur => utilisateur.status === 'ACTIF').length;
          this.comptesSuspendus  = utilisateurs.filter(utilisateur => utilisateur.status === 'SUSPENDUE').length;  
          this.comptesEnAttente  = utilisateurs.filter(utilisateur => utilisateur.status === 'EN ATTENTE').length; 

      
        }
      );

  
  this.Fileservice.getPositons().subscribe(
      (data: Position[]) => {
        console.log("Positions récupérées :", data);
         const position = data;
         this.positions = position.length;
      },);


  this.creditService.getcredits().subscribe((data: Credit[]) => {
      const filtered = data.filter(r => r.type !== 'HBloqué' && r.type !== 'JBloqué');
      const counts = [
        filtered.filter(r => r.statut === 'En Attente').length,
        filtered.filter(r => r.statut === 'Traité').length,
        filtered.filter(r => r.statut === 'Accepté').length,
        filtered.filter(r => r.statut === 'Refusé').length,
      ];

      this.pieChartData.datasets[0].data = counts;
      this.pieReady = true;


      this.cd.detectChanges();
      this.chart.update();
    });
}




  @ViewChild('tvContainer', { static: true }) tvContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('tvContainer1', { static: true }) tvContainer1!: ElementRef<HTMLDivElement>;
  @ViewChild(BaseChartDirective, { static: false }) chart!: BaseChartDirective;




  positions = 0;
  isSidebarExpanded = false;
  credits: Credit[] = [];
  reclamations = 0;
  recenattente = 0;
  rectraite = 0;
  recencours = 0;
  rdvaccepte   =  1;
  rdvenattente = 1;
  rdvtraite =  1;
  comptesActif      = 0; 
  comptesSuspendus  = 0;   
  comptesEnAttente  = 0;
  demandecard = 2;
  reclamationmois1 = 0;
  reclamationmois2 = 0;
  reclamationmois3 = 0;

  
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true
  };

  public barChartType: ChartType = 'line';
  public barChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan-Avr', 'Avr-Juill', 'Juill-Dec'],
    datasets: [
      { data: [0, 0, 0], label: 'Reclamations',
      borderColor: 'rgb(255, 0, 55)' ,     
      backgroundColor: 'rgba(188, 0, 41, 0.74)',
      tension: 0.4,                              
      pointBackgroundColor: 'rgb(188, 0, 41)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(188, 0, 41)'
      }
    ]
  };



    public barChartOptions2: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true
      }
    }
  };

  public barChartType2: ChartType = 'bar';
  public barChartData2: ChartConfiguration<'bar'>['data'] = {
    labels: ['Sakan', 'Tahawel', 'AWALSAKAN','Renov','Sayara','Start','Mounassib','Bien Être'],
    datasets: [
      { data: [1,1,2,5,8,1,4,2],
         backgroundColor: [
        'rgba(255, 0, 251, 0.26)',
        'rgb(0, 255, 225, 0.26)',
        'rgb(179, 255, 0, 0.26)',
        'rgb(255, 140, 0, 0.26)',
        'rgb(8, 0, 253, 0.26)',
        'rgb(38, 255, 0, 0.26)',
        'rgb(255, 230, 0, 0.26)',
        'rgb(255, 0, 68, 0.26)'
      ],
      borderColor: [
        'rgb(255, 0, 251)',
        'rgb(0, 255, 225)',
        'rgb(179, 255, 0)',
        'rgb(255, 140, 0)',
        'rgb(8, 0, 253)',
        'rgb(38, 255, 0)',
        'rgb(255, 230, 0)',
        'rgb(255, 0, 68)'
      ],
       borderWidth: 1
      }
    ]
  };
  
  public pieChartType: ChartType = 'pie';
  public pieChartData: ChartConfiguration<'pie'>['data'] = {
      labels: [ 'En attente', 'Traité', 'Accepté','Refusé'],
      datasets: [
        {
          data: [0,0,0,0],
          backgroundColor: [
          'rgb(255, 0, 55)',   
          'rgba(255, 0, 55, 0.71)',  
          'rgba(255, 0, 55, 0.43)',
          'rgba(255, 0, 55, 0.2)'    
        ],
        
        borderColor: 'rgb(0, 0, 0)',
        borderWidth: 1
        
      }
    ]
  };


public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      tooltip: {
        enabled: true
      }
    }
  };
        
        toggleSidebar() {
          this.isSidebarExpanded = !this.isSidebarExpanded;
          
          const sidebar = document.getElementById('mySidebar');
          const body = document.body;
          const toggleButton = document.getElementById('mobileSidebarToggle');
          const buttonIcon = toggleButton?.querySelector('i');
          
          if (this.isSidebarExpanded) {
            sidebar?.classList.add('expanded');
            body.classList.add('sidebar-expanded');
            if (toggleButton) {
              toggleButton.style.left = '270px';
            }
            if (buttonIcon) {
              buttonIcon.className = 'bi bi-arrow-bar-left';
            } 
          } else {
            sidebar?.classList.remove('expanded');
            body.classList.remove('sidebar-expanded');
            if (toggleButton) {
              toggleButton.style.left = '10px';
            }
            if (buttonIcon) {
              buttonIcon.className = 'bi bi-arrow-bar-right';
            }
          }
        }



        images = [
    'assets/news4.png',
    'assets/news1.png',
    'assets/news2.png',
    'assets/news3.png'
  ];




  ngAfterViewInit(): void {

    const script1 = document.createElement('script');
    script1.src   = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script1.async = true;
    script1.type  = 'text/javascript';
    script1.innerHTML = `
    {
      "symbols": [
        { "proName":"FOREXCOM:SPXUSD","title":"S&P 500 Index" },
        { "proName":"FOREXCOM:NSXUSD","title":"US 100 Cash CFD" },
        { "proName":"FX_IDC:EURUSD","title":"EUR to USD" },
        { "proName":"BITSTAMP:BTCUSD","title":"Bitcoin" },
        { "proName":"BITSTAMP:ETHUSD","title":"Ethereum" }
      ],
      "showSymbolLogo": true,
      "isTransparent": false,
      "displayMode": "adaptive",
      "colorTheme": "dark",
      "locale": "en"
    }`;
    this.tvContainer1.nativeElement.appendChild(script1);




    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.type = 'text/javascript';
    
    script.innerHTML = `
    {
      "symbols": [
        { "description": "", "proName": "TURQUOISE:SHELL" },
        { "description": "", "proName": "TURQUOISE:BARCL" },
        { "description": "", "proName": "TURQUOISE:RRL"   },
        { "description": "", "proName": "TURQUOISE:BPL"   },
        { "description": "", "proName": "TURQUOISE:BTL"   },
        { "description": "", "proName": "TURQUOISE:TSCOL" },
        { "description": "", "proName": "TURQUOISE:BATSL" },
        { "description": "", "proName": "TURQUOISE:ULVRL" }
      ],
      "showSymbolLogo": true,
      "colorTheme": "dark",
      "isTransparent": false,
      "displayMode": "regular",
      "locale": "en"
    }
    `;
    this.tvContainer.nativeElement.appendChild(script);


   setTimeout(() => {
  const nextBtn = document.querySelector('.carousel-control-next') as HTMLElement;
  if (nextBtn) {
    nextBtn.click();
  }
}, 10000);
  }



}