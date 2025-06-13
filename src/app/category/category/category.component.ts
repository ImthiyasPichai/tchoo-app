import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/_services/category/category.service';
import { AppComponent } from 'src/app/app.component';
import { LocalService } from 'src/app/_services/local.service';
import { ProductService } from 'src/app/_services/product/product.service';
import { Location } from "@angular/common"

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  createdBy: any = this.activatedRoute.snapshot.params['userId'];
  categoryId: any = this.activatedRoute.snapshot.params['id'];
  HubId: any = this.activatedRoute.snapshot.params['HubId'];

  getItems: any = [];
  mainCategoryName: any = [];
  userdetails: any = [];
  mycart: any = [];
  private history: string[] = [];

  id!: any;
  fullName: any;
  searchValue: any;
  searchvalue: any
  prductFilerView: any;
  prductSortView: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryservices: CategoryService,
    public app: AppComponent,
    private local: LocalService,
    private router: Router,
    private product_service: ProductService,
    private location: Location
  ) { }

  placeholderText: string = "";
  placeholders: string[] = [
    "Search for Fish Feed",
    "Search for Fish Accessories",
    "Search for Fish Bowl",
    "Search for Aquarium Plants",
    "Search for Aquarium Filters",
    "Search for Water Conditioners",
    "Search for Aquarium Heaters"
  ];
  typingSpeed: number = 100; 
  delayBetweenTexts: number = 1500; 
  currentPlaceholderIndex: number = 0;
  ngOnInit(): void {
    this.getuserdetails();
    this.startTypingAnimation();
  }
  startTypingAnimation() {
    this.typeText();
  }

  typeText() {
    let index = 0;
    let currentText = this.placeholders[this.currentPlaceholderIndex];
    this.placeholderText = "Search "; // Keep "Search" static

    const typingInterval = setInterval(() => {
      if (index < currentText.length) {
        this.placeholderText += currentText.charAt(index);
        index++;
      } else {
        clearInterval(typingInterval);

        // Wait before deleting
        setTimeout(() => {
          this.deleteText();
        }, this.delayBetweenTexts);
      }
    }, this.typingSpeed);
  }

  deleteText() {
    const deletingInterval = setInterval(() => {
      if (this.placeholderText.length > 7) { // Keep "Search" and delete only dynamic part
        this.placeholderText = this.placeholderText.slice(0, -1);
      } else {
        clearInterval(deletingInterval);

        // Move to next placeholder text
        this.currentPlaceholderIndex = (this.currentPlaceholderIndex + 1) % this.placeholders.length;

        // Start typing next text
        setTimeout(() => {
          this.typeText();
        }, 500);
      }
    }, 50);
  }

  // redirecting to search component with value
  search() {
    this.searchvalue = this.searchValue;
    this.router.navigate(['/search-list/' + this.createdBy + '/' + this.searchvalue + '/' + this.HubId])
  }
  // get userdetails
  getuserdetails() {
    this.app.commonLoader=true;
    this.product_service.getuserdetails(this.createdBy).subscribe({
      next:(data) => {
        this.userdetails = data;
        this.fullName = this.userdetails.fullName;
      },error:(err)=> {
        // console.log(err);
        this.app.commonLoader = false;
      },complete:()=> {
        this.getcategory();
      },
    });
  }
   // GET CATEGORY details
  getcategory() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.categoryservices.getcategory(this.id, this.createdBy).subscribe({
      next:(response) => {
        this.getItems = response;
      },error:(err)=> {
        // console.log(err);
        this.app.commonLoader = false;
      },complete:()=> {
        this.getCartItems();
      },
    })
  }
  // GET ALL PRODUCT from cart
  getCartItems() {
    this.local.getCartItems(this.createdBy).subscribe({
      next: (data) => {
        this.mycart = data;
      },error: (err) => {
        // console.log(err);
        this.app.commonLoader = false;
      },complete:()=> {
        this.app.commonLoader = false;
      },
    })
  }
  // CATEGORY FILTER
  filterCategories = [
    { name: "Action", id: 1 },
    { name: "Black", id: 2 },
    { name: "Green", id: 3 },
    { name: "Herbal", id: 4 },
    { name: "Ice Tea", id: 5 },
    { name: "Mini tins pack", id: 6 },
    { name: "Pu Erh", id: 7 },
    { name: "Rooibos", id: 8 },
    { name: "White", id: 9 },
  ]
  sortCategory = [
    { name: "Price (Low to high)", id: 1 },
    { name: "Price (High to low)", id: 2 },
    { name: "Newest first", id: 3 },
    { name: "Top sellers", id: 4 },
    { name: "Customer rating", id: 4 },
  ]
  // PRODUCT FILTER modal show
  productFilter() {
    this.prductFilerView = { 'display': 'block' };
  };
  // PRODUCT sorting modal show
  productSort() {
    this.prductSortView = { 'display': 'block' };
  }
  // PRODUCT FILTER , sorting modal hide
  closemd() {
    this.prductFilerView = { 'display': 'none' };
    this.prductSortView = { 'display': 'none' };
  };
  backNavigation(): void {
    this.history.pop();
    if (this.history.length > 0) {
      this.location.back();
    } else {
      this.router.navigateByUrl("/Home/" + this.createdBy);
    }
  }
}