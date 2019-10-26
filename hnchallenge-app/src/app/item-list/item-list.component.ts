import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../api/services/items.service';
import { ItemViewModel } from '../api/models/item-view-model';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  public items: ItemViewModel[];

  constructor(private itemsService: ItemsService) {
    this.items = [];
  }

  ngOnInit() {
    this.mockLoadItems();
  }

  private loadItems = async () => {
    this.items = await this.itemsService.GetNew().toPromise();
  }

  private mockLoadItems = () => {
    this.items = this.itemsService.GetItemsDirect();
  }

}
