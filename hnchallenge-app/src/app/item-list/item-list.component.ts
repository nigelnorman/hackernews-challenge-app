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
  public page: number;

  constructor(private itemsService: ItemsService, public router: Router) {
    this.items = [];
  }

  ngOnInit() {
    this.loadItems();
    this.page = 1;
  }

  private loadItems = async (page?: number) => {
    const active = this.router.url;
    console.log(active);

    let result: any = {};

    switch (active) {
      case '/newest':
      result = await this.itemsService.GetNew(page).toPromise();
      break;
      case '/best':
      result = await this.itemsService.GetBest(page).toPromise();
      break;
      case '/top':
      result = await this.itemsService.GetTop(page).toPromise();
      break;
    }

    this.items = result.map((r) => r.result);
  }

  private mockLoadItems = () => {
    this.items = this.itemsService.GetItemsDirect();
  }

  private nextPage = () => {
    this.page++;
    this.items = [];
    this.loadItems(this.page);
  }

}
