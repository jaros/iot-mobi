import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  cities: Array<string> = [
    'Amsterdam',
    'Bogota',
    'Buenos Aires',
    'Cairo',
    'Dhaka',
    'Edinburgh',
    'Geneva',
    'Genoa',
    'Glasglow',
    'Hanoi',
    'Hong Kong',
    'Islamabad',
    'Istanbul',
    'Jakarta',
    'Kiel',
    'Kyoto',
    'Le Havre',
    'Lebanon',
    'Lhasa',
    'Lima',
    'London',
    'Los Angeles',
    'Madrid',
    'Manila',
    'New York',
    'Olympia',
    'Oslo',
    'Panama City',
    'Peking',
    'Philadelphia',
    'San Francisco',
    'Seoul',
    'Taipeh',
    'Tel Aviv',
    'Tokio',
    'Uelzen',
    'Washington'
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.initializeItems();
  }

  initializeItems() {
    this.items = [];
    for (let i = 1; i < this.cities.length; i++) {
      this.items.push({
        title: this.cities[i],
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    let val = ev.target.value;
    console.log(val);

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
