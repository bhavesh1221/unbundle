import { Component, OnInit } from '@angular/core';
import { IProductDetailTyoe } from '../home/home.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items: Array<IProductDetailTyoe> = [
      {
        id: 0,
        img: 'assets/prod1.webp',
        name: 'Fabelle The Bars Quartet',
        price: 20,
        count: 8
      },
      {
        id: 1,
        img: 'assets/prod2.webp',
        name: 'LuvIt Goodies Chocolates',
        price: 25,
        count: 8
      },    
      {
        id: 2,
        img: 'assets/prod3.webp',
        name: 'Cadbury Temptation',
        price: 50,
        count: 8
      },
      {
        id: 3,
        img: 'assets/prod4.webp',
        name: 'Cadbury Celebrations',
        price: 70,
        count: 8
      }
    ]
  prodPrice = 0;
  productArray:any = [];

  constructor() { }

  ngOnInit(): void {
  }

  increment(item:IProductDetailTyoe){
    this.productArray.push(item.price)
    this.prodPrice = this.productArray.reduce((acc:number,currntVal:number)=>{
      return acc + currntVal
    })
    item.count--;
  }
  decrement(item:IProductDetailTyoe){
    if(this.productArray.length == 0){
      return;
    }
    item.count++;

    this.productArray.find((prodPrice:any, idx:number)=>{
      if(prodPrice == item.price){
        return this.productArray.splice(idx, 1)
      }
    })

    if(this.productArray.length == 0){
      this.prodPrice = 0;
    }
    else{
      setTimeout(() => {
        this.prodPrice = this.productArray.reduce((acc:number,currntVal:number)=>{
          return acc + currntVal
        })
      }, 0.1);
    }
  }
}
