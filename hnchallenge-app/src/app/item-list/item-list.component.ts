import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../api/services/items.service';
import { ItemViewModel } from '../api/models/item-view-model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  public items: ItemViewModel[];

  constructor(private itemsService: ItemsService, private router: Router) {
    this.items = [];
  }

  ngOnInit() {
    this.loadItems();
  }

  private loadItems = async () => {
    const active = this.router.url;
    console.log(active);

    switch (active) {
      case '/newest':
      this.items = await this.itemsService.GetNew().toPromise();
      break;
      case '/best':
      this.items = await this.itemsService.GetBest().toPromise();
      break;
      case '/top':
      this.items = await this.itemsService.GetTop().toPromise();
      break;
    }
  }

  private mockLoadItems = () => {
    this.items = this.itemsService.GetItemsDirect();
  }

}
