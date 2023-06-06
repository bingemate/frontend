import { Component } from '@angular/core';
import { loginLink } from '../../../../pages/auth/auth-routing.module';
import { AnimationOptions } from 'ngx-lottie';

interface Feature {
  title: string;
  description: string;
  animation: AnimationOptions;
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
  readonly animation: AnimationOptions = {
    path: 'assets/animations/watch-a-movie-with-popcorn.json',
  };

  features: Feature[] = [
    {
      title: 'Regardez vos films préférés',
      description: 'Découvrez une large sélection de films de tous genres',
      animation: {
        path: 'assets/animations/movie.json',
      },
    },
    {
      title: 'Découvrez des séries exclusives',
      description:
        'Des séries uniques que vous ne trouverez nulle part ailleurs',
      animation: {
        path: 'assets/animations/tvshow.json',
      },
    },
    {
      title: 'Accédez à tout les films et séries',
      description:
        "Accédez à tout les films et séries, qu'ils soient disponibles sur notre plateforme ou non",
      animation: {
        path: 'assets/animations/mediatheque.json',
      },
    },
    {
      title: 'Vos propres listes de lecture',
      description:
        'Créez vos listes de lecture et suivez votre avancement dans vos séries et films préférés',
      animation: {
        path: 'assets/animations/streaming-platform.json',
      },
    },
    {
      title: 'Votre calendrier de sorties personnalisé',
      description:
        'Suivez les sorties de vos séries et films préférés, grâce à un calendrier personnalisé, que vous pouvez synchroniser avec votre calendrier Google',
      animation: {
        path: 'assets/animations/calendar.json',
      },
    },
    {
      title: 'Statistiques',
      description:
        'Suivez votre avancement dans vos séries et films préférés, regardez exactement combien de temps vous avez passé à regarder des films et séries',
      animation: {
        path: 'assets/animations/stats.json',
      },
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
      image: 'assets/tvshow_background.png',
    },
    {
      title: 'Calendrier des sorties',
      description:
        'Suivez les sorties de vos séries et films préférés, grâce à un calendrier personnalisé, que vous pouvez synchroniser avec votre calendrier Google',
      image: 'assets/calendar_background.jpg',
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
