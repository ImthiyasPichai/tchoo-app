import { Component } from '@angular/core';

@Component({
  selector: 'app-customise-page',
  templateUrl: './customise-page.component.html',
  styleUrls: ['./customise-page.component.scss']
})
export class CustomisePageComponent {
 length: number = 60;
breadth: number = 30;
height: number = 30;

glassThickness: number = 8;
thicknessOptions: number[] = [6, 8, 10, 12];
quantity: number = 1;
totalPrice: number = 0;

increaseQty() {
  this.quantity++;
}

decreaseQty() {
  if (this.quantity > 1) this.quantity--;
}

calculatePrice() {
  const baseRate = 0.01;
  const volume = this.length * this.breadth * this.height;
  this.totalPrice = Math.round(volume * baseRate * this.quantity);
}
}
