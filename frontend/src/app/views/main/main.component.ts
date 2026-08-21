import {Component} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {MatDialog} from "@angular/material/dialog";
import {RequestPopupComponent} from "../../shared/components/request-popup/request-popup.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
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

  constructor(private dialog: MatDialog) {
  }

  openOrderPopup(service: string): void {
    this.dialog.open(RequestPopupComponent, {
      data: {type: 'order', service: service},
      panelClass: 'request-popup-panel'
    });
  }
}
