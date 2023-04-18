import { Component, OnInit } from '@angular/core';
import { IProductDetailTyoe } from '../home/home.model'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  navbarItems = ['Buy', 'Rent', 'Sell']
  selectedLevel: any;
  productsToDisplay:any = [];
  prodPrice = 0;
  searchKey: string = "";
  items:any = [];
  productArray:any = [];
  selectedIndex: any = null;
  
 
  constructor(private https: HttpClient) { }
    
  ngOnInit(): void {
    this.https.get('https://fakestoreapi.com/products').subscribe((data)=>{
      this.items = data;
      this.productsToDisplay = data;
    })
  }
  setIndex(index: number) {
    this.selectedIndex = index;
  }
  
  selected(){
    if(this.selectedLevel == 'all'){
      this.items = this.productsToDisplay.filter((item:any)=>{
        return item.price;
      })
    }

   if(this.selectedLevel == 'price0'){
    this.items = this.productsToDisplay.filter((item:any)=>{
      return item.price > 0 && item.price < 100;
    })
   
   }
   if(this.selectedLevel == 'price1'){
   this.items = this.productsToDisplay.filter((item:any)=>{
      return item.price > 100 && item.price < 500;
    })
    
   }
   if(this.selectedLevel == 'price2'){
   this.items = this.productsToDisplay.filter((item:any)=>{
      return item.price > 500 && item.price < 1000;
    })
   
   }
    if(this.selectedLevel == 'price3'){
     this.items = this.productsToDisplay.filter((item:any)=>{
        return item.price > 1000 && item.price < 1500;
      })
    }
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
