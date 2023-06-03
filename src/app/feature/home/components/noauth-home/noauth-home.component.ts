import { Component } from '@angular/core';
import { loginLink } from '../../../../pages/auth/auth-routing.module';

interface Feature {
  title: string;
  description: string;
  image: string;
}

interface Category {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-noauth-home',
  templateUrl: './noauth-home.component.html',
  styleUrls: ['./noauth-home.component.less'],
})
export class NoauthHomeComponent {
  features: Feature[] = [
    {
      title: 'Regardez vos films préférés',
      description: 'Découvrez une large sélection de films de tous genres',
      image: 'assets/media-banner.avif',
    },
    {
      title: 'Découvrez des séries exclusives',
      description:
        'Des séries uniques que vous ne trouverez nulle part ailleurs',
      image: 'assets/images/feature-series.jpg',
    },
    {
      title: 'Profitez sur tous vos appareils',
      description: 'Regardez vos contenus préférés où que vous soyez',
      image: 'assets/images/feature-devices.jpg',
    },
  ];

  categories: Category[] = [
    {
      title: 'Films',
      description: 'Découvrez les derniers films ajoutés à notre catalogue',
      image: 'assets/movies_background.jpg',
    },
    {
      title: 'Séries',
      description: 'Les meilleures séries du moment sont ici',
      image: 'assets/tvshow_background.webp',
    },
    {
      title: 'Listes de lectures & statistiques',
      description:
        'Créez vos listes de lecture et suivez votre avancement dans vos séries et films préférés',
      image: 'assets/line-graph.png',
    },
  ];
  protected readonly loginLink = loginLink;
}
