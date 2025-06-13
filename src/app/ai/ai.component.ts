import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../_services/product/product.service';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

@Component({
  selector: 'app-ai',
  templateUrl: './ai.component.html',
  styleUrls: ['./ai.component.scss'],
})
export class AIComponent implements OnInit {
  input: string = '';
  error: string = '';
  posts: any[] = [];
   cartlist: any;
     
  isAnimating: boolean = false;
  createdBy: any = this.activatedRoute.snapshot.params['userId'];
  HubId: any = this.activatedRoute.snapshot.params['HubId'];

  API_KEY: string = 'AIzaSyACnlTQxKGB4E0VvNG-1hGLsVNPEEi7hi8';
  API_URL: string = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.API_KEY}`;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,private ProductService: ProductService
  ) {}

  ngOnInit(): void {}

  async getAIResponse(message: string): Promise<string> {
    try {
      const res: any = await firstValueFrom(
        this.http.post(this.API_URL, {
          contents: [{ parts: [{ text: message }] }],
        })
      );

      let aiResponse =
        res?.candidates?.[0]?.content?.parts?.[0]?.text ||
        'No AI response available.';
      return aiResponse.split('\n').slice(0, 6).join('\n');
    } catch (error: any) {
      console.error('Error fetching AI response:', error);
      return 'Error generating response.';
    }
  }
  getProductByName(name: string) {
    // Replace with actual value if dynamic
    const encodedName = encodeURIComponent(name);
    ;
    const url = `https://villiyantapi.cxengine.net/api/search-list/${this.createdBy}/${encodedName}/${this.HubId}`; // Adjust the path to your actual API
    return this.http.get<any[]>(url);
  }

  async handleSend() {
    this.error = '';

    if (!this.input.trim()) {
      this.error = 'Message cannot be empty.';
      return;
    }

    const keywords = [
      'aquarium',
      'hi',
      'hello',
      'hey',
      'help',
      'how are you',
      'thank you',
      'thanks',
      'fish',
      'tank',
      'water',
      'filter',
      'cycle',
      'coral',
      'marine',
      'freshwater',
      'saltwater',
      'pet',
      'care',
      'feeding',
      'cleaning',
      'disease',
      'illness',
      'treatment',
      'heater',
      'light',
      'pump',
      'substrate',
      'gravel',
      'decorations',
      'plants',
      'algae',
      'compatible',
      'aggressive',
      'peaceful',
      'community',
      'schooling',
      'territorial',
      'nitrate',
      'nitrite',
      'ammonia',
      'ph',
      'hardness',
      'temperature',
      'salinity',
      'setup',
      'start',
      'beginner',
      'starter',
      'new tank',
      'first tank',
      'maintenance',
      'goldfish',
      'betta',
      'guppy',
      'tetra',
      'discus',
      'cichlid',
      'shrimp',
      'snail',
    ];

    const isRelated = keywords.some((word) =>
      this.input.toLowerCase().includes(word)
    );
    if (!isRelated) {
      this.error = 'Please ask a question related to aquariums.';
      return;
    }

    this.isAnimating = true;

    const aiResponse = await this.getAIResponse(this.input);
    const productList: any[] = [];
    const seen = new Set();

    try {
      const words = this.input.trim().split(/\s+/);
      const phrases: string[] = [];

      for (let i = 0; i < words.length; i++) {
        for (let j = i + 1; j <= words.length; j++) {
          const phrase = words.slice(i, j).join(' ');
          if (phrase.length > 2) phrases.push(phrase);
        }
      }

      for (const phrase of phrases) {
        try {
          const encodedName = encodeURIComponent(phrase);
     
          const url = `https://villiyantapi.cxengine.net/api/Product/GetAdvanceSerach/any/${encodedName}/${this.createdBy}`;

          const results = await firstValueFrom(this.http.get<any[]>(url)); // Directly calling API here

          if (results?.length) {
            for (const item of results) {
              const key = item.id || item.pluName;
              if (!seen.has(key)) {
                seen.add(key);
                productList.push({
                  name: item.pluName,
                  itemId:item.itemId,
                  price: item.sellingPrice,
                  image: `https://automatebuddy.oss-ap-southeast-3.aliyuncs.com/VilliyantGroup/Product-image/${item.itemId}_0.png`,
                });
              }
            }
          }
        } catch (err) {
          console.warn(`Search failed for phrase: "${phrase}"`, err);
        }
      }

      if (!productList.length) {
        console.log('No product found for any input phrases.');
      } else {
        console.log('Products matched:', productList);
      }
    } catch (err) {
      console.error('Error during product search:', err);
    }
    this.posts.unshift({
      name: 'You',
      message: this.input,
      response: aiResponse,
      product: productList,
    });

    this.input = '';
    setTimeout(() => (this.isAnimating = false), 4000);
  }
  proddetails(itemId: any) {
    this.ProductService.getProductDetail(itemId, this.createdBy).subscribe({
      next: (data) => {
        this.cartlist = data;
        var mnctg = this.cartlist.product.mainCategory;
        window.location.href = '/Main-Category/SubCategory/Category/Products/' + itemId + '/' + mnctg + '/' + this.createdBy + '/' + this.HubId + '/asc/0/0';
      }, error: (err) => {
      
        // console.log(err);
      },
    });
  }
}
