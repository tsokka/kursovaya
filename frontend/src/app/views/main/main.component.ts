import {Component, OnInit} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {MatDialog} from "@angular/material/dialog";
import {RequestPopupComponent} from "../../shared/components/request-popup/request-popup.component";
import {ArticleType} from "../../../types/article.type";
import {ArticleService} from "../../shared/services/article.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  articles: ArticleType[] = [];

  offers = [
    {
      label: 'Предложение месяца',
      titleStart: 'Продвижение в Instagram для вашего бизнеса ',
      titleAccent: '−15%',
      titleEnd: '!',
      text: '',
      image: '/assets/images/page/banner1.png',
      service: 'Продвижение'
    },
    {
      label: 'Акция',
      titleStart: 'Нужен грамотный ',
      titleAccent: 'копирайтер',
      titleEnd: '?',
      text: 'Весь декабрь у нас действует акция на работу копирайтера.',
      image: '/assets/images/page/banner2.png',
      service: 'Копирайтинг'
    },
    {
      label: 'Новость дня',
      titleStart: '',
      titleAccent: '6 место',
      titleEnd: ' в ТОП-10 SMM-агентств Москвы!',
      text: 'Мы благодарим каждого, кто голосовал за нас!',
      image: '/assets/images/page/banner3.png',
      service: 'SMM'
    }
  ];

  services = [
    {
      title: 'Создание сайтов',
      text: 'В краткие сроки мы создадим качественный и самое главное продающий сайт для продвижения Вашего бизнеса!',
      price: 7500,
      image: '/assets/images/page/service1.png'
    },
    {
      title: 'Продвижение',
      text: 'Вам нужен качественный SMM-специалист или грамотный таргетолог? Мы готовы оказать Вам услугу «Продвижения» на наивысшем уровне!',
      price: 3500,
      image: '/assets/images/page/service2.png'
    },
    {
      title: 'Реклама',
      text: 'Без рекламы не может обойтись ни один бизнес или специалист. Обращаясь к нам, мы гарантируем быстрый прирост клиентов за счёт правильно настроенной рекламы.',
      price: 1000,
      image: '/assets/images/page/service3.png'
    },
    {
      title: 'Копирайтинг',
      text: 'Наши копирайтеры готовы написать Вам любые продающие тексты, которые не только обеспечат рост охватов, но и помогут выйти на новый уровень в продажах.',
      price: 750,
      image: '/assets/images/page/service4.png'
    }
  ];

  advantages = [
    {
      title: 'Мастерски вовлекаем аудиторию в процесс.',
      text: 'Мы увеличиваем процент вовлечённости за короткий промежуток времени.'
    },
    {
      title: 'Разрабатываем бомбическую визуальную концепцию.',
      text: 'Наши специалисты знают как создать уникальный образ вашего проекта.'
    },
    {
      title: 'Создаём мощные воронки с помощью текстов.',
      text: 'Наши копирайтеры создают не только вкусные текста, но и классные воронки.'
    },
    {
      title: 'Помогаем продавать больше.',
      text: 'Мы не только помогаем разработать стратегию по продажам, но также корректируем её под нужды заказчика.'
    }
  ];

  reviews = [
    {
      name: 'Станислав',
      image: '/assets/images/page/review1.png',
      text: 'Спасибо огромное АйтиШторму за прекрасный блог с полезными статьями! Именно они и побудили меня углубиться в тему SMM и начать свою карьеру.'
    },
    {
      name: 'Алёна',
      image: '/assets/images/page/review2.png',
      text: 'Обратилась в АйтиШторм за помощью копирайтера. Ни разу ещё не пожалела! Ребята действительно вкладывают душу в то, что делают, и каждый текст, который я получаю, с нетерпением хочется выложить в сеть.'
    },
    {
      name: 'Мария',
      image: '/assets/images/page/review3.png',
      text: 'Команда АйтиШторма за такой короткий промежуток времени сделала невозможное: от простой фирмы по услуге продвижения выросла в мощный блог о важности личного бренда. Класс!'
    }
  ];

  offersOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    nav: false,
    navSpeed: 700,
    items: 1
  };

  reviewsOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    margin: 25,
    dots: false,
    nav: false,
    navSpeed: 700,
    items: 3
  };

  constructor(private dialog: MatDialog,
              private articleService: ArticleService) {
  }

  ngOnInit(): void {
    this.articleService.getTopArticles()
      .subscribe((data: ArticleType[]) => {
        this.articles = data;
      });
  }

  openOrderPopup(service: string): void {
    this.dialog.open(RequestPopupComponent, {
      data: {type: 'order', service: service},
      panelClass: 'request-popup-panel'
    });
  }
}
